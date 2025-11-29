require('dotenv').config();
const { createServer } = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 8080;

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'hotel_xhema',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize database
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ MySQL connected successfully');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roomId VARCHAR(255) NOT NULL,
        senderId VARCHAR(255) NOT NULL,
        senderName VARCHAR(255) NOT NULL,
        isStaff BOOLEAN DEFAULT FALSE,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`read\` BOOLEAN DEFAULT FALSE,
        INDEX idx_roomId (roomId),
        INDEX idx_roomId_timestamp (roomId, timestamp DESC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    connection.release();
    console.log('✓ MySQL database initialized');
  } catch (error) {
    console.error('MySQL initialization error:', error);
    process.exit(1);
  }
}

// Initialize on startup
initDatabase();

// HTTP server for health check
const httpServer = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat server alive');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Socket.io server
const io = new Server(httpServer, {
  path: '/socket.io/',
  cors: {
    origin: process.env.CORS_ORIGIN ? 
      process.env.CORS_ORIGIN.split(',') : 
      [
        'http://localhost:3000',
        'https://hotel-xhema-web.vercel.app',
        'https://hotel-xhema-web-*.vercel.app', // Preview deployments
        /\.back4app\.io$/, // Back4app deployments (regex pattern)
        /\.back4app\.com$/, // Back4app custom domains (regex pattern)
      ],
    methods: ['GET', 'POST'],
    credentials: false, // Must be false for Back4app
    allowedHeaders: ['*']
  },
  transports: ['polling', 'websocket'], // Polling first for Back4app compatibility
  allowEIO3: true,
  auth: false, // THIS IS THE FIX FOR 401 UNAUTHORIZED
  pingTimeout: 60000,
  pingInterval: 25000
});

io.engine.on("headers", (headers, req) => {
  // Remove any auth headers that cause 401
  delete headers["cookie"];
  delete headers["authorization"];
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join a chat room
  socket.on('join-room', async ({ roomId, userName, isStaff = false }) => {
    // Staff only join staff-room, not individual guest rooms
    if (isStaff) {
      socket.join('staff-room');
      console.log(`${userName} joined staff-room (Staff)`);
    } else {
      // Guests join their specific room
      socket.join(roomId);
      console.log(`${userName} joined room: ${roomId}`);
      
      // Send join message for guest
      const joinMessage = {
        roomId,
        sender: {
          id: socket.id,
          name: 'System',
          isStaff: true,
        },
        message: `${userName} joined the chat`,
        timestamp: new Date(),
        read: false,
      };

      // Send join message to the specific room
      io.to(roomId).emit('message', joinMessage);
      
      // Notify all staff
      io.to('staff-room').emit('message', joinMessage);
    }

    // Load message history
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM messages WHERE roomId = ? ORDER BY timestamp DESC LIMIT 50',
        [roomId]
      );
      
      const messages = rows.map(row => ({
        id: row.id,
        roomId: row.roomId,
        sender: {
          id: row.senderId,
          name: row.senderName,
          isStaff: Boolean(row.isStaff),
        },
        message: row.message,
        timestamp: row.timestamp,
        read: Boolean(row.read),
      })).reverse();
      
      socket.emit('message-history', messages);
    } catch (error) {
      console.error('Error loading message history:', error);
    }
  });

  // Handle incoming messages
  socket.on('send-message', async ({ roomId, userName, message, isStaff = false }) => {
    const newMessage = {
      roomId,
      sender: {
        id: socket.id,
        name: userName,
        isStaff,
      },
      message,
      timestamp: new Date(),
      read: false,
    };

    // Save to database
    try {
      await pool.execute(
        'INSERT INTO messages (roomId, senderId, senderName, isStaff, message, timestamp, `read`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [roomId, socket.id, userName, isStaff, message, new Date(), false]
      );
    } catch (error) {
      console.error('Error saving message:', error);
    }

    console.log(`[SERVER] Broadcasting message from ${userName} (staff: ${isStaff}) to room: ${roomId}`);
    
    // Broadcast to room participants
    io.to(roomId).emit('message', newMessage);
    console.log(`[SERVER] Emitted to room: ${roomId}`);
    
    // Always broadcast to staff-room so all staff can see all messages
    if (roomId !== 'staff-room') {
      io.to('staff-room').emit('message', newMessage);
      console.log(`[SERVER] Emitted to staff-room`);
    }
  });

  // Handle typing indicator
  socket.on('typing', ({ roomId, userName, isTyping }) => {
    // Broadcast typing status to the room (for all participants)
    io.to(roomId).emit('user-typing', { userName, isTyping });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`✓ Socket.io server running on port ${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/`);
});

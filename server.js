  // Load environment variables from .env.local
  require('dotenv').config({ path: '.env.local' });

  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');
  const { Server } = require('socket.io');
  const mysql = require('mysql2/promise');

  const dev = process.env.NODE_ENV !== 'production';
  const hostname = dev ? 'localhost' : '0.0.0.0';
  const port = parseInt(process.env.PORT || '3000', 10);

  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  // MySQL Connection Pool
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'hotel_xhema',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Initialize database table
  async function initDatabase() {
    try {
      const connection = await pool.getConnection();
      console.log('✓ MySQL connected successfully');
      
      // Create messages table
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

  app.prepare().then(async () => {
    // Initialize MySQL database
    await initDatabase();

    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    });

    const io = new Server(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
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

    server
      .once('error', (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  });

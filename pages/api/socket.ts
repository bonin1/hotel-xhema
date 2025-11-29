import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from '../../lib/mysql';
import MessageModel from '../../lib/models/Message';

export type NextApiResponseServerIO = {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = async (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io server...');

    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    res.socket.server.io = io;

    // Connect to MySQL
    await connectDB();

    // Socket.io event handlers
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Join a chat room
      socket.on('join-room', async ({ roomId, userName, isStaff = false }) => {
        socket.join(roomId);
        console.log(`${userName} joined room: ${roomId}`);

        // Send join message to room
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

        io.to(roomId).emit('message', joinMessage);

        // Load message history
        try {
          const messages = await MessageModel.find(roomId, 50);
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
          await MessageModel.create({
            roomId,
            senderId: socket.id,
            senderName: userName,
            isStaff,
            message,
            timestamp: new Date(),
            read: false,
          });
        } catch (error) {
          console.error('Error saving message:', error);
        }

        // Broadcast to room
        io.to(roomId).emit('message', newMessage);
      });

      // Handle typing indicator
      socket.on('typing', ({ roomId, userName, isTyping }) => {
        socket.to(roomId).emit('user-typing', { userName, isTyping });
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    console.log('Socket.io server initialized');
  } else {
    console.log('Socket.io server already running');
  }

  res.end();
};

export default SocketHandler;

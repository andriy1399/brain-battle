import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';
import { handleSockets } from './sockets/roomSocket';

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Handle WebSocket connections
handleSockets(io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

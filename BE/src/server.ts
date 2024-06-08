import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import connectDB from "./database";
import Room from "./models/Room";
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  socket.on("createRoom", async (roomCode: string) => {
    try {
      const room = new Room({ roomCode, players: [] });
      await room.save();
      socket.join(roomCode);
      console.log(`Room ${roomCode} created`);
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("error", "Error creating room");
    }
  });

  socket.on(
    "joinRoom",
    async ({ roomCode, nickname }: { roomCode: string; nickname: string }) => {
      try {
        const room = await Room.findOne({ roomCode });
        if (room) {
          const existingPlayer = room.players.find(
            (player) => player.id === socket.id
          );

          if (!existingPlayer) {
            const isHost = room.players.length === 0;
            room.players.push({ id: socket.id, nickname, isHost });
          } else {
            existingPlayer.nickname = nickname;
          }

          await room.save();
          socket.join(roomCode);
          io.to(roomCode).emit("playerJoined", room.players);
          console.log(`${nickname} joined room ${roomCode}`);
        } else {
          socket.emit("error", "Room not found");
        }
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", "Error joining room");
      }
    }
  );

  socket.on("disconnect", async () => {
    try {
      const rooms = await Room.find();
      for (const room of rooms) {
        room.players = room.players.filter((player) => player.id !== socket.id);
        await room.save();
        io.to(room.roomCode).emit("playerLeft", room.players);
      }
      console.log("Client disconnected");
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

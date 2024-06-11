import { Server, Socket } from "socket.io";
import cron from "node-cron";
import Room from "../models/Room";
import Role, { IRole } from "../models/Role";
import { PlayerDocument } from "../models/Player";

interface JoinRoomData {
  roomCode: string;
  nickname: string;
}

interface LeaveRoomData {
  roomCode: string;
}

const getRandomRole = async (): Promise<IRole | null> => {
  const rolesCount = await Role.countDocuments();
  if (rolesCount === 0) return null;
  const randomIndex = Math.floor(Math.random() * rolesCount);
  const randomRole = await Role.findOne().skip(randomIndex);
  return randomRole as IRole;
};

// Socket event handlers
const handleCreateRoom = async (
  socket: Socket,
  roomCode: string
): Promise<void> => {
  try {
    const room = new Room({ roomCode, players: [] });
    await room.save();
    socket.join(roomCode);
    console.log(`Room ${roomCode} created`);
  } catch (error) {
    console.error("Error creating room:", error);
    socket.emit("error", "Error creating room");
  }
};

const handleJoinRoom = async (
  socket: Socket,
  io: Server,
  { roomCode, nickname }: JoinRoomData
): Promise<void> => {
  try {
    const room = await Room.findOne({ roomCode });
    if (room) {
      const existingPlayer = room.players.find(
        (player) => player.id === socket.id
      );

      if (!existingPlayer) {
        const isHost = room.players.length === 0;
        const role = await getRandomRole();
        const newPlayer: PlayerDocument = {
          id: socket.id,
          nickname,
          isHost,
          role,
        } as PlayerDocument;
        room.players.push(newPlayer);
        await room.save();
      }

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
};

const handleLeaveRoom = async (
  socket: Socket,
  io: Server,
  { roomCode }: LeaveRoomData
): Promise<void> => {
  try {
    const room = await Room.findOne({ roomCode });
    if (room) {
      room.players = room.players.filter((player) => player.id !== socket.id);

      if (
        !room.players.some((player) => player.isHost) &&
        room.players.length > 0
      ) {
        room.players[0].isHost = true;
      }

      await Room.findByIdAndUpdate(room._id, { players: room.players });
      io.to(roomCode).emit("playerLeft", room.players);
    } else {
      socket.emit("error", "Room not found");
    }
  } catch (error) {
    console.error("Error leaving room:", error);
    socket.emit("error", "Error leaving room");
  }
};

const handleDisconnect = async (socket: Socket, io: Server): Promise<void> => {
  try {
    const rooms = await Room.find();
    for (const room of rooms) {
      room.players = room.players.filter((player) => player.id !== socket.id);

      if (
        !room.players.some((player) => player.isHost) &&
        room.players.length > 0
      ) {
        room.players[0].isHost = true;
      }

      await Room.findByIdAndUpdate(room._id, { players: room.players });
      io.to(room.roomCode).emit("playerLeft", room.players);
    }
    console.log("Client disconnected");
  } catch (error) {
    console.error("Error handling disconnect:", error);
  }
};

// Cron job to delete empty rooms
const startEmptyRoomDeletionTask = (): void => {
  const task = cron.schedule("*/20 * * * *", async () => {
    try {
      const emptyRooms = await Room.find({ players: { $size: 0 } });
      for (const room of emptyRooms) {
        await Room.deleteOne({ roomCode: room.roomCode });
        console.log(
          `Room ${room.roomCode} deleted because no players are left`
        );
      }

      const remainingRooms = await Room.countDocuments();
      if (remainingRooms === 0) {
        console.log("No more rooms left. Stopping the deleteEmptyRoomsTask.");
        task.stop();
      }
    } catch (error) {
      console.error("Error deleting empty rooms:", error);
    }
  });

  task.start();
};

// Main function to handle sockets
export const handleSockets = (io: Server): void => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    socket.on("createRoom", (roomCode: string) =>
      handleCreateRoom(socket, roomCode)
    );
    socket.on("joinRoom", (data: JoinRoomData) =>
      handleJoinRoom(socket, io, data)
    );
    socket.on("leaveRoom", (data: LeaveRoomData) =>
      handleLeaveRoom(socket, io, data)
    );
    socket.on("disconnect", () => handleDisconnect(socket, io));
  });

  // Start the cron job
  startEmptyRoomDeletionTask();
};

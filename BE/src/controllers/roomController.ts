import { Request, Response } from "express";
import Room from "../models/Room";

export const getPlayersByRoomCode = async (req: Request, res: Response) => {
  const { roomCode } = req.params;
  try {
    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room.players);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

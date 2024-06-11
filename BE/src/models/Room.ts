import mongoose, { Schema } from "mongoose";
import { PlayerSchema } from "./Player";
import { Room } from "../types/Room";

const RoomSchema = new Schema<Room>({
  roomCode: { type: String, required: true, unique: true },
  players: [PlayerSchema],
});

export default mongoose.model<Room>("Room", RoomSchema);

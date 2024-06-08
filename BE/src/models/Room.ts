import mongoose, { Document, Schema } from 'mongoose';

interface Player {
  id: string;
  nickname: string;
  isHost: boolean;
}

interface Room extends Document {
  roomCode: string;
  players: Player[];
}

const PlayerSchema = new Schema<Player>({
  id: { type: String, required: true },
  nickname: { type: String, required: true },
  isHost: { type: Boolean, required: true },
});

const RoomSchema = new Schema<Room>({
  roomCode: { type: String, required: true, unique: true },
  players: [PlayerSchema],
});

export default mongoose.model<Room>('Room', RoomSchema);
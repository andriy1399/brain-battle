import { Document } from "mongoose";
import { Player } from "./Player";

export interface Room extends Document {
  roomCode: string;
  players: Player[];
}

import mongoose, { Schema, Document } from "mongoose";
import { IRole, RoleSchema } from "./Role";

export interface PlayerDocument extends Document {
  id: string;
  nickname: string;
  isHost: boolean;
  role: IRole;
}

const PlayerSchema = new Schema<PlayerDocument>({
  id: { type: String, required: true },
  nickname: { type: String, required: true },
  isHost: { type: Boolean, required: true },
  role: { type: RoleSchema, required: true },
});

export default mongoose.model<PlayerDocument>("Player", PlayerSchema);
export { PlayerSchema };

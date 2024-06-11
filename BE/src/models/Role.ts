import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  categoryId: number;
  role: string;
  roleDescription: string;
}

const RoleSchema: Schema = new Schema({
  categoryId: { type: Number, required: true },
  role: { type: String, required: true },
  roleDescription: { type: String, required: true },
});

export default mongoose.model<IRole>("Role", RoleSchema);
export { RoleSchema };

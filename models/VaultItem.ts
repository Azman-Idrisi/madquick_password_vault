import mongoose, { Schema, Document } from "mongoose";

export interface IVaultItem extends Document {
  userId: string;
  title: string;
  username: string;
  password: string; 
  url?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VaultItemSchema = new Schema<IVaultItem>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String },
  notes: { type: String },
}, {
  timestamps: true, 
});


if (mongoose.models.VaultItem) {
  delete mongoose.models.VaultItem;
}

export default mongoose.model<IVaultItem>("VaultItem", VaultItemSchema);

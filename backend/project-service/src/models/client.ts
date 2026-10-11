import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  orginizationId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  createdBy: string;
}

const clientSchema = new Schema<IClient>(
  {
    orginizationId: { type: String, required: true },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    contactName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      requires: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const client = mongoose.model<IClient>("client", clientSchema);

export default client;

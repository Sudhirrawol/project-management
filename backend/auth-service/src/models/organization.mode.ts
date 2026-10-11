import mongoose, { Schema, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  status: "acitve" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
    },
  },
  { timestamps: true },
);

const Orginization = mongoose.model<IOrganization>(
  "Orginization",
  organizationSchema,
);

export default Orginization;

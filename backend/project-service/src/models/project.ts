import mongoose, { Schema } from "mongoose";

interface IProject extends Document {
  name: string;
  description: string;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      rquired: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;

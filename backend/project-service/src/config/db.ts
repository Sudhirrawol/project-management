import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MOngoDb uri is not defined");
  }
  await mongoose.connect(mongoUri);

  console.log("mongodb connected");
}

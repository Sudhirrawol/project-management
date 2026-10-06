import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
    const mongoUri = process.env.MONGODB_URI;
    console.log(mongoUri)
    if (!mongoUri) {
        throw new Error("MOngoDb is not defined");
    }
    await mongoose.connect(mongoUri)
    console.log("Auth service MongoDb connected")
}
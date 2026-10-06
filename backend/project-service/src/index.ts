import { connectDB } from "./config/db";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes";
import { connectRedis } from "./config/redis";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.url);
  next();
});

app.use("/projects", projectRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server runnning on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server ", error);
    process.exit(1);
  }
}
startServer();

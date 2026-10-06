import express, { Request, Response } from "express";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", router);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    service: "auth-service",
    status: "ok",
  });
});

export default app;

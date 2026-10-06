import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true, // means including cookies are allowed
  }),
);

const PORT = process.env.PORT;
const authService = process.env.AUTH_SERVICE_URL;
const projectService = process.env.PROJECT_SERVICE_URL;

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "ok",
  });
});

app.use(
  "/auth",
  createProxyMiddleware({
    target: authService,
    changeOrigin: true,
  }),
);
app.use(
  "/projects",
  createProxyMiddleware({
    target: projectService,
    changeOrigin: true,
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

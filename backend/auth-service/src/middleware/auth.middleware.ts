import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.types.js";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers?.authorization;
  console.log(authHeader);
  if (!authHeader) {
    res.status(404).json({
      message: "Access token required",
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).json({
      message: "Invalid authorization header",
    });
  }
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET id not configured");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      role: "admin" | "user";
    };
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

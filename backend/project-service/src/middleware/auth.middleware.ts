import { Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { AuthRequest } from "../types/auth.types";

export function authenticationToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(404).json({
      message: "Access token required",
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Access token required",
    });
  }
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      role: string;
    };
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
}

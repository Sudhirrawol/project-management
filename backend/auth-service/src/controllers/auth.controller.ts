import { Response, Request, NextFunction } from "express";

import {
  loginUser,
  logoutUser,
  refreshTokenData,
  registerUser,
} from "../services/auth.service.js";
import { LoginDTO, RegisterUserDTO } from "../dto/auth.dto.js";
import { AuthRequest } from "../types/auth.types.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data: RegisterUserDTO = req.body;
    const user = await registerUser(data);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data: LoginDTO = req.body;

    const tokens = await loginUser(data);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true, // javascript connot read this cookie
      secure: false, // allow cookie over http
      sameSite: "lax", // controls when the browser send the cookie in cross -site situations
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days // 24 hours// 60 minutes//60 seconds // 1000 milliseconds
    });
    res.status(200).json({
      message: "Login Succesfull",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    next(error);
  }
}

// There is one missing piece: Express needs to understand cookies, and your frontend/gateway need to allow credentialed requests.

// So the next thing to learn and implement is cookie-parser + CORS credentials + withCredentials, then we'll change /refresh.

// a cookie is a small piece of data that the server ask browser to store

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    console.log("refreshToken", refreshToken);

    if (!refreshToken) {
      res.status(401).json({
        message: "Refresh token not found",
      });
      return;
    }

    const newAccessToken = await refreshTokenData(refreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await logoutUser(req.user.userId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
}

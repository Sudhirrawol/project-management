import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import { LoginDTO, RegisterUserDTO } from "../dto/auth.dto.js";

export async function registerUser(data: RegisterUserDTO) {
  const existingUser = await User.findOne({
    email: data.email,
  });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "user",
  });

  return user;
}

export async function loginUser(data: LoginDTO) {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid email ID");
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }
  const accessSecret = process.env.JWT_SECRET as string;
  const accessToken = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    accessSecret,
    { expiresIn: "10m" },
  );
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  console.log("refreshSecret", refreshSecret);
  if (!refreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is not configured");
  }

  const refreshToken = jwt.sign(
    { userId: user._id.toString() },
    refreshSecret,
    { expiresIn: "7d" },
  );

  user.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
}

// jwt has two things jwt.sign in create token
//jwt has verify check token

export async function refreshTokenData(refreshToken: string) {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const accessSecret = process.env.JWT_SECRET;

  if (!refreshSecret || !accessSecret) {
    throw new Error("JWT secret are not configured");
  }

  const decode = jwt.verify(refreshToken, refreshSecret) as { userId: string };

  const user = await User.findById(decode.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    accessSecret,
    { expiresIn: "10m" },
  );
  return newAccessToken;
}

export async function logoutUser(userId: string): Promise<void> {
  await User.findByIdAndUpdate(userId, {
    $unset: {
      // this remove one field from mongo db
      refreshToken: 1,
    },
  });
}

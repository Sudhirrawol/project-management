import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  orginizationId: Types.ObjectId;
  role: "admin" | "user";
  refreshToken?: string;
}

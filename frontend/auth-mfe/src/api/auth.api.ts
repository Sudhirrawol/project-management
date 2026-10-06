import type { LoginRequest, LoginResponse } from "./types/auth.types";

export async function LoginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result: LoginResponse = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }
  return result;
}

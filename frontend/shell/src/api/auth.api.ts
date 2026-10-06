import { RefreshToken } from "./types/types";

export async function RefreshAccessToken(): Promise<RefreshToken> {
  const response = await fetch("http://localhost:5000/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Unable to refresh access token");
  }
  return response.json();
}

export async function LogoutUser(accessToken: string): Promise<void> {
  const response = await fetch("http://localhost:5000/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

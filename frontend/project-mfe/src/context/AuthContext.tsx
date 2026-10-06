import React, { createContext } from "react";

interface AuthProviderProps {
  accessToken: string | null;
  children: React.ReactNode;
}

interface AuthContextType {
  accessToken: string | null;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ accessToken, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// useQuery({
//   queryKey: ["projects"],
//   queryFn: getProjects,
// });

// useQuery is used to GET/read data from the server.
// queryKey → name/identity of the data
// queryFn  → function that actually fetches the data

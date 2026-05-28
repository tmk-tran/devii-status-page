import { useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("access_token"), // Loads existing token on refresh.
  );

  const login = (nextToken: string): void => {
    localStorage.setItem("access_token", nextToken); // Persists token.
    setToken(nextToken);
  };

  const logout = (): void => {
    localStorage.removeItem("access_token"); // Clears persisted token.
    setToken(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token), // Central auth check.
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

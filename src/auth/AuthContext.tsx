import { createContext, useContext, useMemo, useState } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("access_token"), // Loads existing token on refresh.
  );

  const login = (nextToken: string): void => {
    localStorage.setItem("access_token", nextToken); // Persists token.
    setToken(nextToken); // Updates React state.
  };

  const logout = (): void => {
    localStorage.removeItem("access_token"); // Clears persisted token.
    setToken(null); // Updates React state.
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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext); // Reads auth context.

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider"); // Prevents misuse.
  }

  return context;
}

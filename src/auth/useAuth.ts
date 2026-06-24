import { useContext } from "react";
import { AuthContext } from "./authContext";
import type { AuthContextValue } from "./authContext";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext); // Reads auth context.

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider"); // Prevents misuse.
  }

  return context;
}

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/useAuth";

export function RequireAuth() {
  const { isAuthenticated } = useAuth(); // Reads centralized auth state.
  const location = useLocation(); // Stores attempted route.

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />; // Sends user to login.
  }

  return <Outlet />; // Shows protected route.
}

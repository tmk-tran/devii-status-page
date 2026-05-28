import { Navigate, Outlet, useLocation } from "react-router";

export function RequireAuth(): React.JSX.Element {
  const location = useLocation(); // Remembers where the user tried to go.
  const token = localStorage.getItem("access_token"); // Replace later with auth context/state if needed.

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />; // Redirect unauthenticated users.
  }

  return <Outlet />; // Renders the protected child route.
}

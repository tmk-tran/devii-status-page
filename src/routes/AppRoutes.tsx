import { Navigate, Route, Routes } from "react-router";
import { RequireAuth } from "./RequireAuth";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import StatusPage from "../pages/StatusPage";
import TenantsPage from "../pages/TenantsPage";

export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/status" replace />} /> {/* Root sends users to the app landing page. */}

      <Route path="/login" element={<LoginPage />} /> {/* Public route for signing in. */}

      <Route element={<RequireAuth />}> {/* Protects all nested app routes. */}
        <Route path="/status" element={<StatusPage />} /> {/* Requires login. */}
        <Route path="/tenants" element={<TenantsPage />} /> {/* Requires login. */}
        <Route path="/settings" element={<SettingsPage />} /> {/* Requires login. */}
      </Route>
    </Routes>
  );
}

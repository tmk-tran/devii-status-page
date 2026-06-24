import { NavLink, useLocation } from "react-router";
import { AppRoutes } from "./routes/AppRoutes";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "./auth/useAuth";

interface NavigationItem {
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { label: "Tenants", path: "/tenants" },
  { label: "Settings", path: "/settings" },
];

function App() {
  const { isAuthenticated, logout } = useAuth(); // Reads auth state.
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/login";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ bgcolor: "background.paper" }}>
          <Typography
            variant="h6"
            component="h1"
            color="primary"
            sx={{ flexGrow: 1 }}
          >
            Devii Status Page - Trial
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            component="nav"
            aria-label="Main navigation"
          >
            {isAuthenticated ? (
              <>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    sx={{ fontWeight: 500, "&.active": { fontWeight: 700 } }} // Highlights the active route.
                  >
                    {item.label}
                  </Button>
                ))}

                <Button onClick={logout}>Logout</Button>
              </>
            ) : (
              <Button
                component={NavLink}
                to={isLoginPage ? "/status" : "/login"}
              >
                {isLoginPage ? "Status" : "Login"}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        {/* Keeps route definitions separate as the app grows. */}
        <AppRoutes />
      </Container>
    </Box>
  );
}

export default App;

import { useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../auth/useAuth";
import { runtimeConfig } from "../config/runtimeConfig";

interface LoginFormValues {
  email: string;
  password: string;
  tenantid: string;
}

interface LoginResponse {
  access_token?: string;
  message?: string;
}

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
  tenantid: runtimeConfig.apiTenantID ?? "", // Loads default tenant from .env
};

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { apiBaseUrl } = runtimeConfig; // Read Docker runtime configuration

  const [formValues, setFormValues] =
    useState<LoginFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!apiBaseUrl) {
      setSubmitError("Login API URL is not configured yet.");
      return;
    }

    if (!formValues.tenantid.trim()) {
      setSubmitError("Tenant ID is not configured yet.");
      return;
    }

    setSubmitError("");
    setSubmitMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formValues.email,
          password: formValues.password,
          tenantid: formValues.tenantid,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const loginResponse = (await response.json()) as LoginResponse;

      if (!loginResponse.access_token) {
        throw new Error("No access token returned.");
      }

      login(loginResponse.access_token);
      setSubmitMessage(loginResponse.message ?? "Login successful.");
      navigate("/status", { replace: true });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to log in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        component="form"
        elevation={2}
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 2.5,
          width: "100%",
          maxWidth: 420,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              Login
            </Typography>
            <Typography color="text.secondary">
              Enter your account details to continue.
            </Typography>
          </Box>

          {submitError ? <Alert severity="error">{submitError}</Alert> : null}
          {submitMessage ? (
            <Alert severity="success">{submitMessage}</Alert>
          ) : null}

          <TextField
            autoComplete="email"
            fullWidth
            label="Email"
            name="email"
            onChange={handleInputChange}
            required
            type="email"
            value={formValues.email}
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label="Password"
            name="password"
            onChange={handleInputChange}
            required
            type="password"
            value={formValues.password}
          />
          <Button
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {isSubmitting ? "Signing in..." : "SIGN IN"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token?: string;
  token?: string;
  message?: string;
}

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
};

function LoginPage(): React.JSX.Element {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const loginApiUrl = import.meta.env.VITE_API_LOGIN_URL ?? (apiBaseUrl ? `${apiBaseUrl}/login` : "");

    if (!loginApiUrl) {
      setSubmitError("Login API URL is not configured yet.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch(loginApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const loginResponse = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(loginResponse.message ?? "Unable to log in. Please try again.");
      }

      const accessToken = loginResponse.access_token ?? loginResponse.token;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
      }

      setSubmitMessage(loginResponse.message ?? "Login submitted successfully.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to log in. Please try again.");
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
          {submitMessage ? <Alert severity="success">{submitMessage}</Alert> : null}

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
          <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;

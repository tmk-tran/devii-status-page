import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00A79D",
    },
    secondary: {
      main: "#005296",
    },
    background: {
      default: "#060A2D",
      paper: "#17294D",
    },
    text: {
      primary: "#F4F5FD",
      secondary: "#A4A4C2",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    // fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    fontFamily: [
      "Nunito", // primary custom font
      "system-ui", // modern system font fallback
      "-apple-system", // Safari/iOS fallback
      '"Segoe UI"', // Windows fallback
      "Roboto", // Android fallback
      '"Helvetica Neue"', // older macOS fallback
      "Arial", // broad fallback
      "sans-serif", // generic fallback
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

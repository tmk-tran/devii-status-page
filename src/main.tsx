import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
// Apollo
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo";
// Style
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import "./index.css";
import "@fontsource/nunito/400.css"; // regular 400
// import "@fontsource/nunito/600.css"; // optional weight
// import "@fontsource/nunito/700.css"; // optional weight

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);

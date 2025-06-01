import App from "@/components/app";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme={DEFAULT_THEME} storageKey={THEME_STORAGE_KEY}>
      <App trigger="popup" />
    </ThemeProvider>
  </React.StrictMode>
);

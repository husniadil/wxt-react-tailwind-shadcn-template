import App from "@/components/app";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App trigger="popup" />
    </ThemeProvider>
  </React.StrictMode>
);

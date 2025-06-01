import React, { useState } from "react";
import { PortalContext } from "./context";
import { ThemeProvider } from "@/components/theme-provider";
import App from "@/components/app";

export const Root = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  return (
    <React.StrictMode>
      <PortalContext.Provider value={portalContainer}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <div
            ref={setPortalContainer}
            id="content-wrapper"
            className="fixed bottom-4 right-4 flex flex-row-reverse items-end gap-4 z-999"
          >
            <App trigger="content" />
          </div>
        </ThemeProvider>
      </PortalContext.Provider>
    </React.StrictMode>
  );
};

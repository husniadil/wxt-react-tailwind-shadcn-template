import React, { useState } from "react";
import { PortalContext } from "@/context/portal-context";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./app";

export const Container = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <React.StrictMode>
      <PortalContext.Provider value={container}>
        <ThemeProvider>
          <div
            ref={setContainer}
            id="content-wrapper"
            className="fixed bottom-4 right-4 flex flex-row-reverse items-end gap-4 z-[9999]"
          >
            <App />
          </div>
        </ThemeProvider>
      </PortalContext.Provider>
    </React.StrictMode>
  );
};

import React, { useState } from "react";
import { PortalContext } from "@/context/portal-context";
import { ThemeProvider } from "@/components/theme-provider";

export const MainContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <React.StrictMode>
      <PortalContext.Provider value={container}>
        <ThemeProvider>
          <div
            ref={setContainer}
            className={className}
            role="main"
            aria-label="Application content"
          >
            {children}
          </div>
        </ThemeProvider>
      </PortalContext.Provider>
    </React.StrictMode>
  );
};

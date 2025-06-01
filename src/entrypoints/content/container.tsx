import React, { useState } from "react";
import { Context } from "@/context/context";
import { ThemeProvider } from "@/components/theme-provider";
import App from "@/components/app";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants";

export const Container = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <React.StrictMode>
      <Context.Provider value={container}>
        <ThemeProvider defaultTheme={DEFAULT_THEME} storageKey={THEME_STORAGE_KEY}>
          <div
            ref={setContainer}
            id="content-wrapper"
            className="fixed bottom-4 right-4 flex flex-row-reverse items-end gap-4 z-50"
          >
            <App trigger="content" />
          </div>
        </ThemeProvider>
      </Context.Provider>
    </React.StrictMode>
  );
};

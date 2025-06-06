import { FloatingActionButton } from "@/components/floating-action-button";
import { AppPanel } from "@/components/app-panel";
import { store } from "@/lib/storage";
import "@/styles/globals.css";
import { useEffect, useState, useCallback } from "react";
import { Trigger } from "@/types/trigger";
import { App } from "@/app/app";

function AppWrapper() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  useEffect(() => {
    store.settings
      .getValue()
      .then((settings) => setShowFloatingButton(settings.showFloatingActionButton ?? true));
    const unwatch = store.settings.watch((settings) =>
      setShowFloatingButton(settings.showFloatingActionButton ?? true)
    );
    return () => unwatch();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        toggleVisibility();
      }
    },
    [isVisible]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {showFloatingButton && (
        <div aria-live="polite">
          <FloatingActionButton onClick={toggleVisibility} />
        </div>
      )}
      <AppPanel isVisible={isVisible} trigger={Trigger.CONTENT}>
        <App />
      </AppPanel>
    </>
  );
}

export default AppWrapper;

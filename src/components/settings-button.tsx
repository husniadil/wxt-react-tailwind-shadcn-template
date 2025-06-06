import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsIcon, X as CloseIcon } from "lucide-react";
import { SettingsPanel } from "@/components/settings/settings-panel";

export const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 group"
        onClick={toggleSettings}
        aria-label={showSettings ? "Close settings" : "Open settings"}
      >
        {showSettings ? (
          <CloseIcon className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
        ) : (
          <SettingsIcon className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
        )}
      </Button>
      {showSettings && (
        <div className="absolute top-full right-0 mt-2 z-50 w-80 bg-background shadow-lg rounded-lg border border-border">
          <SettingsPanel />
        </div>
      )}
    </div>
  );
};

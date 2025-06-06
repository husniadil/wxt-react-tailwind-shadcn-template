import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Loader2 } from "lucide-react";
import { Settings } from "@/app/settings";

export const SettingsPanel = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSavingStateChange = (saving: boolean) => {
    setIsSaving(saving);
  };

  return (
    <div className="p-4">
      <div className="pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Settings</h2>
          <div className="flex items-center gap-2">
            {isSaving && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <Settings handleSavingStateChange={handleSavingStateChange} />
      </div>
    </div>
  );
};

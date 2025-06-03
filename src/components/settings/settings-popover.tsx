import { useState } from "react";
import { PopoverContent } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { ApiKeyField } from "@/components/settings/api-key-field";
import { FloatingButtonField } from "@/components/settings/floating-button-field";
import { FrameworkField } from "@/components/settings/framework-field";
import { Loader2 } from "lucide-react";

export interface SettingsPopoverProps {
  container?: HTMLElement | null;
}

export const SettingsPopover = ({ container }: SettingsPopoverProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSavingStateChange = (saving: boolean) => {
    setIsSaving(saving);
  };
  return (
    <PopoverContent
      className="w-80 border-2 border-[#E5E5E5] dark:border-[#262626] shadow-none"
      container={container}
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="leading-none font-bold">Settings</h4>
            <div className="flex items-center gap-2">
              {isSaving && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <ApiKeyField onSavingStateChange={handleSavingStateChange} />
          <FloatingButtonField onSavingStateChange={handleSavingStateChange} />
          <FrameworkField container={container} onSavingStateChange={handleSavingStateChange} />
        </div>
      </div>
    </PopoverContent>
  );
};

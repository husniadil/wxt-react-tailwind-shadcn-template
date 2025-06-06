import { ApiKeyField } from "@/app/components/api-key-field";
import { FloatingButtonField } from "@/app/components/floating-button-field";
import { FrameworkField } from "@/app/components/framework-field";

interface SettingsProps {
  handleSavingStateChange: (saving: boolean) => void;
}

export const Settings = ({ handleSavingStateChange }: SettingsProps) => {
  return (
    <div role="form" aria-label="Application settings" aria-live="polite" className="space-y-4">
      <ApiKeyField onSavingStateChange={handleSavingStateChange} />
      <FloatingButtonField onSavingStateChange={handleSavingStateChange} />
      <FrameworkField onSavingStateChange={handleSavingStateChange} />
      <div className="sr-only" aria-live="assertive" id="save-status">
        {/* Screen reader announcements for saving state will go here dynamically */}
      </div>
    </div>
  );
};

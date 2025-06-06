import { ApiKeyField } from "@/app/components/api-key-field";
import { FloatingButtonField } from "@/app/components/floating-button-field";
import { FrameworkField } from "@/app/components/framework-field";

interface SettingsProps {
  handleSavingStateChange: (saving: boolean) => void;
}

export const Settings = ({ handleSavingStateChange }: SettingsProps) => {
  return (
    <>
      <ApiKeyField onSavingStateChange={handleSavingStateChange} />
      <FloatingButtonField onSavingStateChange={handleSavingStateChange} />
      <FrameworkField onSavingStateChange={handleSavingStateChange} />
    </>
  );
};

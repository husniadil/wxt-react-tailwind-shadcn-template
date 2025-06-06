import { Button } from "@/components/ui/button";
import { SettingsIcon, X as CloseIcon } from "lucide-react";

interface SettingsButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export const SettingsButton = ({ isActive, onClick }: SettingsButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 group"
      onClick={onClick}
      aria-label={isActive ? "Close settings" : "Open settings"}
    >
      {isActive ? (
        <CloseIcon className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      ) : (
        <SettingsIcon className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      )}
    </Button>
  );
};

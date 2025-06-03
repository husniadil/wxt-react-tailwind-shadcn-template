import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useContext } from "react";
import { PortalContext } from "@/context/portal-context";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { SettingsPopover } from "@/components/settings/settings-popover";

export const SettingsButton = () => {
  const container = useContext(PortalContext);

  return (
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SettingsIcon className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
        </Button>
      </PopoverTrigger>
      <SettingsPopover container={container} />
    </Popover>
  );
};

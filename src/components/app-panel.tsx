import { useEffect, useState } from "react";
import { Rnd, DraggableData, RndDragEvent, RndResizeCallback } from "react-rnd";
import { store } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { APP_NAME, POPUP_MIN_HEIGHT, POPUP_MIN_WIDTH } from "@/constants";
import { Trigger } from "@/types/trigger";
import { SettingsButton } from "./settings-button";
import { SettingsPanel } from "@/components/settings-panel";
import { Position } from "@/types/position";
import { Dimensions } from "@/types/dimensions";

interface AppPanelProps {
  isVisible: boolean;
  children: React.ReactNode;
  trigger: Trigger;
  title?: string;
}

export function AppPanel({ isVisible, children, trigger, title = APP_NAME }: AppPanelProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [position, setPosition] = useState<Position>({ x: -POPUP_MIN_WIDTH, y: -POPUP_MIN_HEIGHT });
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: POPUP_MIN_WIDTH,
    height: POPUP_MIN_HEIGHT,
  });

  useEffect(() => {
    if (trigger === Trigger.CONTENT) {
      store.popupPosition.getValue().then(setPosition);
      store.popupDimensions.getValue().then(setDimensions);
    }
  }, [trigger]);

  const handleDragStop = (_e: RndDragEvent, d: DraggableData) => {
    const newPosition = { x: d.x, y: d.y };
    setPosition(newPosition);
    store.popupPosition.setValue(newPosition);
  };

  const handleResizeStop: RndResizeCallback = (_e, _direction, ref, _delta, position) => {
    const newDimensions = {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    };
    const newPosition = { x: position.x, y: position.y };

    setDimensions(newDimensions);
    setPosition(newPosition);

    store.popupDimensions.setValue(newDimensions);
    store.popupPosition.setValue(newPosition);
  };

  const renderContent = () => (
    <div
      className={cn(
        isVisible ? "block" : "hidden",
        "w-full h-full bg-background p-2 text-center flex flex-col rounded-sm relative border-2 overflow-auto"
      )}
      style={{ minWidth: POPUP_MIN_WIDTH }}
      role="dialog"
      aria-labelledby="panel-title"
      aria-modal="true"
    >
      <div className="panel-drag-handle cursor-move top-0 left-0 w-full flex items-center justify-between z-[9999] pb-2">
        <div id="panel-title" className="pl-4 text-sm font-medium truncate text-primary">
          {title}
        </div>
        <div className="flex items-center gap-1">
          <SettingsButton isActive={showSettings} onClick={() => setShowSettings(!showSettings)} />
        </div>
      </div>
      <div className="flex-1" role="region" aria-label="Panel content">
        {showSettings ? (
          <div className="w-full bg-background shadow-lg rounded-lg" aria-live="polite">
            <SettingsPanel />
          </div>
        ) : (
          children
        )}
      </div>
      <div
        className="pt-2 text-muted-foreground text-xs flex items-center justify-between w-full"
        role="contentinfo"
      >
        <div className="flex items-center gap-1">
          Powered by{" "}
          <a href="https://wxt.dev" className="underline">
            WXT
          </a>
        </div>
        <div className="flex items-center gap-1">
          <a href="https://react.dev" className="underline">
            React
          </a>
          <a href="https://tailwindcss.com" className="underline">
            Tailwind CSS
          </a>
          <a href="https://ui.shadcn.com" className="underline">
            Shadcn UI
          </a>
        </div>
      </div>
    </div>
  );

  if (trigger === "popup") {
    return renderContent();
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: dimensions.width,
        height: dimensions.height,
      }}
      position={position}
      size={{
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={POPUP_MIN_WIDTH}
      minHeight={POPUP_MIN_HEIGHT}
      dragHandleClassName="panel-drag-handle"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      {renderContent()}
    </Rnd>
  );
}

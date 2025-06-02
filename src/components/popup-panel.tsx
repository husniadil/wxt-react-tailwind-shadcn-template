import { useEffect, useState } from "react";
import { Rnd, DraggableData, RndDragEvent, RndResizeCallback } from "react-rnd";
import { ThemeToggle } from "@/components/theme-toggle";
import { CloseButton } from "@/components/close-button";
import { store } from "@/lib/storage";
import { cn } from "@/lib/utils";
import {
  APP_NAME,
  SHOW_CLOSE_BUTTON,
  SHOW_THEME_TOGGLE,
  POPUP_MIN_HEIGHT,
  POPUP_MIN_WIDTH,
} from "@/constants";
import { Trigger } from "@/types/trigger";

interface PopupPanelProps {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  trigger: Trigger;
  title?: string;
}

export function PopupPanel({
  isVisible,
  onClose,
  children,
  trigger,
  title = APP_NAME,
}: PopupPanelProps) {
  const [position, setPosition] = useState({ x: -POPUP_MIN_WIDTH, y: -POPUP_MIN_HEIGHT });
  const [dimensions, setDimensions] = useState({
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
        "w-full h-full bg-white dark:bg-black p-4 text-center flex flex-col justify-between rounded-lg relative"
      )}
      style={{ minWidth: POPUP_MIN_WIDTH, minHeight: POPUP_MIN_HEIGHT }}
    >
      <div className="panel-drag-handle cursor-move top-0 left-0 w-full flex items-center justify-between z-10 px-1">
        <div className="text-sm font-medium truncate text-black dark:text-white">{title}</div>
        <div className="flex items-center gap-1">
          {SHOW_THEME_TOGGLE && <ThemeToggle />}
          {SHOW_CLOSE_BUTTON && onClose && <CloseButton onClick={onClose} />}
        </div>
      </div>
      {children}
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

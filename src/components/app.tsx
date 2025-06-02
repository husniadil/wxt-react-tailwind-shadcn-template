import reactLogo from "@/assets/react.svg";
import wxtLogo from "@/assets/wxt.svg";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { Rnd, DraggableData, RndDragEvent, RndResizeCallback } from "react-rnd";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CloseButton } from "./close-button";
import {
  APP_NAME,
  SHOW_CLOSE_BUTTON,
  SHOW_THEME_TOGGLE,
  POPUP_MIN_HEIGHT,
  POPUP_MIN_WIDTH,
} from "@/constants";
import { cn } from "@/lib/utils";
import { store } from "@/lib/storage";

interface AppProps {
  trigger: "popup" | "content";
}

interface ContentWrapperProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Content = () => {
  const [count, setCount] = useState(0);

  return (
    <Card className="w-full h-full border-0 shadow-none">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <h1 className="text-lg font-bold text-black dark:text-white">{APP_NAME}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <a
            href="https://wxt.dev"
            target="_blank"
            rel="noreferrer"
            className="relative group block rounded-full"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#54bc4a]/30 dark:group-hover:bg-[#54bc4a]/40 blur-md"></div>
            <img
              src={wxtLogo}
              className="h-24 p-3 inline-block relative transition-all duration-300"
              alt="WXT logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-full"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#61dafb]/30 dark:group-hover:bg-[#61dafb]/40 blur-md"></div>
            <img
              src={reactLogo}
              className="h-24 p-3 inline-block relative transition-all duration-300 group-[.group]:animate-[spin_20s_linear_infinite]"
              alt="React logo"
            />
          </a>
        </div>
        <div className="py-2">
          <Button onClick={() => setCount((count) => count + 1)} size="sm">
            count is {count}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Edit{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/app.tsx</code>{" "}
          and save to test HMR
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click on the WXT and React logos to learn more
        </p>
      </CardFooter>
    </Card>
  );
};

const ContentWrapper = ({ isVisible, children, onClose }: ContentWrapperProps) => {
  return (
    <div
      className={cn(
        isVisible ? "block" : "hidden",
        "w-full h-full bg-white dark:bg-black p-4 text-center flex flex-col justify-between rounded-lg relative"
      )}
      style={{ minWidth: POPUP_MIN_WIDTH, minHeight: POPUP_MIN_HEIGHT }}
    >
      <div className="panel-drag-handle cursor-move absolute top-0 left-0 w-full h-10 flex items-center justify-end px-2 z-10">
        {SHOW_THEME_TOGGLE && <ThemeToggle />}
        {SHOW_CLOSE_BUTTON && onClose && <CloseButton onClick={onClose} />}
      </div>
      {children}
    </div>
  );
};

function App({ trigger }: AppProps) {
  const [isVisible, setIsVisible] = useState(trigger === "popup");
  const [position, setPosition] = useState({ x: -POPUP_MIN_WIDTH, y: -POPUP_MIN_HEIGHT });
  const [dimensions, setDimensions] = useState({
    width: POPUP_MIN_WIDTH,
    height: POPUP_MIN_HEIGHT,
  });

  // Get initial position and dimensions from storage
  useEffect(() => {
    if (trigger === "content") {
      store.popupPosition.getValue().then(setPosition);
      store.popupDimensions.getValue().then(setDimensions);
    }
  }, [trigger]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Handle position update when panel is dragged
  const handleDragStop = (_e: RndDragEvent, d: DraggableData) => {
    const newPosition = { x: d.x, y: d.y };
    setPosition(newPosition);
    store.popupPosition.setValue(newPosition);
  };

  // Handle size update when panel is resized
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

  if (trigger === "popup") {
    return (
      <ContentWrapper isVisible={isVisible}>
        <Content />
      </ContentWrapper>
    );
  }

  if (trigger === "content") {
    return (
      <>
        <FloatingActionButton onClick={toggleVisibility} />
        {isVisible && (
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
            <ContentWrapper isVisible={true} onClose={toggleVisibility}>
              <Content />
            </ContentWrapper>
          </Rnd>
        )}
      </>
    );
  }
}

export default App;

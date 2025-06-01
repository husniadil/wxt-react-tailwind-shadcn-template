import reactLogo from "@/assets/react.svg";
import wxtLogo from "@/assets/wxt.svg";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CloseButton } from "./close-button";
import {
  APP_NAME,
  SHOW_CLOSE_BUTTON,
  SHOW_THEME_TOGGLE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@/constants";
import { cn } from "@/lib/utils";

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
        `w-full h-full bg-white dark:bg-black p-4 text-center flex flex-col justify-between rounded-lg relative`
      )}
      style={{ minWidth: WINDOW_WIDTH, minHeight: WINDOW_HEIGHT }}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
        {SHOW_THEME_TOGGLE && <ThemeToggle />}
        {SHOW_CLOSE_BUTTON && onClose && <CloseButton onClick={onClose} />}
      </div>
      {children}
    </div>
  );
};

function App({ trigger }: AppProps) {
  const [isVisible, setIsVisible] = useState(trigger === "popup");

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
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
              x: -WINDOW_WIDTH,
              y: -WINDOW_HEIGHT,
              width: WINDOW_WIDTH,
              height: WINDOW_HEIGHT,
            }}
            minWidth={WINDOW_WIDTH}
            minHeight={WINDOW_HEIGHT}
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

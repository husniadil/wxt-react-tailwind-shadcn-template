import reactLogo from "@/assets/react.svg";
import wxtLogo from "@/assets/wxt.svg";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { useState } from "react";

interface AppProps {
  trigger: "popup" | "content";
}

function App({ trigger }: AppProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(trigger === "popup");

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {trigger === "content" && <FloatingActionButton onClick={toggleVisibility} />}
      <div
        className={`${isVisible ? "block" : "hidden"} w-[300px] bg-white dark:bg-black p-4 text-center items-center flex flex-col gap-2 rounded-lg`}
      >
        <ThemeToggle />
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
        <h1 className="text-lg font-bold text-black dark:text-white">WXT + React</h1>
        <div className="py-2">
          <Button onClick={() => setCount((count) => count + 1)} size="sm">
            count is {count}
          </Button>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Edit{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/app.tsx</code>{" "}
            and save to test HMR
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click on the WXT and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;

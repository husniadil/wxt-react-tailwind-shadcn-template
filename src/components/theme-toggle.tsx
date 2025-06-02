"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      <Moon className="hidden h-5 w-5 dark:block text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

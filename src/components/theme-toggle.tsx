"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 opacity-0">
        <div className="size-6" />
      </div>
    );
  }

  const cycleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    const newTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.classList.add("theme-transitioning");

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
  };

  return (
    <button
      onClick={cycleTheme}
      className="group flex items-center justify-center rounded-full border border-line bg-white/[0.03] p-1.5 text-mist transition-all hover:border-accent hover:text-accent"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
    >
      {theme === "light" ? (
        <Sun className="size-3.5" strokeWidth={1.5} />
      ) : theme === "dark" ? (
        <Moon className="size-3.5" strokeWidth={1.5} />
      ) : (
        <Laptop className="size-3.5" strokeWidth={1.5} />
      )}
    </button>
  );
}

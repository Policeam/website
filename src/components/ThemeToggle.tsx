"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="تغییر حالت روشن و تاریک"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface/70 text-lg transition-transform duration-300 hover:scale-110 hover:border-saffron"
    >
      <span className="transition-all duration-500" style={{ transform: theme === "dark" ? "rotate(180deg)" : "rotate(0deg)" }}>
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

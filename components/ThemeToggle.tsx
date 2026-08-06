"use client";

import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-8 w-14 rounded-full transition-colors duration-300 active:scale-95"
      style={{ background: isDark ? "#2c2c2e" : "#e0e0e0" }}
    >
      <span
        className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: isDark ? "translateX(24px)" : "translateX(0)" }}
      >
        <svg
          className="h-3.5 w-3.5 transition-all duration-300"
          viewBox="0 0 24 24"
          fill={isDark ? "#1d1d1f" : "#f5a623"}
        >
          {isDark ? (
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          ) : (
            <circle cx="12" cy="12" r="5" />
          )}
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;

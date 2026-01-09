"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    console.log("🔍 Initial check:", { savedTheme, prefersDark });
    
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(initialDark);
    
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    console.log("✅ Theme loaded:", initialDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    console.log("🔄 Toggling theme:", isDark ? "dark → light" : "light → dark");
    
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("🌙 Dark mode activated");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("☀️ Light mode activated");
    }
    
    // Verify
    console.log("✓ Current state:", {
      isDark: newDarkMode,
      localStorage: localStorage.getItem("theme"),
      htmlClass: document.documentElement.classList.contains("dark")
    });
  };

  if (!mounted) {
    return (
      <div className="p-2 w-10 h-10">
        <div className="w-6 h-6"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-red-300"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
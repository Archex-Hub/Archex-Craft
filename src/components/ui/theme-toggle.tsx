"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const storageKey = "archex-theme";

const themeListeners = new Set<() => void>();

function subscribe(listener: () => void) {
  themeListeners.add(listener);

  const mql = typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)") : null;
  const handleMedia = () => {
    try {
      if (!window.localStorage.getItem(storageKey)) {
        listener();
      }
    } catch {
      listener();
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === storageKey) {
      const newTheme =
        e.newValue === "dark" || e.newValue === "light"
          ? e.newValue
          : (window.matchMedia("(max-width: 1023px)").matches ? "light" : "dark");
      document.documentElement.dataset.theme = newTheme;
      document.documentElement.style.colorScheme = newTheme;
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);
  if (mql?.addEventListener) {
    mql.addEventListener("change", handleMedia);
  }

  return () => {
    themeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
    if (mql?.removeEventListener) {
      mql.removeEventListener("change", handleMedia);
    }
  };
}

function getTheme(): Theme {
  if (typeof document !== "undefined") {
    const current = document.documentElement.dataset.theme;
    if (current === "dark" || current === "light") {
      return current;
    }
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      return window.matchMedia("(max-width: 1023px)").matches ? "light" : "dark";
    } catch {
      return "light";
    }
  }
  return "light";
}

function getServerTheme(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
    themeListeners.forEach((listener) => listener());
  }

  const darkMode = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface text-muted transition hover:border-forest hover:text-ink focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 shadow-2xs"
    >
      {darkMode ? (
        <Sun size={18} className="text-bronze" aria-hidden="true" />
      ) : (
        <Moon size={18} className="text-forest" aria-hidden="true" />
      )}
    </button>
  );
}

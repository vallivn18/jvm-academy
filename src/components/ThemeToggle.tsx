"use client";
/**
 * @file ThemeToggle.tsx
 * @description Sun/Moon toggle button that switches between dark and light theme.
 *
 * HOW IT WORKS:
 *  - On mount, reads saved preference from localStorage (or OS default)
 *  - Applies "data-theme='light'" on <html> element
 *  - globals.css swaps all CSS variables when data-theme="light" is present
 *  - Preference is saved to localStorage so it persists across page visits
 */
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // On first render, read saved preference
  useEffect(() => {
    const saved = localStorage.getItem("jvm-theme");
    const prefersDark = saved ? saved === "dark" : !window.matchMedia("(prefers-color-scheme: light)").matches;
    setDark(prefersDark);
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jvm-theme", theme);
  };

  // Avoid flash on first render
  if (!mounted) return <div style={{ width: "40px", height: "40px" }} />;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className="theme-toggle-btn"
    >
      {dark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

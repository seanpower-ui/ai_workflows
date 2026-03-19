"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Syncs the resolved theme to the document's data-theme attribute.
 * Alize design tokens use [data-theme="dark"] / [data-theme="light"] for
 * semantic variable overrides (e.g. --sol-surface-default, --sol-text-default).
 * next-themes only sets the class (theme-light/theme-dark); this component
 * ensures the tokens respond to light/dark mode.
 */
export function ThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme) {
      root.setAttribute("data-theme", resolvedTheme);
    } else {
      root.removeAttribute("data-theme");
    }
  }, [resolvedTheme]);

  return null;
}

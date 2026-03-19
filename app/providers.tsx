"use client";

import { ThemeProvider } from "next-themes";
import { MaterialSymbolsProvider, AlizeDevToolsProvider } from "@jllt/alize-ui";
import { ThemeSync } from "./components/ThemeSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MaterialSymbolsProvider />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        value={{ light: "theme-light", dark: "theme-dark" }}
      >
        <ThemeSync />
        {/* 
          Alizé DevTools - Component Inspector
          Activation: npm run dev:devtools OR add ?alize-devtools=true to URL
          Toggle: Ctrl+Shift+A (Cmd+Shift+A on Mac)
        */}
        <AlizeDevToolsProvider>
          {children}
        </AlizeDevToolsProvider>
      </ThemeProvider>
    </>
  );
}

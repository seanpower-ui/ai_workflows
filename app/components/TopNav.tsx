"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JLLLogo, Button, Item, ThemeToggle } from "@jllt/alize-ui";

export function TopNav() {
  const pathname = usePathname();
  const isTimeline = pathname === "/timeline";
  const isSetupHelp = pathname === "/setup-help-hints";

  return (
    <header className="sticky top-0 z-50 w-full shrink-0 border-b border-sol-stroke-default bg-sol-surface-default">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <JLLLogo className="h-6 w-auto" />
            <span className="text-base font-normal text-sol-text-default">
              AI Enhanced Workflows
            </span>
          </Link>
          <nav className="flex items-center gap-5" aria-label="Main">
            <Item selected={isTimeline}>
              <Link
                href="/timeline"
                className="block -mx-3 -my-2 px-3 py-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-current={isTimeline ? "page" : undefined}
              >
                Timeline
              </Link>
            </Item>
            <Item selected={isSetupHelp}>
              <Link
                href="/setup-help-hints"
                className="block -mx-3 -my-2 px-3 py-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-current={isSetupHelp ? "page" : undefined}
              >
                Setup help & hints
              </Link>
            </Item>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm">Need further help?</Button>
        </div>
      </div>
    </header>
  );
}

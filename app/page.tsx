"use client";

import { Card, CardHeader, CardTitle } from "@jllt/alize-ui";

/** Matches TopNav: content `h-14` + header `border-b` */
const MAIN_AREA_HEIGHT = "calc(100dvh - 3.5rem - 1px)" as const;

const flexFill = {
  flex: "1 1 0%",
  minHeight: 0,
  minWidth: 0,
} as const;

export default function Home() {
  return (
    <div
      className="flex w-full flex-col overflow-hidden bg-background"
      style={{
        height: MAIN_AREA_HEIGHT,
        minHeight: 0,
      }}
    >
      <div
        className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-sol-surface-whisper"
        style={{ height: "60vh" }}
        role="region"
        aria-label="Hero video"
      >
        <p className="text-muted-foreground text-sm font-medium">
          Video placeholder
        </p>
      </div>
      <section
        className="flex flex-col overflow-y-auto px-4 py-10 sm:p-12 md:p-[60px]"
        style={flexFill}
        aria-label="Features"
      >
        <div
          className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-1 md:items-stretch"
          style={flexFill}
        >
          <Card className="flex h-full min-h-0 w-full flex-col">
            <CardHeader>
              <CardTitle>The new end to end workflow</CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex h-full min-h-0 w-full flex-col">
            <CardHeader>
              <CardTitle>Test working concepts with users quicker</CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex h-full min-h-0 w-full flex-col">
            <CardHeader>
              <CardTitle>QA can now be done in tandem</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}

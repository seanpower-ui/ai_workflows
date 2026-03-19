"use client";

import { Card, CardHeader, CardTitle } from "@jllt/alize-ui";

export default function Home() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-background">
      <main className="flex min-h-0 flex-1 flex-col">
        <section className="flex min-h-0 w-full flex-[6] flex-col" aria-label="Hero video">
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-sol-surface-whisper">
            {/* Placeholder for video – replace this div with your <video> or embed later */}
            <p className="text-muted-foreground text-sm font-medium">
              Video placeholder
            </p>
          </div>
        </section>
        <section
          className="flex w-full flex-[4] min-h-0 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:p-12 md:p-[60px]"
          aria-label="Features"
        >
          <div
            className="mx-auto grid h-full min-h-0 max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 w-full items-stretch md:grid-rows-1"
            style={{ minHeight: 0 }}
          >
            <Card className="h-full min-h-0 w-full flex flex-col">
              <CardHeader>
                <CardTitle>The new end to end workflow</CardTitle>
              </CardHeader>
            </Card>
            <Card className="h-full min-h-0 w-full flex flex-col">
              <CardHeader>
                <CardTitle>Test working concepts with users quicker</CardTitle>
              </CardHeader>
            </Card>
            <Card className="h-full min-h-0 w-full flex flex-col">
              <CardHeader>
                <CardTitle>QA can now be done in tandem</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

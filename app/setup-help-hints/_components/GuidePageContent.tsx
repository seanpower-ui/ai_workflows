"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@jllt/alize-ui";
import type { CarouselApi } from "@jllt/alize-ui";

export type GuideStep = {
  title: string;
  description: string;
  content: React.ReactNode;
};

type GuidePageContentProps = {
  steps: GuideStep[];
};

export function GuidePageContent({ steps }: GuidePageContentProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const syncCarousel = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    syncCarousel();
    api.on("select", syncCarousel);
    api.on("reInit", syncCarousel);
    return () => {
      api.off("select", syncCarousel);
      api.off("reInit", syncCarousel);
    };
  }, [api, syncCarousel]);

  const activeStep = steps[selectedIndex] ?? steps[0];
  const title = activeStep?.title ?? "";
  const description = activeStep?.description ?? "";

  return (
    <main className="bg-background flex min-h-0 w-full flex-1 flex-col">
      <div className="container mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8 px-4 py-6 sm:py-10 md:py-12">
        <div className="flex w-full items-center justify-center gap-4">
          <Carousel
            opts={{ align: "center", loop: false }}
            setApi={setApi}
            className="flex w-full justify-center"
          >
            <div
              className="flex shrink-0 flex-col gap-6 text-left"
              style={{ width: 1080 }}
            >
              <Link
                href="/setup-help-hints"
                className="inline-flex w-fit items-center gap-2 text-sm text-sol-text-subtle transition-colors hover:text-sol-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </Link>
              <div
                className="shrink-0 overflow-hidden"
                style={{
                  width: 1080,
                  height: 608,
                  minWidth: 1080,
                  minHeight: 608,
                  maxWidth: 1080,
                  maxHeight: 608,
                }}
              >
                <div
                  className="h-full w-full overflow-hidden"
                  style={{ minHeight: 0 }}
                >
                  <CarouselContent className="h-full">
                    {steps.map((step, index) => (
                      <CarouselItem key={index} className="h-full min-h-0">
                        <div className="h-full w-full overflow-hidden">{step.content}</div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-sol-text-default">
                  {title}
                </h1>
                {description ? (
                  <p className="text-sol-text-subtle">{description}</p>
                ) : null}
              </div>
              <div className="flex justify-start gap-4">
                <CarouselPrevious className="static -translate-y-0 shrink-0" />
                <CarouselNext className="static -translate-y-0 shrink-0" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </main>
  );
}

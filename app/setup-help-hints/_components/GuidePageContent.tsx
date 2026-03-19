"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@jllt/alize-ui";
import type { CarouselApi } from "@jllt/alize-ui";

export type CursorSetupPathChoice = "existing" | "sandbox";

type GuideCursorPathContextValue = {
  choosePath: (path: CursorSetupPathChoice) => void;
};

export const GuideCursorPathContext =
  createContext<GuideCursorPathContextValue | null>(null);

export function useGuideCursorPath() {
  return useContext(GuideCursorPathContext);
}

export type GuideStep = {
  title: string;
  description: string | ReactNode;
  content: React.ReactNode;
  /** When true, the carousel “Next” control is disabled on this step */
  disableNext?: boolean;
  /** When true, slide wrappers use overflow visible so hover lift/shadows are not clipped */
  slideOverflowVisible?: boolean;
};

export type GuideSwitcherItem = {
  href: string;
  label: string;
};

export type GuideSwitcherConfig = {
  /** 0-based carousel slide indexes where the switcher appears */
  slideIndexes: number[];
  items: GuideSwitcherItem[];
};

type GuidePageContentProps = {
  steps: GuideStep[];
  /** When set, step-2 path tiles call this then advance the carousel */
  onCursorSetupPathChosen?: (path: CursorSetupPathChoice) => void;
  /** Optional “Select another guide” menu beside Next on selected slides (one or more slide sets) */
  guideSwitcher?: GuideSwitcherConfig | GuideSwitcherConfig[];
  /**
   * Applied to the description slot so short or empty subtext keeps the same vertical
   * space as the longest slide (reduces layout shift when changing steps).
   */
  descriptionMinHeightClass?: string;
};

export function GuidePageContent({
  steps,
  onCursorSetupPathChosen,
  guideSwitcher,
  descriptionMinHeightClass,
}: GuidePageContentProps) {
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

  const choosePath = useCallback(
    (path: CursorSetupPathChoice) => {
      onCursorSetupPathChosen?.(path);
      queueMicrotask(() => {
        api?.scrollNext();
      });
    },
    [api, onCursorSetupPathChosen],
  );

  const pathContextValue = useMemo<GuideCursorPathContextValue | null>(() => {
    if (!onCursorSetupPathChosen) return null;
    return { choosePath };
  }, [choosePath, onCursorSetupPathChosen]);

  const guideSwitcherConfigs = useMemo((): GuideSwitcherConfig[] => {
    if (!guideSwitcher) return [];
    return Array.isArray(guideSwitcher) ? guideSwitcher : [guideSwitcher];
  }, [guideSwitcher]);

  const activeGuideSwitcher = useMemo(() => {
    return (
      guideSwitcherConfigs.find((cfg) =>
        cfg.slideIndexes.includes(selectedIndex),
      ) ?? null
    );
  }, [guideSwitcherConfigs, selectedIndex]);

  const showGuideSwitcher = activeGuideSwitcher !== null;

  const mainInner = (
      <div className="container mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8 px-4 py-6 sm:py-10 md:py-12">
        <div
          className="flex w-full items-center justify-center gap-4"
          onKeyDownCapture={(e) => {
            if (
              activeStep.disableNext &&
              (e.key === "ArrowRight" || e.key === "ArrowDown")
            ) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
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
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-sol-text-default">
                  {title}
                </h1>
                <div
                  className={cn(
                    descriptionMinHeightClass,
                    "text-sol-text-subtle",
                  )}
                >
                  {description ? (
                    typeof description === "string" ? (
                      <p className="text-inherit">{description}</p>
                    ) : (
                      <div className="space-y-2 text-inherit [&_p]:text-inherit">
                        {description}
                      </div>
                    )
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-4">
                <CarouselPrevious className="static shrink-0 translate-y-0" />
                <CarouselNext
                  className="static shrink-0 translate-y-0"
                  disabled={
                    Boolean(activeStep.disableNext) || !canScrollNext
                  }
                />
                {showGuideSwitcher ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        className="shrink-0 gap-2"
                      >
                        Select another guide
                        <ChevronDown className="size-4" aria-hidden />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[14rem]">
                      {activeGuideSwitcher!.items.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
              <div
                className={cn(
                  "shrink-0",
                  activeStep.slideOverflowVisible
                    ? "overflow-visible"
                    : "overflow-hidden",
                )}
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
                  className={cn(
                    "h-full w-full",
                    activeStep.slideOverflowVisible
                      ? "overflow-visible"
                      : "overflow-hidden",
                  )}
                  style={{ minHeight: 0 }}
                >
                  <CarouselContent className="h-full">
                    {steps.map((step, index) => (
                      <CarouselItem key={index} className="h-full min-h-0">
                        <div
                          className={cn(
                            "h-full w-full",
                            step.slideOverflowVisible
                              ? "overflow-visible"
                              : "overflow-hidden",
                          )}
                        >
                          {step.content}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
  );

  if (pathContextValue) {
    return (
      <GuideCursorPathContext.Provider value={pathContextValue}>
        <main className="bg-background flex min-h-0 w-full flex-1 flex-col">
          {mainInner}
        </main>
      </GuideCursorPathContext.Provider>
    );
  }

  return (
    <main className="bg-background flex min-h-0 w-full flex-1 flex-col">
      {mainInner}
    </main>
  );
}

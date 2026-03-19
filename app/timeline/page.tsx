"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@jllt/alize-ui";

const NAV_HEIGHT_PX = 56;
const SHRINK_SIZE_VW = 0.5;
const SCROLL_TO_SECTION2_DURATION_MS = 450;
const INTRO_HIDE_DURATION_MS = 550;
const STAGES_SHOW_DURATION_MS = 400;

type Step = "s1-full" | "s1-done" | "s2-done";

export default function TimelinePage() {
  const section2Ref = useRef<HTMLElement>(null);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [step, setStep] = useState<Step>("s1-full");
  const [introHiding, setIntroHiding] = useState(false);
  const [stagesVisible, setStagesVisible] = useState(false);

  useEffect(() => {
    const update = () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollRafRef = useRef<number | undefined>(undefined);
  const scrollBehaviorRestoreRef = useRef<string | null>(null);
  const pendingScrollToSection2Ref = useRef(false);

  const startScrollToSection2 = useCallback(() => {
    const el = section2Ref.current;
    if (!el) return;
    const start = window.scrollY;
    const end = start + el.getBoundingClientRect().top;
    const duration = SCROLL_TO_SECTION2_DURATION_MS;
    const startTime = performance.now();
    const html = document.documentElement;
    scrollBehaviorRestoreRef.current = html.style.scrollBehavior || "";
    html.style.scrollBehavior = "auto";
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const top = start + (end - start) * t;
      window.scrollTo({ top, behavior: "auto" });
      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(tick);
      } else {
        html.style.scrollBehavior = scrollBehaviorRestoreRef.current ?? "";
        scrollBehaviorRestoreRef.current = null;
      }
    };
    scrollRafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => {
    if (scrollRafRef.current != null) {
      cancelAnimationFrame(scrollRafRef.current);
      if (scrollBehaviorRestoreRef.current !== null) {
        document.documentElement.style.scrollBehavior = scrollBehaviorRestoreRef.current;
      }
    }
  }, []);

  const contentHeight = windowSize.h - NAV_HEIGHT_PX;
  const hasSize = windowSize.w > 0 && windowSize.h > 0;
  const shrinkSizePx = hasSize ? windowSize.w * SHRINK_SIZE_VW : 0;

  useEffect(() => {
    if (step !== "s2-done" || !pendingScrollToSection2Ref.current) return;
    pendingScrollToSection2Ref.current = false;
    requestAnimationFrame(() => {
      startScrollToSection2();
    });
  }, [step, startScrollToSection2]);

  // Trigger stages show animation when they mount (step becomes s1-done)
  useEffect(() => {
    if (step !== "s1-full") {
      const id = requestAnimationFrame(() => {
        setStagesVisible(true);
      });
      return () => cancelAnimationFrame(id);
    }
    setStagesVisible(false);
  }, [step]);

  const handleNext = () => {
    if (step === "s1-full") {
      setIntroHiding(true);
      setTimeout(() => {
        setStep("s1-done");
        setIntroHiding(false);
      }, INTRO_HIDE_DURATION_MS);
      return;
    }
    if (step === "s1-done") {
      setStep("s2-done");
      pendingScrollToSection2Ref.current = true;
    }
  };

  const showIntro = step === "s1-full";
  const showStages = step !== "s1-full";

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* Intro block — title, subtitle, button; hides on Take the journey (no shrink) */}
      {showIntro && hasSize && (
        <section
          className="flex flex-col items-center justify-center text-center px-4 w-screen"
          style={{
            width: "100vw",
            minHeight: "100vh",
            height: "100vh",
          }}
          aria-label="How AI has enhanced our workflow"
        >
          <div
            className="flex flex-col items-center ease-out"
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: `${INTRO_HIDE_DURATION_MS}ms`,
              opacity: introHiding ? 0 : 1,
              transform: introHiding ? "translateY(-12px)" : "translateY(0)",
            }}
          >
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              How AI has enhanced our workflow
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              A brief explanation.
            </p>
            <div className="mt-6 min-h-[2.75rem] flex items-center justify-center">
              <Button
                variant="outline"
                onClick={handleNext}
                size="lg"
                className={`ease-out ${
                  introHiding ? "pointer-events-none opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: `${INTRO_HIDE_DURATION_MS}ms`,
                }}
              >
                Take the journey
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Stage 1 — only visible after Take the journey; animates in */}
      {showStages && hasSize && (
        <section
          className="flex flex-col items-center justify-center bg-sol-surface-whisper text-center overflow-hidden ease-out"
          style={{
            width: shrinkSizePx,
            minHeight: shrinkSizePx,
            transitionProperty: "opacity, transform",
            transitionDuration: `${STAGES_SHOW_DURATION_MS}ms`,
            opacity: stagesVisible ? 1 : 0,
            transform: stagesVisible ? "translateY(0)" : "translateY(16px)",
          }}
          aria-label="Stage 1 (shrunk, in flow)"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Stage 1
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            The Beginning
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Where it all started.
          </p>
        </section>
      )}

      {/* Stage 2 — only visible after Take the journey; animates in */}
      {showStages && hasSize && (
        <section
          ref={section2Ref}
          className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background bg-sol-surface-whisper ease-out"
          style={{
            marginLeft: hasSize ? windowSize.w - shrinkSizePx : 0,
            width: shrinkSizePx,
            height: shrinkSizePx,
            minHeight: shrinkSizePx,
            transitionProperty: "opacity, transform",
            transitionDuration: `${STAGES_SHOW_DURATION_MS}ms`,
            transitionDelay: stagesVisible ? "80ms" : "0ms",
            opacity: stagesVisible ? 1 : 0,
            transform: stagesVisible ? "translateY(0)" : "translateY(16px)",
          }}
          aria-label="Stage 2: What came next"
        >
          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Stage 2
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              What came next
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              The next chapter.
            </p>
          </div>
        </section>
      )}

      {/* Stage 3 — only visible after Take the journey; animates in */}
      {showStages && hasSize && (
        <section
          className="flex flex-col items-center justify-center bg-sol-surface-whisper text-center overflow-hidden ease-out"
          style={{
            width: shrinkSizePx,
            minHeight: shrinkSizePx,
            transitionProperty: "opacity, transform",
            transitionDuration: `${STAGES_SHOW_DURATION_MS}ms`,
            transitionDelay: stagesVisible ? "160ms" : "0ms",
            opacity: stagesVisible ? 1 : 0,
            transform: stagesVisible ? "translateY(0)" : "translateY(16px)",
          }}
          aria-label="Stage 3"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Stage 3
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Building momentum
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Scaling what works.
          </p>
        </section>
      )}

      {/* Stage 4 — only visible after Take the journey; animates in */}
      {showStages && hasSize && (
        <section
          className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background bg-sol-surface-whisper ease-out"
          style={{
            marginLeft: hasSize ? windowSize.w - shrinkSizePx : 0,
            width: shrinkSizePx,
            height: shrinkSizePx,
            minHeight: shrinkSizePx,
            transitionProperty: "opacity, transform",
            transitionDuration: `${STAGES_SHOW_DURATION_MS}ms`,
            transitionDelay: stagesVisible ? "240ms" : "0ms",
            opacity: stagesVisible ? 1 : 0,
            transform: stagesVisible ? "translateY(0)" : "translateY(16px)",
          }}
          aria-label="Stage 4"
        >
          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Stage 4
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              The future
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Where we&apos;re headed next.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

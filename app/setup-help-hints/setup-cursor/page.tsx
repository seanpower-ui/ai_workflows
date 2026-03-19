import Image from "next/image";
import { GuidePageContent } from "../_components/GuidePageContent";

export default function SetupCursorPage() {
  return (
    <GuidePageContent
      steps={[
        {
          title: "1. Open Cursor",
          description: "You should be presented with a fresh window",
          content: (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper"
            >
              <Image
                src="/images/cursor-open-cursor-welcome.png"
                alt="Cursor welcome screen on dark canvas with Open project, Clone repo, and Connect via SSH"
                fill
                sizes="(max-width: 768px) 100vw, 1080px"
                className="object-contain object-center origin-center scale-[1.12]"
              />
            </div>
          ),
        },
        {
          title: "2. Open the terminal",
          description:
            "You can do this via the button top right of the window",
          content: (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper"
            >
              <Image
                src="/images/cursor-terminal-step2.png"
                alt="Cursor with Terminal panel open at the bottom, showing zsh prompt and toolbar"
                fill
                sizes="(max-width: 768px) 100vw, 1080px"
                className="object-contain object-center origin-center scale-[1.12]"
              />
            </div>
          ),
        },
        {
          title: "3. Go to your Documents folder",
          description: "In the terminal, run cd Documents to move into Documents",
          content: (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper"
            >
              <Image
                src="/images/cursor-step3-cd-documents.png"
                alt="Cursor terminal showing cd Documents and prompt in Documents directory"
                fill
                sizes="(max-width: 768px) 100vw, 1080px"
                className="object-contain object-center origin-center scale-[1.12]"
              />
            </div>
          ),
        },
        {
          title: "4. Create a folder for your work",
          description:
            "Use mkdir to create a folder, then cd into it — e.g. mkdir ForDemo and cd ForDemo",
          content: (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper"
            >
              <Image
                src="/images/cursor-step4-mkdir-fordemo.png"
                alt="Cursor terminal with mkdir ForDemo, cd ForDemo, and prompt in ForDemo folder"
                fill
                sizes="(max-width: 768px) 100vw, 1080px"
                className="object-contain object-center origin-center scale-[1.12]"
              />
            </div>
          ),
        },
        {
          title: "Step 5 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 5 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 6 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 6 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 7 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 7 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 8 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 8 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 9 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 9 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 10 — placeholder",
          description: "",
          content: (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
              <span className="text-lg">Step 10 — placeholder</span>
            </div>
          ),
        },
      ]}
    />
  );
}

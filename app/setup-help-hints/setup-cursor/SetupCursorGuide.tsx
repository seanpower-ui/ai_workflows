"use client";

import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Button, cn } from "@jllt/alize-ui";
import { CursorSetupPathTiles } from "../_components/CursorSetupPathTiles";
import {
  GuidePageContent,
  type CursorSetupPathChoice,
  type GuideStep,
  type GuideSwitcherConfig,
} from "../_components/GuidePageContent";

const SANDBOX_ALIZE_UI_ARTIFACTORY_URL =
  "https://artifacts.jll.com/ui/packages/npm:%2F%2F@jllt%2Falize-ui/";

const SANDBOX_STEP5_NPMRC_SNIPPET = `@jllt:registry=https://artifacts.jll.com/artifactory/api/npm/jllt-npm-release/
//artifacts.jll.com/artifactory/api/npm/jllt-npm-release/:_authToken=[your token]
always-auth=true
legacy-peer-deps=true`;

const SETUP_HELP_OTHER_GUIDES: GuideSwitcherConfig["items"] = [
  { href: "/setup-help-hints/setup-github", label: "Setup with GitHUB" },
  { href: "/setup-help-hints/creating-prds", label: "Creating PRDs" },
  { href: "/setup-help-hints/building-features", label: "Building Features" },
];

function GuideCopyBlock({
  value,
  linkHref,
  textClassName,
}: {
  value: string;
  /** When set, the value is shown as a link (opens in a new tab). Copy still uses `value`. */
  linkHref?: string;
  textClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [value]);

  return (
    <div className="flex items-start gap-3 rounded-md border border-sol-stroke-default bg-sol-surface-default p-3">
      <div
        className={cn(
          "min-w-0 flex-1 font-mono text-xs leading-relaxed text-sol-text-default sm:text-sm",
          textClassName,
        )}
      >
        {linkHref ? (
          <a
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className="break-all underline underline-offset-2 transition-colors hover:text-sol-text-subtle"
          >
            {value}
          </a>
        ) : (
          <span className="whitespace-pre-wrap break-all">{value}</span>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0 gap-1.5"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

function postTileStepTitle(path: CursorSetupPathChoice | null) {
  if (path === "existing") return "3. Clone the repository";
  if (path === "sandbox") return "3. Create folder for the sand box";
  return "Step 3";
}

function postTileStepDescription(path: CursorSetupPathChoice | null) {
  if (path === "existing")
    return "Open the terminal via the first icon in the top right of the window or use shortcuts (Ctrl/Cmd J). You now need to use 'cd' to select the folder you want to clone the repo within. Next type 'git clone git@github.com:JLLT-Apps/your-repo-name.git'";
  if (path === "sandbox")
    return "If you have an existing folder ready to use, just type 'cd' following the name and hit enter. If you need to create a new one, you can use 'mkdir' followed by the name.";
  return "";
}

function postTileStepContent(path: CursorSetupPathChoice | null) {
  if (path === "existing") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step3-existing-clone-44ef6180.png"
          alt="Cursor welcome with Open project, Clone repo, and Connect via SSH, and terminal showing cd Documents and git clone with a GitHub SSH URL placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  if (path === "sandbox") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step3-sandbox-531ae2bb23c3.png"
          alt="Cursor welcome with Open project, Clone repo, and Connect via SSH, and terminal showing cd Documents, mkdir ForDemo, and cd ForDemo"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
      <span className="text-sm">Choose a path on step 2</span>
    </div>
  );
}

function existingRepoStep4Title(path: CursorSetupPathChoice | null) {
  if (path === "existing") return "4. Open your project";
  if (path === "sandbox") return "4. Create new text file";
  return "Step 4";
}

function existingRepoStep4Description(path: CursorSetupPathChoice | null) {
  if (path === "existing")
    return "Now, open the newly cloned project. You should now see the file tree, chat panel, and shortcuts in the editor area. You are now setup with Cursor, you can select another setup guide if needed.";
  if (path === "sandbox")
    return "Using 'File', create a new text file or use the shortcut 'Ctrl/Cmd N'.";
  return "";
}

function existingRepoStep4Content(path: CursorSetupPathChoice | null) {
  if (path === "existing") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step4-existing-opened-f26a7948.png"
          alt="Cursor with cloned jllt- project open: New Chat and Agent on the left, keyboard shortcuts in the center, file explorer with src and config files on the right"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  if (path === "sandbox") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step4-sandbox-c40b495b4578.png"
          alt="Cursor with File menu open showing Open, Open Folder, and Open Recent; ForDemo in the title bar and welcome shortcuts for terminal, files, and search"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
      <span className="text-sm">Choose a path on step 2</span>
    </div>
  );
}

function step5Title(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") return "5. Connecting the sand box with Solstice";
  return "5. Step 5 — placeholder";
}

function step5Description(path: CursorSetupPathChoice | null): string | ReactNode {
  if (path === "sandbox") {
    return (
      <>
        <p>Paste this:</p>
        <GuideCopyBlock
          value={SANDBOX_STEP5_NPMRC_SNIPPET}
          textClassName="max-h-52 overflow-x-auto overflow-y-auto overscroll-contain"
        />
        <p>
          This is going to get the sand box connected for use to directly use
          Solstice via Cursor.
        </p>
      </>
    );
  }
  return "";
}

function step5Content(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step5-sandbox-456f333892dd.png"
          alt="Cursor with ForDemo folder open: plain text Untitled file showing JLL npm registry lines, auth token placeholder, always-auth and legacy-peer-deps; New Chat sidebar on the left"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
      <span className="text-lg">Step 5 — placeholder</span>
    </div>
  );
}

function step6Title(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") return "6. Go to the artifactory";
  return "6. Step 6 — placeholder";
}

function step6Description(path: CursorSetupPathChoice | null): string | ReactNode {
  if (path === "sandbox") {
    return (
      <>
        <p>Head over to the artifactory by using this url:</p>
        <GuideCopyBlock
          value={SANDBOX_ALIZE_UI_ARTIFACTORY_URL}
          linkHref={SANDBOX_ALIZE_UI_ARTIFACTORY_URL}
        />
      </>
    );
  }
  return "";
}

function step6Content(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step6-sandbox-cf75b966601c.png"
          alt="JFrog Artifactory package page for @jllt/alize-ui: version dropdown with 1.4.2, All Versions, npm install command, Set Me Up button, and Readme tab for the Alizé component library"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
      <span className="text-lg">Step 6 — placeholder</span>
    </div>
  );
}

function step7Title(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") return "7. Generating your token";
  return "7. Step 7 — placeholder";
}

function step7Description(path: CursorSetupPathChoice | null) {
  if (path === "sandbox")
    return "Via the profile menu, in the top right. Click 'Edit Profile'.";
  return "";
}

function step7Content(path: CursorSetupPathChoice | null) {
  if (path === "sandbox") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
        <Image
          src="/images/cursor-step7-sandbox-44e84d29c86a.png"
          alt="JFrog Platform User Profile: Authentication Settings with Generate an Identity Token button and identity tokens table"
          fill
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle">
      <span className="text-lg">Step 7 — placeholder</span>
    </div>
  );
}

function sandboxStep8Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step8-sandbox-a2de14774374.png"
        alt="Generate Identity Token dialog: Reference Token field with copy control, token metadata, and warning to copy the token before closing"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

function sandboxStep9Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step9-sandbox-b41ac6e46d40.png"
        alt="Cursor ForDemo project: text file with npmrc lines including _authToken on the JLL registry line; New Chat sidebar visible"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

function sandboxStep10Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step10-sandbox-9b2b5d2afbab.png"
        alt="Cursor save dialog for .npmrc with macOS alert: confirm using a name that begins with a full stop; Use dot button to confirm"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

function sandboxStep11Description(): ReactNode {
  return (
    <>
      <p>
        All that is left now is to install Solstice into your sand box
        project. To do this, open the terminal back up and type:
      </p>
      <GuideCopyBlock value="npx @jllt/alize-ui" />
      <p>Hit enter.</p>
    </>
  );
}

function sandboxStep11Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step11-sandbox-a4b4cd207e66.png"
        alt="Cursor ForDemo: .npmrc open in editor, file explorer showing .npmrc, terminal with npx @jllt/alize-ui typed and ready to run"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

function sandboxStep12Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step12-sandbox-ba0539e02031.png"
        alt="Cursor terminal: npx @jllt/alize-ui Ok to proceed prompt, user entered y, Alize UI installer starting and installing dependencies"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

function sandboxStep13Description(): ReactNode {
  return (
    <>
      <p>
        You are now all setup and ready to start using the sand box. In order
        to see visually what you will be creating, enter:
      </p>
      <GuideCopyBlock value="npm run dev" />
      <p>
        This will start up the local server for you and you will be presented
        with this page in Cursor&apos;s Simple Browser.
      </p>
      <p>
        Your sand box is now ready to use Solstice, you can select another
        setup guide if needed.
      </p>
    </>
  );
}

function sandboxStep13Content() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
      <Image
        src="/images/cursor-step13-sandbox-4636f62c6fd6.png"
        alt="Cursor Simple Browser showing Welcome to Alize UI at localhost:3000, sample components, terminal with npm run dev and GET / 200, ForDemo project files"
        fill
        sizes="(max-width: 768px) 100vw, 1080px"
        className="object-contain object-center"
      />
    </div>
  );
}

export function SetupCursorGuide() {
  const [pathChoice, setPathChoice] = useState<CursorSetupPathChoice | null>(
    null,
  );

  const steps = useMemo<GuideStep[]>(() => {
    const list: GuideStep[] = [
      {
        title: "1. Open Cursor",
        description: "You should be presented with a fresh window",
        content: (
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-whisper">
            <Image
              src="/images/cursor-open-cursor-welcome.png"
              alt="Cursor launch screen with search bar, CURSOR logo, Open project, Clone repo, and Connect via SSH"
              fill
              sizes="(max-width: 768px) 100vw, 1080px"
              className="object-contain object-center"
            />
          </div>
        ),
      },
      {
        title: "2. Which setup do you need?",
        description:
          "Select if you need steps to clone your projects repo or start from scratch in a private sand box",
        disableNext: true,
        slideOverflowVisible: true,
        content: (
          <div className="h-full min-h-0 w-full min-w-0">
            <CursorSetupPathTiles />
          </div>
        ),
      },
      {
        title: postTileStepTitle(pathChoice),
        description: postTileStepDescription(pathChoice),
        content: postTileStepContent(pathChoice),
      },
      {
        title: existingRepoStep4Title(pathChoice),
        description: existingRepoStep4Description(pathChoice),
        content: existingRepoStep4Content(pathChoice),
        disableNext: pathChoice === "existing",
      },
      {
        title: step5Title(pathChoice),
        description: step5Description(pathChoice),
        content: step5Content(pathChoice),
      },
      {
        title: step6Title(pathChoice),
        description: step6Description(pathChoice),
        content: step6Content(pathChoice),
      },
      {
        title: step7Title(pathChoice),
        description: step7Description(pathChoice),
        content: step7Content(pathChoice),
      },
    ];

    if (pathChoice === "sandbox") {
      list.push({
        title: "8. Copy the token",
        description:
          "Click 'Generate an Identity Token', give it any description that is relevant to your project. Now copy your token.",
        content: sandboxStep8Content(),
      });
      list.push({
        title: "9. Paste in the token",
        description:
          'Head back to your Cursor window. Within the text file you created earlier, paste your token in place of "[your token]".',
        content: sandboxStep9Content(),
      });
      list.push({
        title: "10. Setting up your npmrc file",
        description:
          "Now you can save this text file, do this by using 'Ctrl/Cmd S'. Save the file name as \".npmrc\". When you see this message, click 'Use'.",
        content: sandboxStep10Content(),
      });
      list.push({
        title: "11. Installing Solstice (Alizé)",
        description: sandboxStep11Description(),
        content: sandboxStep11Content(),
      });
      list.push({
        title: "12. Installing Solstice - Continued",
        description:
          "You'll be prompted to proceed, enter 'y'. The installation will now begin!",
        content: sandboxStep12Content(),
      });
      list.push({
        title: "13. All setup and ready to go!",
        description: sandboxStep13Description(),
        content: sandboxStep13Content(),
      });
    }

    return list;
  }, [pathChoice]);

  const guideSwitcher: GuideSwitcherConfig | undefined =
    pathChoice === "existing"
      ? { slideIndexes: [3], items: SETUP_HELP_OTHER_GUIDES }
      : pathChoice === "sandbox"
        ? { slideIndexes: [12], items: SETUP_HELP_OTHER_GUIDES }
        : undefined;

  return (
    <GuidePageContent
      steps={steps}
      guideSwitcher={guideSwitcher}
      descriptionMinHeightClass="min-h-[7.5rem]"
      onCursorSetupPathChosen={(path) => {
        setPathChoice(path);
      }}
    />
  );
}

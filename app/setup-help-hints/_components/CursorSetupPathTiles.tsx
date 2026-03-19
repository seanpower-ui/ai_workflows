"use client";

import { Folder } from "lucide-react";
import { MaterialSymbol } from "@jllt/alize-ui";
import {
  useGuideCursorPath,
  type CursorSetupPathChoice,
} from "./GuidePageContent";

const tileClassName =
  "group flex w-full cursor-pointer flex-col rounded-lg border border-sol-stroke-default bg-sol-surface-default text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-sol-stroke-strong hover:bg-sol-surface-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type PathTileProps = {
  path: CursorSetupPathChoice;
  title: string;
  icon: React.ReactNode;
};

function PathTile({ path, title, icon }: PathTileProps) {
  const ctx = useGuideCursorPath();

  if (!ctx) {
    return null;
  }

  return (
    <button
      type="button"
      className={tileClassName}
      onClick={() => ctx.choosePath(path)}
    >
      <div
        className="flex h-[120px] w-full items-center justify-center bg-sol-surface-whisper transition-colors duration-200 group-hover:bg-sol-surface-hover/50"
        style={{ height: 120, minHeight: 120 }}
        aria-hidden
      >
        <div className="text-sol-text-subtle transition-colors duration-200 group-hover:text-sol-text-default [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:scale-110">
          {icon}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 text-left">
        <h2 className="font-semibold text-sol-text-default transition-colors duration-200 group-hover:text-sol-text-strong">
          {title}
        </h2>
      </div>
    </button>
  );
}

export function CursorSetupPathTiles() {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center px-2 py-6">
      <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 sm:gap-x-10">
        <PathTile
          path="existing"
          title="Existing Repo"
          icon={<Folder className="size-10" aria-hidden />}
        />
        <PathTile
          path="sandbox"
          title="Sand Box"
          icon={
            <MaterialSymbol name="fiber_new" size={40} weight={300} aria-hidden />
          }
        />
      </div>
    </div>
  );
}

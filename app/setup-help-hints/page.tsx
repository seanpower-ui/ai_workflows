import Link from "next/link";
import Image from "next/image";
import { Terminal, Github, FileText, Wrench, List, type LucideIcon } from "lucide-react";

type TileItem = {
  href: string;
  image?: string | null;
  imageAlt?: string;
  title: string;
  subText: string;
  icon: LucideIcon;
};

const tiles: TileItem[] = [
  {
    href: "/setup-help-hints/setup-cursor",
    image: null,
    title: "Setup with Cursor",
    subText: "Guide to get your coding agent setup",
    icon: Terminal,
  },
  {
    href: "/setup-help-hints/setup-github",
    image: null,
    title: "Setup with GitHUB",
    subText: "Guide to prepare your environment",
    icon: Github,
  },
  {
    href: "/setup-help-hints/creating-prds",
    image: null,
    title: "Creating PRDs",
    subText: "Structure documents via your agent",
    icon: FileText,
  },
  {
    href: "/setup-help-hints/building-features",
    image: null,
    title: "Building Features",
    subText: "Start to build & test ideas",
    icon: Wrench,
  },
  {
    href: "#",
    image: null,
    title: "Glossary",
    subText: "Words and terms to learn",
    icon: List,
  },
];

function Tile({ href, image, imageAlt, title, subText, icon: Icon }: TileItem) {
  return (
    <Link
      href={href}
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-sol-stroke-default bg-sol-surface-default shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-sol-stroke-strong hover:bg-sol-surface-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="h-[120px] w-full bg-sol-surface-whisper transition-colors duration-200 group-hover:bg-sol-surface-hover/50"
        style={{ height: 120, minHeight: 120 }}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            width={320}
            height={720}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="flex h-[120px] w-full min-h-[120px] items-center justify-center text-sol-text-subtle transition-colors duration-200 group-hover:text-sol-text-default"
            style={{ height: 120, minHeight: 120 }}
            aria-hidden
          >
            <Icon className="size-10 transition-transform duration-200 group-hover:scale-110" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 text-left">
        <h2 className="font-semibold text-sol-text-default transition-colors duration-200 group-hover:text-sol-text-strong">
          {title}
        </h2>
        <p className="mt-1 text-sm text-sol-text-subtle transition-colors duration-200 group-hover:text-sol-text-default">
          {subText}
        </p>
      </div>
    </Link>
  );
}

export default function SetupHelpHintsPage() {
  return (
    <main
      className="bg-background flex w-full flex-col overflow-y-auto"
      style={{
        height: "calc(100dvh - 3.5rem)",
        minHeight: "calc(100dvh - 3.5rem)",
      }}
    >
      <div className="container mx-auto flex h-full min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-6 sm:py-10 md:py-12">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tiles.map((tile) => (
            <Tile key={tile.title} {...tile} />
          ))}
        </div>
      </div>
    </main>
  );
}

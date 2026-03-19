import type { Metadata } from "next";
import { Providers } from "./providers";
import { TopNav } from "./components/TopNav";
import "./globals.css";
import "@jllt/alize-ui/dist/alize.css";

export const metadata: Metadata = {
  title: "AI Enhanced Workflows",
  description: "AI Enhanced Workflows",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/">) {
  await params;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-dvh w-full flex-col">
            <TopNav />
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

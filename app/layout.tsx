import type { Metadata } from "next";
import { Providers } from "./providers";
import { TopNav } from "./components/TopNav";
import "@jllt/alize-ui/dist/alize.css";

export const metadata: Metadata = {
  title: "AI Enhanced Workflows",
  description: "AI Enhanced Workflows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-dvh w-full flex-col">
            <TopNav />
            <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

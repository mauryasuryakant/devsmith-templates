"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BsSearch, BsImage, BsNewspaper, BsMap } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AccountBtn } from "@/features/account";
import { SearchBar } from "@/features/search-bar";
import { searchEngineConfig } from "@/../devsmith.config";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  search: <BsSearch />,
  video: <BsFillCameraVideoFill />,
  image: <BsImage />,
  newspaper: <BsNewspaper />,
  map: <BsMap />,
};

function SearchLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4 px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading font-bold text-xl text-primary">
              {searchEngineConfig.app.name}
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Account */}
          <div className="flex-shrink-0">
            <AccountBtn />
          </div>
        </div>

        {/* Category tabs */}
        <nav className="flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
          {searchEngineConfig.searchCategories.map((cat) => {
            const isActive = cat.pathPattern.test(pathname);
            const href = cat.external
              ? `${cat.href}${query}`
              : `${cat.href}?q=${query}`;

            return (
              <Link
                key={cat.title}
                href={href}
                prefetch={!cat.external}
                target={cat.external ? "_blank" : undefined}
                rel={cat.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="text-xs">{iconMap[cat.icon]}</span>
                <span>{cat.title}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SearchLayoutInner>{children}</SearchLayoutInner>
    </Suspense>
  );
}

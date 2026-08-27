"use client";

import { FaSearch } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Suggestion {
  value: string;
}

const fetchSuggestions = async (search: string, signal: AbortSignal): Promise<string[]> => {
  if (!search.trim()) return [];
  try {
    const res = await fetch(
      `https://auto-suggest-queries.p.rapidapi.com/suggestqueries?query=${search}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST ?? "",
        },
        signal,
      }
    );
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

interface SearchBarProps {
  size?: "default" | "large";
}

export default function SearchBar({ size = "default" }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetchSuggestions(search, controller.signal).then(setSuggestions).catch(() => {});
    return () => controller.abort();
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current?.blur();
    setShowSuggestions(false);
    const target = pathname === "/" ? `/search?q=${search}` : `${pathname}?q=${search}`;
    router.push(target);
    fetch(`/api/history?q=${search}&p=${pathname}&t=${Date.now()}`).catch(() => {});
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setShowSuggestions(false);
    const target = pathname === "/" ? `/search?q=${suggestion}` : `${pathname}?q=${suggestion}`;
    router.push(target);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-card",
          "shadow-sm focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all",
          size === "large" ? "px-5 py-3" : "px-4 py-2"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Start typing to search..."
          className={cn(
            "flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
            size === "large" ? "text-base" : "text-sm"
          )}
          autoComplete="off"
        />
        <button
          type="submit"
          className="flex-shrink-0 flex items-center justify-center p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label="Search"
        >
          <FaSearch className="text-sm" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer text-sm transition-colors"
            >
              <FaSearch className="text-muted-foreground text-xs flex-shrink-0" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

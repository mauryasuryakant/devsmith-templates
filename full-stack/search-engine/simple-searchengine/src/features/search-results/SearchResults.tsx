"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import type { SearchResult, CardData } from "@/types";
import { searchEngineConfig } from "@/../devsmith.config";
import ResultSnippet from "./ResultSnippet";
import KnowledgeCard from "./KnowledgeCard";
import NoResults from "./NoResults";
import LoadMoreBtn from "./LoadMoreBtn";
import ResultSkeleton from "./ResultSkeleton";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  useEffect(() => {
    setResults([]);
    setLoading(true);
    setError(false);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    axios
      .get(`/api/search?q=${query}&page=${page}`)
      .then((res) => setResults((prev) => [...prev, ...(res.data ?? [])]))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setIsMoreLoading(false);
      });
  }, [query, page]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Something went wrong. Please try again.
      </div>
    );
  }

  if (!loading && results.length === 0) {
    return <NoResults query={query} />;
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0 space-y-2">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ResultSkeleton key={i} />)
          : results.map((result) => (
              <ResultSnippet key={result.link} result={result} />
            ))}

        {!loading && page < searchEngineConfig.pagination.maxSearchPages && (
          <div className="pt-4">
            <LoadMoreBtn
              isLoading={isMoreLoading}
              onClick={() => {
                setPage((p) => p + 1);
                setIsMoreLoading(true);
              }}
            />
          </div>
        )}
      </div>

      <aside className="hidden lg:block w-80 flex-shrink-0">
        <KnowledgeCard query={query} />
      </aside>
    </div>
  );
}

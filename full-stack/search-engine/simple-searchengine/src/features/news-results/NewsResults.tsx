"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import type { NewsResult } from "@/types";
import { NoResults, LoadMoreBtn } from "@/features/search-results";
import { formatTimestamp } from "@/lib/utils";
import { searchEngineConfig } from "@/../devsmith.config";
import Image from "next/image";

function NewsCard({ result }: { result: NewsResult }) {
  const { title, description, thumbnail, publishedBy, publishedAt, url } = result;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
    >
      {thumbnail && (
        <div className="flex-shrink-0 w-32 rounded-lg overflow-hidden bg-muted">
          <Image
            src={thumbnail}
            alt={title}
            width={128}
            height={80}
            className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-sm text-primary group-hover:underline line-clamp-2 mb-1">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span>{publishedBy}</span>
          {publishedAt && <span>· {formatTimestamp(publishedAt)}</span>}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}
      </div>
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="flex gap-4 p-3 animate-pulse">
      <div className="w-32 h-20 bg-muted rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted rounded w-full" />
      </div>
    </div>
  );
}

export default function NewsResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<NewsResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  useEffect(() => {
    setResults([]);
    setLoading(true);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    axios
      .get(`/api/search/news?q=${query}&page=${page}`)
      .then((res) => setResults((prev) => [...prev, ...(res.data ?? [])]))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setIsMoreLoading(false);
      });
  }, [query, page]);

  if (loading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 10 }).map((_, i) => <NewsSkeleton key={i} />)}
      </div>
    );
  }

  if (!results.length) return <NoResults query={query} type="News" />;

  return (
    <div>
      <div className="divide-y divide-border">
        {results.map((result, i) => (
          <NewsCard key={`${result.url}-${i}`} result={result} />
        ))}
      </div>
      {page < searchEngineConfig.pagination.maxSearchPages && (
        <div className="mt-6">
          <LoadMoreBtn
            isLoading={isMoreLoading}
            onClick={() => { setPage((p) => p + 1); setIsMoreLoading(true); }}
          />
        </div>
      )}
    </div>
  );
}

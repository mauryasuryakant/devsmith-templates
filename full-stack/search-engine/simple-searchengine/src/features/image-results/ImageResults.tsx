"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import type { ImageResult } from "@/types";
import { searchEngineConfig } from "@/../devsmith.config";
import { NoResults, LoadMoreBtn } from "@/features/search-results";
import Image from "next/image";

function ImageCard({ result }: { result: ImageResult }) {
  const { thumbnail, link, title } = result;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden border border-border bg-card hover:border-primary transition-colors"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2">
        <p className="text-xs text-foreground font-medium line-clamp-2">{title}</p>
      </div>
    </a>
  );
}

function ImageSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card animate-pulse">
      <div className="aspect-video bg-muted rounded-t-xl" />
      <div className="p-2 space-y-1">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  );
}

export default function ImageResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<ImageResult[]>([]);
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
      .get(`/api/search/images?q=${query}&page=${page}`)
      .then((res) => setResults((prev) => [...prev, ...(res.data ?? [])]))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setIsMoreLoading(false);
      });
  }, [query, page]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {Array.from({ length: 15 }).map((_, i) => <ImageSkeleton key={i} />)}
      </div>
    );
  }

  if (results.length === 0) return <NoResults query={query} type="Images" />;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {results.map((result, i) => <ImageCard key={`${result.link}-${i}`} result={result} />)}
      </div>
      {page < searchEngineConfig.pagination.maxImagePages && (
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

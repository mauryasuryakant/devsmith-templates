"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { VideoResult, PageInfo } from "@/types";
import { NoResults, LoadMoreBtn } from "@/features/search-results";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";

function VideoCard({ result }: { result: VideoResult }) {
  const { title, description, thumbnail, publishedBy, publishedAt, link } = result;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
    >
      <div className="flex-shrink-0 w-48 rounded-lg overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={title}
          width={192}
          height={108}
          className="w-full h-27 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-sm text-primary group-hover:underline line-clamp-2 mb-1">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground mb-1">{publishedBy}</p>
        <p className="text-xs text-muted-foreground mb-2">{formatTimestamp(publishedAt)}</p>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {description.substring(0, 200)}
        </p>
      </div>
    </a>
  );
}

function VideoSkeleton() {
  return (
    <div className="flex gap-4 p-3 animate-pulse">
      <div className="w-48 h-27 bg-muted rounded-lg flex-shrink-0" style={{ height: "108px" }} />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}

export default function VideoResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<VideoResult[]>([]);
  const [pageToken, setPageToken] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setResults([]);
    setLoading(true);
    setPageToken("");
    setNextPageToken("");
  }, [query]);

  useEffect(() => {
    if (!query) return;
    fetch(`/api/search/videos?q=${query}&page=${pageToken}`)
      .then((res) => res.json())
      .then((data) => {
        setResults((prev) => [...prev, ...(data?.videos ?? [])]);
        setNextPageToken(data?.pageInfo?.nextPageToken ?? "");
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setIsMoreLoading(false);
      });
  }, [query, pageToken]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Something went wrong. Please try again.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 8 }).map((_, i) => <VideoSkeleton key={i} />)}
      </div>
    );
  }

  if (!results.length) return <NoResults query={query} type="Videos" />;

  return (
    <div>
      <div className="divide-y divide-border">
        {results.map((result, i) => (
          <VideoCard key={`${result.link}-${i}`} result={result} />
        ))}
      </div>
      {nextPageToken && (
        <div className="mt-6">
          <LoadMoreBtn
            isLoading={isMoreLoading}
            onClick={() => { setPageToken(nextPageToken); setIsMoreLoading(true); }}
          />
        </div>
      )}
    </div>
  );
}

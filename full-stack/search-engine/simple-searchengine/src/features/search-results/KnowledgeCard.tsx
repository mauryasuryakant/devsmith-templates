"use client";

import { useEffect, useState, useRef } from "react";
import type { CardData } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface KnowledgeCardProps {
  query: string;
}

export default function KnowledgeCard({ query }: KnowledgeCardProps) {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setCardData(null);

    fetch(`/api/card?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.content || data.content.length < 15) {
          setError(true);
        } else {
          setCardData(data);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [query]);

  if (error || (!loading && !cardData)) return null;

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 space-y-3 animate-pulse">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!cardData) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        cardData.type === "ai" && "border-primary/30 bg-primary/5"
      )}
    >
      {cardData.image && (
        <Image
          src={cardData.image}
          alt={cardData.title}
          width={280}
          height={180}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}
      <h2 className="font-heading font-bold text-base mb-1">{cardData.title}</h2>
      {cardData.description && (
        <p className="text-xs text-muted-foreground mb-2">{cardData.description}</p>
      )}
      <div
        className="text-sm text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: cardData.content }}
      />
      {cardData.type === "ai" && (
        <p className="text-xs text-primary mt-2 font-medium">✦ AI-generated answer</p>
      )}
    </div>
  );
}

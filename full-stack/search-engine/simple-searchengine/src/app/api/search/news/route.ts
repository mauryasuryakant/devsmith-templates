import { NextRequest, NextResponse } from "next/server";
import type { NewsResult } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  console.log(`Calling News API: q=${q}, page=${page}`);

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEWS_API_KEY}&page=${page}`
    );

    const responseJson = await response.json();

    if (!responseJson?.articles || !Array.isArray(responseJson.articles)) {
      console.warn("News API returned no articles:", responseJson?.message ?? responseJson);
      return NextResponse.json([]);
    }

    const articles: NewsResult[] = responseJson.articles.map(
      (item: Record<string, unknown>) => ({
        title: item.title,
        description: item.content,
        thumbnail: item.urlToImage ?? null,
        publishedBy: (item.source as Record<string, string>).name,
        publishedAt: item.publishedAt,
        url: item.url,
      })
    );

    return NextResponse.json(articles);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json([]);
  }
}

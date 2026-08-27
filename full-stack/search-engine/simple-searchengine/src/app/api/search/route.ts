import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import fetchSearchResults from "@/utils/fetchSearchResults";
import fetchNewsResults from "@/utils/fetchNewsResults";
import fetchVideosResults from "@/utils/fetchVideosResults";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const start = (page - 1) * 10 + 1;

  console.log(`Calling Search API: q=${q}, start=${start}`);

  try {
    const [newsResults, searchResults, videosResults] = await Promise.all([
      fetchNewsResults(q, page, 7).catch(() => []),
      fetchSearchResults(q, start).catch(() => []),
      fetchVideosResults(q, page, 4).catch(() => []),
    ]);

    const RESULTS = [...newsResults, ...searchResults, ...videosResults];
    return NextResponse.json(_.shuffle(RESULTS));
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json([]);
  }
}

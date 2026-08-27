import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import fetchImageResults from "@/utils/fetchImageResults";
import fetchVideosResults from "@/utils/fetchVideosResults";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  console.log(`Calling Image API: q=${q}, page=${page}`);

  try {
    const [imageResults, videosResults] = await Promise.all([
      fetchImageResults(q, page).catch(() => []),
      fetchVideosResults(q, page, 4).catch(() => []),
    ]);

    const RESULTS = [...imageResults, ...videosResults];
    return NextResponse.json(_.shuffle(RESULTS));
  } catch (error) {
    console.error("Image API error:", error);
    return NextResponse.json([]);
  }
}

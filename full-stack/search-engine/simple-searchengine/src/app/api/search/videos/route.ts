import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const page = searchParams.get("page") ?? "";

  console.log(`Calling Videos API: q=${q}, page=${page}`);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q=${q}&type=video&key=${process.env.YOUTUBE_API_KEY}&pageToken=${page}`
  ).catch((err) => {
    console.error(err);
    return null;
  });

  if (!response) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  const responseJson = await response.json();

  if (!responseJson?.items?.length) {
    return NextResponse.json({ videos: [], pageInfo: {} });
  }

  const videos = responseJson.items.map((item: Record<string, unknown>) => ({
    id: (item.id as Record<string, string>).videoId,
    title: (item.snippet as Record<string, string>).title,
    description: (item.snippet as Record<string, string>).description,
    thumbnail: ((item.snippet as Record<string, Record<string, Record<string, string>>>).thumbnails.medium).url,
    publishedBy: (item.snippet as Record<string, string>).channelTitle,
    publishedAt: (item.snippet as Record<string, string>).publishedAt,
    link: `https://www.youtube.com/watch?v=${(item.id as Record<string, string>).videoId}`,
  }));

  const pageInfo = {
    nextPageToken: responseJson.nextPageToken,
    totalResults: responseJson.pageInfo?.totalResults,
    resultsPerPage: responseJson.pageInfo?.resultsPerPage,
  };

  return NextResponse.json({ videos, pageInfo });
}

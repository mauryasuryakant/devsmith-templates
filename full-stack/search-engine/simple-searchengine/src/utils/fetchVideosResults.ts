import type { SearchResult } from "@/types";

const fetchVideosResults = (q: string, page: number, max = 60): Promise<SearchResult[]> => {
  if (page > 8) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&type=video&order=viewCount&key=${process.env.YOUTUBE_API_KEY}&safeSearch=moderate`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const responseItems = responseJson.items;
        if (!responseItems) {
          resolve([]);
          return;
        }
        const restrictedWords = ["#shorts"];
        const items: SearchResult[] = responseItems
          .filter(
            (item: Record<string, unknown>) =>
              !restrictedWords.some((word) =>
                ((item.snippet as Record<string, string>).title ?? "").toLowerCase().includes(word)
              )
          )
          .slice((page - 1) * max, (page - 1) * max + max)
          .map((item: Record<string, unknown>) => ({
            title: (item.snippet as Record<string, unknown>).title,
            link: `https://www.youtube.com/watch?v=${(item.id as Record<string, string>).videoId}`,
            displayLink: "youtube.com",
            snippet: (item.snippet as Record<string, unknown>).description,
            thumbnail: ((item.snippet as Record<string, unknown>).thumbnails as Record<string, Record<string, string>>).medium.url,
            favicon: `https://www.google.com/s2/favicons?domain=https://www.youtube.com&sz=256`,
          }));
        resolve(items);
      })
      .catch((error) => {
        console.error(error);
        reject([]);
      });
  });
};

export default fetchVideosResults;

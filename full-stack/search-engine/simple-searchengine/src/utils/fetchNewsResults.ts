import axios from "axios";
import type { SearchResult } from "@/types";

const fetchNewsResults = (q: string, page: number, max = 60): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${q}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
      )
      .then((res) => {
        const responseItems = res.data.articles;
        if (!responseItems) {
          resolve([]);
          return;
        }
        const items: SearchResult[] = responseItems
          .slice(0, max)
          .map((item: Record<string, unknown>) => {
            const title = item.title as string;
            const content = item.content as string;
            const description = item.description as string;
            const url = item.url as string;
            return {
              title: title.length > 70 ? title.substring(0, 70) + "..." : title,
              link: url,
              displayLink: url.replace(/(^\w+:|^)\/\//, "").split("/")[0],
              snippet:
                content && content.length > 150
                  ? content.substring(0, 150) + "..."
                  : description,
              thumbnail: (item.urlToImage as string) ?? null,
              favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=256`,
            };
          });
        resolve(items);
      })
      .catch((error) => {
        console.error(error);
        resolve([]);
      });
  });
};

export default fetchNewsResults;

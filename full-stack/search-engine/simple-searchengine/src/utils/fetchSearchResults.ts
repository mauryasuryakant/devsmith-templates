import _ from "lodash";
import type { SearchResult } from "@/types";

const fetchSearchResults = (q: string, start: number): Promise<SearchResult[]> => {
  const apiKey = process.env.GOOGLE_API_KEY ?? "";
  const GOOGLE_API_KEY = _.sample(apiKey.split(";")) ?? "";

  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const responseItems = responseJson.items;
        if (!responseItems) {
          resolve([]);
          return;
        }
        const items: SearchResult[] = responseItems.map((item: Record<string, unknown>, i: number) => ({
          title: item.title,
          link: item.formattedUrl,
          displayLink: item.displayLink,
          snippet: item.snippet,
          thumbnail:
            i === 0
              ? ((item.pagemap as Record<string, unknown>)?.cse_thumbnail as Record<string, unknown>[])?.[0]?.src ?? null
              : null,
          favicon: `https://www.google.com/s2/favicons?domain=${item.link}&sz=256`,
        }));
        resolve(items);
      })
      .catch((error) => {
        console.error(error);
        reject([]);
      });
  });
};

export default fetchSearchResults;

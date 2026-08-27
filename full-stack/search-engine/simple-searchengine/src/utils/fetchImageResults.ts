import axios from "axios";
import _ from "lodash";
import type { ImageResult } from "@/types";

const fetchImageResults = (q: string, page: number): Promise<ImageResult[]> => {
  const apiKey = process.env.GOOGLE_API_KEY ?? "";
  const GOOGLE_API_KEY = _.sample(apiKey.split(";")) ?? "";
  const start = (page - 1) * 10 + 1;

  return new Promise((resolve) => {
    axios
      .get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}&searchType=image`
      )
      .then((res) => {
        const responseItems = res.data.items;
        if (!responseItems) {
          resolve([]);
          return;
        }
        const items: ImageResult[] = responseItems.map((item: Record<string, unknown>) => ({
          link: item.link,
          title: item.title,
          snippet: item.snippet,
          thumbnail: (item.image as Record<string, unknown>)?.thumbnailLink ?? item.link,
          htmlSnippet: item.htmlSnippet,
          htmlTitle: item.htmlTitle,
        }));
        resolve(items);
      })
      .catch((error) => {
        console.error(error);
        resolve([]);
      });
  });
};

export default fetchImageResults;

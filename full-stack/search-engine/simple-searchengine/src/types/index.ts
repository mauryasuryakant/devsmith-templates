export interface SearchResult {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  thumbnail: string | null;
  favicon: string;
}

export interface ImageResult {
  link: string;
  title: string;
  snippet: string;
  thumbnail: string;
  htmlSnippet: string;
  htmlTitle: string;
}

export interface VideoResult {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedBy: string;
  publishedAt: string;
  link: string;
}

export interface NewsResult {
  title: string;
  description: string;
  thumbnail: string | null;
  publishedBy: string;
  publishedAt: string;
  url: string;
}

export interface CardData {
  image: string | null;
  title: string;
  description: string | null;
  content: string;
  type: "wiki" | "ai";
}

export interface HistoryItem {
  email: string;
  query: string;
  path: string;
  localTimestamp: string;
}

export interface PageInfo {
  nextPageToken?: string;
  totalResults?: number;
  resultsPerPage?: number;
}

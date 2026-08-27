import type { SearchResult } from "@/types";
import Image from "next/image";

interface ResultSnippetProps {
  result: SearchResult;
}

export default function ResultSnippet({ result }: ResultSnippetProps) {
  const { title, link, displayLink, snippet, favicon, thumbnail } = result;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 p-4 rounded-xl hover:bg-muted transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {favicon && (
            <Image
              src={favicon}
              alt=""
              width={16}
              height={16}
              className="rounded-sm flex-shrink-0"
            />
          )}
          <p className="text-xs text-muted-foreground truncate">{displayLink}</p>
        </div>
        <h2 className="text-base font-medium text-primary group-hover:underline truncate">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{snippet}</p>
      </div>
      {thumbnail && (
        <div className="flex-shrink-0 hidden sm:block">
          <Image
            src={thumbnail}
            alt=""
            width={92}
            height={64}
            className="rounded-lg object-cover w-[92px] h-16"
          />
        </div>
      )}
    </a>
  );
}

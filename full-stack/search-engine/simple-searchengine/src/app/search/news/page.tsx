import { Suspense } from "react";
import { NewsResults } from "@/features/news-results";

export default function NewsPage() {
  return (
    <Suspense>
      <NewsResults />
    </Suspense>
  );
}

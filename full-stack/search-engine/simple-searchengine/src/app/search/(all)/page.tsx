import { Suspense } from "react";
import { SearchResults } from "@/features/search-results";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}

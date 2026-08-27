import { Suspense } from "react";
import { ImageResults } from "@/features/image-results";

export default function ImagesPage() {
  return (
    <Suspense>
      <ImageResults />
    </Suspense>
  );
}

import { Suspense } from "react";
import { VideoResults } from "@/features/video-results";

export default function VideosPage() {
  return (
    <Suspense>
      <VideoResults />
    </Suspense>
  );
}

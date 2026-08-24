import { Post } from "@/types";
import { PostCard } from "@/features/post-card";

interface PostGridProps {
  title?: string;
  posts?: Post[];
  excludeSlug?: string;
}

export default function PostGrid({ title = "Latest Articles", posts = [], excludeSlug }: PostGridProps) {
  let displayPosts = posts;
  
  if (excludeSlug) {
    displayPosts = displayPosts.filter((post) => post.slug !== excludeSlug);
  }

  if (displayPosts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 md:px-6 mb-20">
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

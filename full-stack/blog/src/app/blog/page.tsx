import { PostGrid } from "@/features/post-grid";
import { Newsletter } from "@/features/newsletter";
import { blogConfig, database } from "../../../devsmith.config";

export const metadata = {
  title: `Articles | ${blogConfig.name}`,
  description: "Browse all articles and insights.",
};

export default async function BlogIndexPage() {
  const posts = await database.getPosts();
  return (
    <>
      <div className="bg-muted/30 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">All Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete archive of thoughts, tutorials, and insights.
          </p>
        </div>
      </div>
      <PostGrid title="" posts={posts} />
      <Newsletter />
    </>
  );
}

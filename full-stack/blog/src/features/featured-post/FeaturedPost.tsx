import Link from "next/link";
import { blogConfig, database } from "../../../devsmith.config";
import { Badge } from "@/components/ui/badge";

export default async function FeaturedPost() {
  const post = await database.getPost(blogConfig.featuredPostSlug);

  if (!post) return null;

  return (
    <section className="container mx-auto px-4 md:px-6 mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Article</h2>
      </div>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-video md:aspect-[4/3] overflow-hidden rounded-2xl">
            {/* Using standard img to avoid next/image domain config requirements for template users */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {post.category && (
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {post.category.name}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">{post.readingTime}</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full ring-2 ring-background"
              />
              <div>
                <span className="font-medium">{post.author.name}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

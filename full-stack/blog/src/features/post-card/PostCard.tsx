import Link from "next/link";
import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg group border-muted/60">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video">
        <img
          src={post.coverImage}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <CardHeader className="p-4 md:p-6 pb-0">
        <div className="flex items-center space-x-2 mb-3">
          {post.category && (
            <Badge variant="secondary" className="bg-secondary/50 hover:bg-secondary/80">
              {post.category.name}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            {post.readingTime}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-1">
        <p className="text-muted-foreground line-clamp-3 mt-2">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0 border-t border-border/10 mt-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium leading-none mb-1">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

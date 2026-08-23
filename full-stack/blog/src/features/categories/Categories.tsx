import Link from "next/link";
import { blogConfig } from "../../../devsmith.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Categories() {
  return (
    <section className="container mx-auto px-4 md:px-6 mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Explore Topics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogConfig.categories.map((category) => {
          const postCount = blogConfig.posts.filter(
            (p) => p.category.slug === category.slug
          ).length;

          return (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                    {category.name}
                    <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {postCount} {postCount === 1 ? 'post' : 'posts'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

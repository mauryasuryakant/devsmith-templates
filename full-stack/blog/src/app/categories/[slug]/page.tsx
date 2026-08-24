import { notFound } from "next/navigation";
import { blogConfig, database } from "../../../../devsmith.config";
import { PostGrid } from "@/features/post-grid";
import { Newsletter } from "@/features/newsletter";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = blogConfig.categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | ${blogConfig.name}`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return blogConfig.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = blogConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const allPosts = await database.getPosts();
  const categoryPosts = allPosts.filter(
    (post) => post.category.slug === category.slug
  );

  return (
    <>
      <div className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>
      
      <div className="min-h-[40vh]">
        {categoryPosts.length > 0 ? (
          <PostGrid title="" posts={categoryPosts} />
        ) : (
          <div className="text-center text-muted-foreground pt-12">
            No posts found in this category.
          </div>
        )}
      </div>

      <Newsletter />
    </>
  );
}

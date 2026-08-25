import { notFound } from "next/navigation";
import { blogConfig, database } from "../../../../devsmith.config";
import { Badge } from "@/components/ui/badge";
import { Author } from "@/features/author";
import { PostGrid } from "@/features/post-grid";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await database.getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | ${blogConfig.name}`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await database.getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await database.getPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const allPosts = await database.getPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category?.slug === post.category?.slug && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="pb-20">
      <header className="container mx-auto px-4 md:px-6 pt-16 pb-12 text-center max-w-4xl space-y-6">
        <div className="flex items-center justify-center space-x-3">
          {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
          <span className="text-sm text-muted-foreground">{post.readingTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        
        <div className="flex items-center justify-center space-x-4 pt-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mb-16 max-w-5xl">
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-neutral dark:prose-invert lg:prose-lg mb-20">
        {/* We use a pre tag or react-markdown for a real implementation, 
            but for the template we'll just dangerously set inner HTML or use a simple render.
            To keep dependencies small, we'll just render it as white space preserved text for now,
            or realistically a Markdown component should be used.
            We will do a simple split and map for paragraphs here to keep it frontend-only without heavy libs. */}
        
        {post.content.split('\n\n').map((rawParagraph, index) => {
          const paragraph = rawParagraph.trim();
          if (!paragraph) return null;
          
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-10 mb-4">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
          }
          return <p key={index} className="leading-relaxed mb-6">{paragraph}</p>;
        })}

        <div className="mt-12 flex items-center space-x-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>

      <Author />

      {relatedPosts.length > 0 && (
        <div className="mt-20">
          <PostGrid title="Related Articles" posts={relatedPosts} />
        </div>
      )}
    </article>
  );
}

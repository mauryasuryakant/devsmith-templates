import { Hero } from "@/features/hero";
import { FeaturedPost } from "@/features/featured-post";
import { PostGrid } from "@/features/post-grid";
import { Categories } from "@/features/categories";
import { Newsletter } from "@/features/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPost />
      <PostGrid title="Latest Articles" />
      <Categories />
      <Newsletter />
    </>
  );
}

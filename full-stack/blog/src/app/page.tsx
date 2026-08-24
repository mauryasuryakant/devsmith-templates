import { Hero } from "@/features/hero";
import { FeaturedPost } from "@/features/featured-post";
import { PostGrid } from "@/features/post-grid";
import { Categories } from "@/features/categories";
import { Newsletter } from "@/features/newsletter";
import { database } from "../../devsmith.config";

export default async function Home() {
  const posts = await database.getPosts();
  return (
    <>
      <Hero />
      <FeaturedPost />
      <PostGrid title="Latest Articles" posts={posts} />
      <Categories />
      <Newsletter />
    </>
  );
}

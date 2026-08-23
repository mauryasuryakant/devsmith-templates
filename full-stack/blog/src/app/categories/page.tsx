import { Categories } from "@/features/categories";
import { blogConfig } from "../../../devsmith.config";

export const metadata = {
  title: `Categories | ${blogConfig.name}`,
  description: "Browse all topics and categories.",
};

export default function CategoriesIndexPage() {
  return (
    <>
      <div className="bg-muted/30 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Topics</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles by category to find exactly what you&apos;re looking for.
          </p>
        </div>
      </div>
      <Categories />
    </>
  );
}

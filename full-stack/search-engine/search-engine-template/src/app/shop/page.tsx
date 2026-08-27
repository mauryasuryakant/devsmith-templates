import { Navbar } from "@/features/navbar";
import { ProductGrid } from "@/features/product-grid";
import { Footer } from "@/features/footer";
import { PromotionalBanner } from "@/features/promotional-banner";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : null;
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : null;

  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <div className="bg-slate-50 py-12 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              {category ? `Shop ${category.charAt(0).toUpperCase() + category.slice(1)}` : "All Products"}
            </h1>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Browse our complete collection of premium products designed for everyday life.
            </p>
          </div>
        </div>
        <ProductGrid initialCategory={category} initialSort={sort} />
      </main>
      <Footer />
    </>
  );
}

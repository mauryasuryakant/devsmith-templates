import { storeConfig } from "../../../../devsmith.config";
import { notFound } from "next/navigation";
import { Navbar } from "@/features/navbar";
import { Footer } from "@/features/footer";
import { PromotionalBanner } from "@/features/promotional-banner";
import { ProductDetail } from "@/features/product-detail";
import { ProductGrid } from "@/features/product-grid";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const product = storeConfig.products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <ProductDetail product={product} />
        
        <section className="py-16 md:py-24 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-10 text-center">
              You Might Also Like
            </h2>
            <div className="max-w-7xl mx-auto">
              {/* Reuse product grid, forcing to only show the same category but limiting in UI if possible, or just using grid component */}
              <ProductGrid initialCategory={product.category.toLowerCase()} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

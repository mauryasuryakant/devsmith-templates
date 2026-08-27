import { storeConfig } from "../../../devsmith.config";
import { ProductCard } from "@/features/product-card";
import Link from "next/link";

export default function FeaturedProducts() {
  const featuredProducts = storeConfig.products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Featured Collection
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl">
            Our most popular designs, carefully curated for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 rounded-md shadow-sm text-base font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

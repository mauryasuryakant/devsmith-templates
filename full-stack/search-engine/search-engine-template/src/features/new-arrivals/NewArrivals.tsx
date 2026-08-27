import { storeConfig } from "../../../devsmith.config";
import Link from "next/link";
import { ProductCard } from "@/features/product-card";

export default function NewArrivals() {
  const newArrivals = storeConfig.products.filter((p) => p.newArrival).slice(0, 4);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              New Arrivals
            </h2>
            <p className="text-slate-600 mt-2">Just landed. The latest additions to our collection.</p>
          </div>
          <Link href="/shop?sort=newest" className="hidden sm:block text-sm font-semibold text-primary hover:underline">
            View All New Arrivals &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop?sort=newest" className="text-sm font-semibold text-primary hover:underline">
            View All New Arrivals &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

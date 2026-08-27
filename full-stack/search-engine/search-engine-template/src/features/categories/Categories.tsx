import { storeConfig } from "../../../devsmith.config";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Shop by Category
            </h2>
            <p className="text-slate-600 mt-2">Explore our wide range of collections</p>
          </div>
          <Link href="/shop" className="hidden sm:block text-sm font-semibold text-primary hover:underline">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {storeConfig.categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-slate-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold tracking-wider text-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
            View All Categories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { storeConfig } from "../../../devsmith.config";
import { ProductCard } from "@/features/product-card";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductGridProps {
  initialCategory?: string | null;
  initialSort?: string | null;
}

export default function ProductGrid({ initialCategory, initialSort }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || "all");
  const [sortOption, setSortOption] = useState<string>(initialSort || "featured");

  const categories = ["all", ...storeConfig.categories.map((c) => c.slug)];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...storeConfig.products];

    // Filter by category
    if (activeCategory !== "all") {
      const categoryName = storeConfig.categories.find(c => c.slug === activeCategory)?.name;
      if (categoryName) {
        result = result.filter(p => p.category === categoryName);
      }
    }

    // Sort products
    switch (sortOption) {
      case "newest":
        result = result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case "price-low-high":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, sortOption]);

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "All Products" : storeConfig.categories.find(c => c.slug === cat)?.name || cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
            <Select value={sortOption} onValueChange={(val) => val && setSortOption(val)}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">New Arrivals</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">Try changing your category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

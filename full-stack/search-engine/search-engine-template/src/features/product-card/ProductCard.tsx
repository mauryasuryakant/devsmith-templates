"use client";

import Link from "next/link";
import { Product, useCart } from "@/components/cart-context";
import { storeConfig } from "../../../devsmith.config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity: 1,
        selectedColor: product.colors?.[0],
        selectedSize: product.sizes?.[0],
      },
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
        {product.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-white text-slate-900 hover:bg-white shadow-sm border-0">
            {product.badge}
          </Badge>
        )}
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.images && product.images.length > 1 && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button 
            className="w-full shadow-lg" 
            variant="default"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="text-xs text-slate-500 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-medium text-slate-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-slate-900">
            {storeConfig.storeInfo.currency}{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {storeConfig.storeInfo.currency}{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

"use client";

import { Product, useCart } from "@/components/cart-context";
import { storeConfig } from "../../../devsmith.config";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Minus, Plus, ShoppingCart, Check } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity,
        selectedColor,
        selectedSize,
      },
    });
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0">
              <button
                className={`relative aspect-square w-20 md:w-full rounded-md overflow-hidden border-2 ${
                  mainImage === product.image ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setMainImage(product.image)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              </button>
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  className={`relative aspect-square w-20 md:w-full rounded-md overflow-hidden border-2 ${
                    mainImage === img ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} view ${i + 2}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[4/5] md:aspect-auto md:min-h-[600px] rounded-2xl overflow-hidden bg-slate-100">
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10 bg-white text-slate-900 hover:bg-white shadow-sm border-0 px-3 py-1">
                  {product.badge}
                </Badge>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mainImage} alt={product.name} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-slate-700">{product.rating}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4">
                  {product.reviewCount} Reviews
                </span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-slate-900">
                  {storeConfig.storeInfo.currency}{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through mb-1">
                    {storeConfig.storeInfo.currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6 prose prose-slate max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="flex flex-col gap-6 mb-8 mt-auto pt-6">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-900">Color</span>
                    <span className="text-sm text-slate-500">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-900">Size</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <span className="font-medium text-slate-900 block mb-3">Quantity</span>
                <div className="flex items-center w-32 border rounded-md h-12">
                  <button
                    className="flex-1 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button
                    className="flex-1 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button
                size="lg"
                className="flex-1 h-14 text-base font-semibold shadow-xl shadow-primary/20"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Free shipping on orders over {storeConfig.storeInfo.currency}100</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

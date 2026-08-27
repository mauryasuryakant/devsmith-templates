"use client";

import { useCart } from "@/components/cart-context";
import { storeConfig } from "../../../devsmith.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";

export default function CartPageContent() {
  const { state, dispatch, subtotal } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Looks like you haven&apos;t added anything to your cart yet. Let&apos;s get you started.
        </p>
        <Button size="lg" render={<Link href="/shop" />}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-10">
        Shopping Cart
      </h1>
      
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="hidden sm:grid sm:grid-cols-12 text-sm font-medium text-slate-500 mb-4 px-4">
            <div className="sm:col-span-6">Product</div>
            <div className="sm:col-span-3 text-center">Quantity</div>
            <div className="sm:col-span-3 text-right">Total</div>
          </div>
          <Separator className="mb-6" />
          
          <div className="flex flex-col gap-6">
            {state.items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex flex-col sm:grid sm:grid-cols-12 gap-6 sm:items-center">
                <div className="sm:col-span-6 flex gap-4">
                  <div className="h-28 w-28 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link href={`/products/${item.product.slug}`} className="font-semibold text-slate-900 hover:text-primary mb-1">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-slate-500 mb-2">
                      {item.selectedColor} {item.selectedSize ? `/ ${item.selectedSize}` : ""}
                    </p>
                    <button
                      type="button"
                      className="text-sm font-medium text-slate-400 hover:text-red-500 flex items-center gap-1 w-fit transition-colors"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_ITEM",
                          payload: {
                            productId: item.product.id,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                          }
                        });
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-3 flex justify-start sm:justify-center">
                  <div className="flex items-center border rounded-md h-10 w-28">
                    <button 
                      className="flex-1 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors h-full"
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: {
                              productId: item.product.id,
                              selectedColor: item.selectedColor,
                              selectedSize: item.selectedSize,
                              quantity: item.quantity - 1,
                            }
                          });
                        }
                      }}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="flex-1 text-center font-medium">{item.quantity}</span>
                    <button 
                      className="flex-1 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors h-full"
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            productId: item.product.id,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                            quantity: item.quantity + 1,
                          }
                        });
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-3 text-right">
                  <p className="text-lg font-bold text-slate-900">
                    {storeConfig.storeInfo.currency}{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-slate-500 mt-1">
                      {storeConfig.storeInfo.currency}{item.product.price.toFixed(2)} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-8" />
          
          <Link href="/shop" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{storeConfig.storeInfo.currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-slate-900">
                {storeConfig.storeInfo.currency}{subtotal.toFixed(2)}
              </span>
            </div>
            
            <Button size="lg" className="w-full h-14 text-base font-bold shadow-lg shadow-primary/20">
              Proceed to Checkout
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure, encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

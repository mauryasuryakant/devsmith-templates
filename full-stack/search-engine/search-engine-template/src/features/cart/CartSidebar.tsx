"use client";

import { useCart } from "@/components/cart-context";
import { storeConfig } from "../../../devsmith.config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { state, dispatch, subtotal } = useCart();
  const router = useRouter();

  const handleClose = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({state.items.length})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="bg-slate-100 p-4 rounded-full">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
                <p className="text-sm text-slate-500 mt-1">Looks like you haven&apos;t added anything yet.</p>
              </div>
              <Button className="mt-4" render={<Link href="/shop" onClick={handleClose} />}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {state.items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-slate-900">
                        <h3 className="line-clamp-1">{item.product.name}</h3>
                        <p className="ml-4">{storeConfig.storeInfo.currency}{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.selectedColor} {item.selectedSize ? `/ ${item.selectedSize}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
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
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
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
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <button
                        type="button"
                        className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
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
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-slate-200 py-6 space-y-4">
            <div className="flex justify-between text-base font-medium text-slate-900">
              <p>Subtotal</p>
              <p>{storeConfig.storeInfo.currency}{subtotal.toFixed(2)}</p>
            </div>
            <p className="text-sm text-slate-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" render={<Link href="/cart" onClick={handleClose} />}>
                View Cart
              </Button>
              <Button className="flex-1" onClick={() => {
                handleClose();
                router.push("/cart");
              }}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

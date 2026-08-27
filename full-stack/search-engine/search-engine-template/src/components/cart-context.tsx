"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; selectedColor?: string; selectedSize?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; selectedColor?: string; selectedSize?: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems, isOpen: true };
      }

      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.product.id === action.payload.productId &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize)
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (
            item.product.id === action.payload.productId &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
          ) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from local storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aura-cart");
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("aura-cart", JSON.stringify(state.items));
    } catch (error) {
      console.error("Failed to save cart to local storage", error);
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

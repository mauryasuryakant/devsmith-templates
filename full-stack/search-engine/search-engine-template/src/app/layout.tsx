import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { storeConfig } from "../../devsmith.config";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: storeConfig.storeInfo.name,
  description: storeConfig.hero.subheadline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-950`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

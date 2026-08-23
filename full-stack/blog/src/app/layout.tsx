import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/features/navbar";
import { Footer } from "@/features/footer";
import { blogConfig } from "../../devsmith.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: blogConfig.name,
  description: blogConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

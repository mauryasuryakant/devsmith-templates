import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import { Footer } from "@/features/footer";
import { searchEngineConfig } from "@/../devsmith.config";

export const metadata: Metadata = {
  title: searchEngineConfig.metadata.title,
  description: searchEngineConfig.metadata.description,
  keywords: searchEngineConfig.metadata.keywords,
  authors: searchEngineConfig.metadata.authors,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: searchEngineConfig.app.openGraphImage,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          <link rel="icon" href={searchEngineConfig.app.favicon} />
        </head>
        <body>
          <AuthContext>
            <main>{children}</main>
            <Footer />
          </AuthContext>
        </body>
      </html>
    </ThemeProvider>
  );
}

import type { Metadata } from "next";
import { portfolioConfig } from "../../devsmith.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolioConfig.personalInfo.name} | ${portfolioConfig.personalInfo.title}`,
  description: portfolioConfig.personalInfo.about,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

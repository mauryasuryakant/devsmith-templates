import { Navbar } from "@/features/navbar";
import { Hero } from "@/features/hero";
import { Categories } from "@/features/categories";
import { FeaturedProducts } from "@/features/featured-products";
import { PromotionalBanner } from "@/features/promotional-banner";
import { NewArrivals } from "@/features/new-arrivals";
import { Testimonials } from "@/features/testimonials";
import { Newsletter } from "@/features/newsletter";
import { Footer } from "@/features/footer";

export default function HomePage() {
  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <NewArrivals />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

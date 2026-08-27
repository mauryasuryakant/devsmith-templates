import { Navbar } from "@/features/navbar";
import { Footer } from "@/features/footer";
import { PromotionalBanner } from "@/features/promotional-banner";
import { CartPageContent } from "@/features/cart";

export default function CartPage() {
  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <div className="container mx-auto px-4">
          <CartPageContent />
        </div>
      </main>
      <Footer />
    </>
  );
}

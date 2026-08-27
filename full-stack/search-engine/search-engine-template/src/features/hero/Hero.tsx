import { storeConfig } from "../../../devsmith.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full bg-slate-50">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {storeConfig.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg">
            {storeConfig.hero.subheadline}
          </p>
          <div className="pt-4">
            <Button size="lg" className="text-base font-semibold px-8 py-6" render={<Link href={storeConfig.hero.ctaLink} />}>
              {storeConfig.hero.ctaText}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={storeConfig.hero.image}
            alt="Hero image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

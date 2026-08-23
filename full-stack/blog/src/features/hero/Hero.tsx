import { blogConfig } from "../../../devsmith.config";

export default function Hero() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
          {blogConfig.tagline}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {blogConfig.description}
        </p>
      </div>
    </section>
  );
}

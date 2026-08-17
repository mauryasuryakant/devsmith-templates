import { portfolioConfig } from "@/data/config";

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-8">About Me</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {portfolioConfig.personalInfo.about}
        </p>
      </div>
    </section>
  );
}

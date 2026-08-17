import { portfolioConfig } from "@/data/config";

export function Hero() {
  return (
    <section className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Hi, I'm {portfolioConfig.personalInfo.name}
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-[600px]">
        {portfolioConfig.personalInfo.title}
      </p>
      <div className="flex gap-4">
        <a 
          href="#contact" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
        >
          Get in touch
        </a>
        <a 
          href="#projects" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}

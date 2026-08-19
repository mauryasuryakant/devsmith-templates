import { portfolioConfig } from "../../../devsmith.config";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
        <p className="text-lg text-muted-foreground mb-8">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${portfolioConfig.personalInfo.email}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
          >
            Email Me
          </a>
          {portfolioConfig.personalInfo.github && (
            <a
              href={portfolioConfig.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2"
            >
              GitHub
            </a>
          )}
          {portfolioConfig.personalInfo.linkedin && (
            <a
              href={portfolioConfig.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

import { portfolioConfig } from "../../../devsmith.config";

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioConfig.projects.map((project, idx) => (
            <div key={idx} className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
              <div className="p-6 flex-1">
                <h3 className="font-semibold leading-none tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

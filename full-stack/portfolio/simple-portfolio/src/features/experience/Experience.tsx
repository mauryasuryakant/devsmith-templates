import { portfolioConfig } from "@/data/config";

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {portfolioConfig.experience.map((exp, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="sm:w-32 flex-shrink-0">
                <span className="text-sm font-medium text-muted-foreground">{exp.period}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

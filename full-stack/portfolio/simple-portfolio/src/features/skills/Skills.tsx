import { portfolioConfig } from "../../../devsmith.config";

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {portfolioConfig.skills.map((skill) => (
            <span 
              key={skill}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

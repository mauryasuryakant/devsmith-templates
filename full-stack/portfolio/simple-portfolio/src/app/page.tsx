import { Navbar } from "@/features/navbar";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Skills } from "@/features/skills";
import { Projects } from "@/features/projects";
import { Experience } from "@/features/experience";
import { Contact } from "@/features/contact";
import { Footer } from "@/features/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import { portfolioConfig } from "@/data/config";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          {portfolioConfig.personalInfo.name}
        </Link>
        <div className="space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
          <Link href="#skills" className="transition-colors hover:text-foreground/80 text-foreground/60">Skills</Link>
          <Link href="#projects" className="transition-colors hover:text-foreground/80 text-foreground/60">Projects</Link>
          <Link href="#experience" className="transition-colors hover:text-foreground/80 text-foreground/60">Experience</Link>
          <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

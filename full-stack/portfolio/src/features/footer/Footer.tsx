import { portfolioConfig } from "../../../devsmith.config";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {portfolioConfig.personalInfo.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

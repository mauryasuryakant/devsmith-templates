import Link from "next/link";
import { blogConfig } from "../../../devsmith.config";
import { Code2, MessageCircle, Briefcase, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Twitter: MessageCircle,
  Github: Code2,
  Linkedin: Briefcase,
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="font-bold text-xl inline-block">
              {blogConfig.name}
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {blogConfig.description}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {blogConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Socials</h4>
            <div className="flex space-x-4 text-muted-foreground">
              {blogConfig.socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <span className="sr-only">{social.platform}</span>
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{blogConfig.footer.text}</p>
        </div>
      </div>
    </footer>
  );
}

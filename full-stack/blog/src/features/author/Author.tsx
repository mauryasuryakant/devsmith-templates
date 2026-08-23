import { blogConfig } from "../../../devsmith.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code2, MessageCircle } from "lucide-react";

export default function Author() {
  const author = blogConfig.author;

  return (
    <section className="bg-muted/30 border-y py-16 mb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
          <Avatar className="w-32 h-32 border-4 border-background shadow-sm">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{author.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {author.bio}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              {author.github && (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Code2 className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

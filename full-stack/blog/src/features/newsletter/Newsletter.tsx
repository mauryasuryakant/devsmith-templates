import { blogConfig } from "../../../devsmith.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {blogConfig.newsletter.heading}
          </h2>
          <p className="text-muted-foreground md:text-lg">
            {blogConfig.newsletter.description}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
            <Input
              type="email"
              placeholder={blogConfig.newsletter.placeholder}
              className="flex-1"
              required
            />
            <Button type="submit" className="w-full sm:w-auto">
              {blogConfig.newsletter.buttonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

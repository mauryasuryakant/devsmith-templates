"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { searchEngineConfig } from "@/../devsmith.config";
import { ThemeBtn } from "@/features/theme";

export default function Footer() {
  const [starCount, setStarCount] = useState<string | number>("--");

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${searchEngineConfig.app.githubRepo}`)
      .then((res) => setStarCount(res.data.stargazers_count || "--"))
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-border bg-card py-6 mt-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href={searchEngineConfig.app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium"
          aria-label="Star on GitHub"
        >
          <FaStar className="text-yellow-400" />
          <span>Star Us</span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {starCount}
          </span>
        </a>

        <p className="text-sm text-muted-foreground text-center">
          <span className="font-heading font-bold text-foreground">
            {searchEngineConfig.app.name}
          </span>{" "}
          is a Free and Open Source project.{" "}
          <a
            href={searchEngineConfig.app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View on GitHub
          </a>
        </p>

        <ThemeBtn />
      </div>
    </footer>
  );
}

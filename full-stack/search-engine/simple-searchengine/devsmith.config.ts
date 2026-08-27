export const searchEngineConfig = {
  app: {
    name: "SearchEx",
    tagline: "Effortlessly explore the Web",
    description: "SearchEx is a free and open-source search engine powered by Google Custom Search, YouTube, and NewsAPI.",
    url: "https://github.com/devxprite/searchex",
    githubRepo: "devxprite/searchex",
    logo: "/logo.png",
    favicon: "/favicon.png",
    openGraphImage: "/images/screenshot.png",
  },

  metadata: {
    title: "SearchEx",
    description: "Effortlessly explore the web",
    keywords: ["Next.js", "React", "TypeScript", "Search Engine"],
    authors: [{ name: "DevXprite", url: "https://github.com/devxprite" }],
    colorScheme: "dark" as const,
  },

  searchCategories: [
    {
      title: "All",
      href: "/search",
      icon: "search",
      pathPattern: /^\/search$/,
    },
    {
      title: "Videos",
      href: "/search/videos",
      icon: "video",
      pathPattern: /^\/search\/videos/,
    },
    {
      title: "Images",
      href: "/search/images",
      icon: "image",
      pathPattern: /^\/search\/images/,
    },
    {
      title: "News",
      href: "/search/news",
      icon: "newspaper",
      pathPattern: /^\/search\/news/,
    },
    {
      title: "Maps",
      href: "https://www.google.com/maps/search/",
      icon: "map",
      pathPattern: /^\/search\/maps/,
      external: true,
    },
  ],

  pagination: {
    maxSearchPages: 4,
    maxImagePages: 5,
    defaultResultsPerPage: 10,
  },

  theme: {
    default: "dark" as "dark" | "light",
    storageKey: "theme",
  },

  fonts: {
    heading: "Raleway",
    body: "Inter",
  },
};

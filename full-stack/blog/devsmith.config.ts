// Configure your database connection in the root .env file:
// DATABASE_URI="your-database-connection-uri"

import { mongoDatabaseService } from "./src/database/mongodb";
// import { supabaseDatabaseService } from "./src/database/supabase";

export const database = mongoDatabaseService;

export const blogConfig = {
  name: "DevSmith Blog",
  tagline: "Insights for Modern Developers",
  description: "A clean, performant, and minimal blog template for DevSmith.",
  
  author: {
    name: "Maurya Suryakant",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    bio: "Software Engineer & Writer. Passionate about web development, design, and sharing knowledge.",
    twitter: "https://twitter.com/mauryasuryakant",
    github: "https://github.com/mauryasuryakant",
  },
  
  navigation: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/blog" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
  ],
  
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  ],
  
  categories: [
    {
      name: "Engineering",
      slug: "engineering",
      description: "Deep dives into software engineering, architecture, and tools.",
    },
    {
      name: "Design",
      slug: "design",
      description: "Thoughts on user experience, interfaces, and product design.",
    },
    {
      name: "Career",
      slug: "career",
      description: "Advice on growing as a developer and navigating the tech industry.",
    },
  ],
  

  featuredPostSlug: "future-of-web-dev-nextjs",
  
  newsletter: {
    heading: "Subscribe to the newsletter",
    description: "Get the latest articles and insights delivered straight to your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
  },
  
  footer: {
    text: "© 2026 DevSmith. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

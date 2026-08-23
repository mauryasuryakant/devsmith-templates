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
  
  posts: [
    {
      title: "The Future of Web Development with Next.js",
      slug: "future-of-web-dev-nextjs",
      excerpt: "Exploring the latest features of Next.js and how they are shaping the modern web architecture.",
      content: `
# Introduction
Next.js has revolutionized how we build React applications. From static site generation to server components, it provides a comprehensive framework for building high-performance web applications.

## Server Components
React Server Components allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.

## Tailwind CSS
The integration with Tailwind CSS makes styling a breeze. By composing utility classes, we can build responsive and accessible designs without leaving our HTML.

## Conclusion
The ecosystem is evolving rapidly, and staying up to date with these tools is crucial for any modern web developer.
      `,
      author: {
        name: "Maurya Suryakant",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        bio: "Software Engineer & Writer. Passionate about web development, design, and sharing knowledge.",
        twitter: "https://twitter.com/mauryasuryakant",
        github: "https://github.com/mauryasuryakant",
      },
      date: "2026-08-15",
      readingTime: "5 min read",
      category: {
        name: "Engineering",
        slug: "engineering",
        description: "Deep dives into software engineering, architecture, and tools.",
      },
      tags: ["Next.js", "React", "Web"],
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Designing Accessible User Interfaces",
      slug: "designing-accessible-ui",
      excerpt: "Why accessibility matters and practical tips for designing inclusive web experiences for all users.",
      content: `
# Accessibility First
Designing for accessibility means creating products that are usable by everyone, regardless of their abilities.

## Color Contrast
Ensure there is sufficient contrast between foreground text and background colors. This is crucial for users with visual impairments.

## Semantic HTML
Using correct HTML tags like \`<nav>\`, \`<main>\`, and \`<article>\` helps screen readers interpret the structure of your page.
      `,
      author: {
        name: "Maurya Suryakant",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        bio: "Software Engineer & Writer. Passionate about web development, design, and sharing knowledge.",
        twitter: "https://twitter.com/mauryasuryakant",
        github: "https://github.com/mauryasuryakant",
      },
      date: "2026-08-10",
      readingTime: "4 min read",
      category: {
        name: "Design",
        slug: "design",
        description: "Thoughts on user experience, interfaces, and product design.",
      },
      tags: ["Design", "Accessibility", "UI"],
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Navigating a Career in Tech",
      slug: "navigating-tech-career",
      excerpt: "Lessons learned from a decade in the software industry, from junior developer to senior engineer.",
      content: `
# The Journey
Growing as an engineer involves more than just writing code. It's about communication, understanding business needs, and continuous learning.

## Mentorship
Finding a good mentor can accelerate your growth. Don't be afraid to ask questions and seek feedback.

## Staying Curious
The tech landscape changes constantly. Stay curious, explore new technologies, but also master the fundamentals.
      `,
      author: {
        name: "Maurya Suryakant",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        bio: "Software Engineer & Writer. Passionate about web development, design, and sharing knowledge.",
        twitter: "https://twitter.com/mauryasuryakant",
        github: "https://github.com/mauryasuryakant",
      },
      date: "2026-08-05",
      readingTime: "6 min read",
      category: {
        name: "Career",
        slug: "career",
        description: "Advice on growing as a developer and navigating the tech industry.",
      },
      tags: ["Career", "Advice", "Growth"],
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    }
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

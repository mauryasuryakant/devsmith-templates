export type Author = {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  date: string;
  readingTime: string;
  category: Category;
  tags: string[];
  coverImage: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

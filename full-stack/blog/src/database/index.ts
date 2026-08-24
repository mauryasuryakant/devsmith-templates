import { Post } from "../types";

export interface DatabaseService {
  /**
   * Create a new blog post
   */
  createPost(post: Omit<Post, "slug">): Promise<Post>;

  /**
   * Get all blog posts
   */
  getPosts(): Promise<Post[]>;

  /**
   * Get a single blog post by slug
   */
  getPost(slug: string): Promise<Post | null>;

  /**
   * Update an existing blog post
   */
  updatePost(slug: string, post: Partial<Omit<Post, "slug">>): Promise<Post | null>;

  /**
   * Delete a blog post
   */
  deletePost(slug: string): Promise<boolean>;
}

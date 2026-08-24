import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { DatabaseService } from "../index";
import { Post } from "../../types";

const uri = process.env.DATABASE_URI || "";

let supabase: SupabaseClient | null = null;

function getClient() {
  if (!supabase) {
    if (!uri) {
      throw new Error("DATABASE_URI environment variable is not set");
    }
    
    // For Supabase, the user should provide the URI as "URL,KEY"
    const parts = uri.split(",");
    if (parts.length !== 2) {
      throw new Error(
        "For Supabase, DATABASE_URI must be in the format: 'SUPABASE_URL,SUPABASE_ANON_KEY'"
      );
    }

    const [supabaseUrl, supabaseKey] = parts;
    supabase = createClient(supabaseUrl.trim(), supabaseKey.trim());
  }
  return supabase;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const supabaseDatabaseService: DatabaseService = {
  async createPost(postData: Omit<Post, "slug">): Promise<Post> {
    const client = getClient();
    const slug = generateSlug(postData.title);
    
    const newPost = {
      ...postData,
      slug,
      // Stringify JSON fields if needed depending on Supabase schema, 
      // but assuming Supabase table 'posts' has jsonb columns for author and category
      // or we just rely on standard insert behavior if they are JSON columns.
    };
    
    const { data, error } = await client
      .from("posts")
      .insert(newPost)
      .select()
      .single();
      
    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
    
    return data as Post;
  },

  async getPosts(): Promise<Post[]> {
    const client = getClient();
    const { data, error } = await client
      .from("posts")
      .select("*")
      .order("date", { ascending: false });
      
    if (error) {
      console.error(`Supabase error getting posts: ${error.message}`);
      return [];
    }
    
    return data as Post[];
  },

  async getPost(slug: string): Promise<Post | null> {
    const client = getClient();
    const { data, error } = await client
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // Post not found
        return null;
      }
      console.error(`Supabase error getting post ${slug}: ${error.message}`);
      return null;
    }
    
    return data as Post;
  },

  async updatePost(slug: string, postData: Partial<Omit<Post, "slug">>): Promise<Post | null> {
    const client = getClient();
    const { data, error } = await client
      .from("posts")
      .update(postData)
      .eq("slug", slug)
      .select()
      .single();
      
    if (error) {
      console.error(`Supabase error updating post ${slug}: ${error.message}`);
      return null;
    }
    
    return data as Post;
  },

  async deletePost(slug: string): Promise<boolean> {
    const client = getClient();
    const { error } = await client
      .from("posts")
      .delete()
      .eq("slug", slug);
      
    if (error) {
      console.error(`Supabase error deleting post ${slug}: ${error.message}`);
      return false;
    }
    
    return true;
  },
};

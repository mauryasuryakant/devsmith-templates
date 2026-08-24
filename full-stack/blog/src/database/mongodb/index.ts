import { MongoClient, ServerApiVersion } from "mongodb";
import { DatabaseService } from "../index";
import { Post } from "../../types";

const uri = process.env.DATABASE_URI || "";

// Initialize MongoDB Client
let client: MongoClient | null = null;

async function getClient() {
  if (!client) {
    if (!uri) {
      throw new Error("DATABASE_URI environment variable is not set");
    }
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
  }
  return client;
}

async function getCollection() {
  const dbClient = await getClient();
  const db = dbClient.db("blog");
  return db.collection<Post>("posts");
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const mongoDatabaseService: DatabaseService = {
  async createPost(postData: Omit<Post, "slug">): Promise<Post> {
    const collection = await getCollection();
    const slug = generateSlug(postData.title);
    
    const newPost: Post = {
      ...postData,
      slug,
    };
    
    await collection.insertOne(newPost as any);
    return newPost;
  },

  async getPosts(): Promise<Post[]> {
    const collection = await getCollection();
    const posts = await collection.find({}).sort({ date: -1 }).toArray();
    
    return posts.map(({ _id, ...post }) => post as Post);
  },

  async getPost(slug: string): Promise<Post | null> {
    const collection = await getCollection();
    const post = await collection.findOne({ slug });
    
    if (!post) return null;
    
    const { _id, ...rest } = post;
    return rest as Post;
  },

  async updatePost(slug: string, postData: Partial<Omit<Post, "slug">>): Promise<Post | null> {
    const collection = await getCollection();
    
    const updateDoc = {
      $set: postData,
    };
    
    const result = await collection.findOneAndUpdate(
      { slug },
      updateDoc,
      { returnDocument: "after" }
    );
    
    if (!result) return null;
    
    const { _id, ...rest } = result;
    return rest as Post;
  },

  async deletePost(slug: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne({ slug });
    return result.deletedCount === 1;
  },
};

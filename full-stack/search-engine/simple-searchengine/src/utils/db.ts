import { MongoClient } from "mongodb";

// NOTE: Validation is deferred to runtime (not module load) so missing env vars
// don't crash unrelated routes like /api/auth/session when DB isn't configured yet.
function getClientPromise(): Promise<MongoClient> {
  if (!process.env.MONGODB_HOST) {
    return Promise.reject(new Error('Missing environment variable: "MONGODB_HOST"'));
  }

  const db_user = process.env.MONGODB_USERNAME;
  const db_pass = process.env.MONGODB_PASSWORD;
  const db_name = process.env.MONGODB_DB;
  const db_host = process.env.MONGODB_HOST;
  const uri = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_name}?retryWrites=true&w=majority`;

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri);
  return client.connect();
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const clientPromise = getClientPromise();

export default clientPromise;

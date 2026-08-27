import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/utils/db";
import type { HistoryItem } from "@/types";

export default async function SearchHistoryPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const name = session?.user?.name || session?.user?.email?.split("@")[0];

  const client = await clientPromise;
  const db = client.db();

  const searchHistory = (await db
    .collection("history")
    .find({ email })
    .limit(200)
    .toArray()) as unknown as HistoryItem[];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold mb-6">
        Search History of {name}
      </h1>

      {searchHistory.length > 0 ? (
        <div className="space-y-2">
          {searchHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card text-sm"
            >
              <span className="text-xs text-muted-foreground w-32 flex-shrink-0">
                {item.localTimestamp}
              </span>
              <span className="flex-1 font-medium truncate">{item.query}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {item.path}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No search history found.</p>
      )}
    </div>
  );
}

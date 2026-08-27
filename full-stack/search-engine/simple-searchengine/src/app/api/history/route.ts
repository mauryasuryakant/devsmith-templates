import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/utils/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { email } = session.user ?? {};
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const localTimestamp = searchParams.get("t");
  const path = searchParams.get("p");

  if (!query || !localTimestamp || !email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  console.log(
    `Calling History API with email: ${email}, query: ${query}, path: ${path}, localTimestamp: ${localTimestamp}`
  );

  const client = await clientPromise;
  const db = client.db();

  await db.collection("history").insertOne({ email, query, path, localTimestamp });

  return new NextResponse(null, { status: 204 });
}

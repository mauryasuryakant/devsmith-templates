"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="rounded-2xl border border-border bg-card p-8 w-full max-w-md animate-pulse space-y-4">
          <div className="w-32 h-32 rounded-full bg-muted mx-auto" />
          <div className="h-5 bg-muted rounded w-1/2 mx-auto" />
          <div className="h-3 bg-muted rounded w-2/3 mx-auto" />
          <div className="h-10 bg-muted rounded-full w-full" />
          <div className="h-10 bg-muted rounded-full w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  const userName = session.user?.name || session.user?.email?.split("@")[0];
  const userEmail = session.user?.email;
  const userImage = session.user?.image;

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="rounded-2xl border border-border bg-card p-8 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          {userImage ? (
            <Image
              src={userImage}
              alt="User"
              width={100}
              height={100}
              className="rounded-full ring-2 ring-primary"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold">
              {userName?.[0]?.toUpperCase()}
            </div>
          )}
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold">{userName}</h1>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/account/search-history")}
            className="w-full py-2.5 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            View Search History
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

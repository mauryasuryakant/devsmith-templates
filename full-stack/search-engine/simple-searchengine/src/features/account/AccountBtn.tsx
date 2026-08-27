"use client";

import { useSession, signIn } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AccountBtn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm">
        <FaUser className="text-base" />
        <span>Loading...</span>
      </div>
    );
  }

  if (session?.user) {
    const userName = session.user.name || session.user.email?.split("@")[0];
    return (
      <div
        className={cn(
          "flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg",
          "bg-muted hover:bg-accent transition-colors text-sm"
        )}
        onClick={() => router.push("/account")}
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="user"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
        ) : (
          <FaUser className="text-base" />
        )}
        <span className="font-medium">{userName}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg",
        "bg-muted hover:bg-accent transition-colors text-sm"
      )}
      onClick={() => signIn()}
    >
      <FaUser className="text-base" />
      <span className="font-medium">Login</span>
    </div>
  );
}

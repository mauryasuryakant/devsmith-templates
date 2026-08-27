import Image from "next/image";
import { searchEngineConfig } from "@/../devsmith.config";
import { AccountBtn } from "@/features/account";
import { SearchBar } from "@/features/search-bar";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 gap-6">
      <div className="absolute top-4 right-4">
        <AccountBtn />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Image
          src={searchEngineConfig.app.logo}
          alt={searchEngineConfig.app.name}
          width={200}
          height={60}
          priority
          className="h-auto"
        />
        <p className="text-muted-foreground text-lg font-medium">
          {searchEngineConfig.app.tagline}
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <SearchBar size="large" />
      </div>
    </div>
  );
}

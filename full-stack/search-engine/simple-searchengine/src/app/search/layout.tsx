import { SearchLayout } from "@/features/search-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SearchLayout>{children}</SearchLayout>;
}

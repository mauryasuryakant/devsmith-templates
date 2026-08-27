export default function ResultSkeleton() {
  return (
    <div className="p-4 space-y-2 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-muted" />
        <div className="h-3 bg-muted rounded w-32" />
      </div>
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-5/6" />
    </div>
  );
}

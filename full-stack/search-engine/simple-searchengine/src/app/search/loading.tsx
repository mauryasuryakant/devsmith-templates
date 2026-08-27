export default function Loading() {
  return (
    <div className="space-y-4 py-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 space-y-2 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}

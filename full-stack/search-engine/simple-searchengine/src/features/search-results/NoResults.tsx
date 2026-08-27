interface NoResultsProps {
  query: string | null;
  type?: string;
}

export default function NoResults({ query, type = "documents" }: NoResultsProps) {
  return (
    <div className="py-16 px-4 text-center">
      <h1 className="text-xl font-heading font-semibold mb-2">
        Your search - <strong>{query}</strong> - did not match any {type}.
      </h1>
      <p className="text-muted-foreground mb-3">Suggestions:</p>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
      </ul>
    </div>
  );
}

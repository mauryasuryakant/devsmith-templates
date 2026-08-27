"use client";

interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function LoadMoreBtn({ onClick, isLoading }: LoadMoreBtnProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Load more results"}
      </button>
    </div>
  );
}

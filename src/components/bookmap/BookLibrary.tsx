import { useState } from "react";
import { BookCard } from "./BookCard";
import type { Book } from "@/hooks/useBookMap";

type Filter = "reading" | "finished";

interface BookLibraryProps {
  books: Book[];
  reading: Book[];
  finished: Book[];
  dnf: Book[];
  onUpdatePage: (bookId: string, page: number) => void;
  onDelete: (bookId: string) => void;
  onFinish?: (bookId: string) => void;
  onAddQuote?: (bookId: string, quote: string) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "reading", label: "reading" },
  { value: "finished", label: "finished" },
];

export function BookLibrary({ books, reading, finished, dnf, onUpdatePage, onDelete, onFinish, onAddQuote }: BookLibraryProps) {
  const [filter, setFilter] = useState<Filter>("reading");
  const isEmpty = books.length === 0;

  if (isEmpty) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground text-sm">
          no books yet. add one to get started.
        </p>
      </div>
    );
  }

  const filteredBooks = (filter === "reading" ? reading : finished)
    .slice()
    .sort((a, b) => {
      const aDate = a.sessions.length > 0 ? a.sessions[a.sessions.length - 1].date : a.startDate;
      const bDate = b.sessions.length > 0 ? b.sessions[b.sessions.length - 1].date : b.startDate;
      return bDate.localeCompare(aDate);
    });

  const counts: Record<Filter, number> = {
    reading: reading.length,
    finished: finished.length,
  };

  const emptyMessages: Record<Filter, string> = {
    reading: "nothing in progress. what's next?",
    finished: "no finished books yet. you'll get there.",
  };

  return (
    <div className="w-full">
      {/* Filter chips */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f.value
                ? "bg-foreground text-background"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            {f.label}
            {counts[f.value] > 0 && (
              <span className="ml-1 opacity-70">{counts[f.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Book list */}
      <div className="space-y-3">
        {filteredBooks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            {emptyMessages[filter]}
          </p>
        ) : (
          filteredBooks.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              index={i}
              onUpdatePage={onUpdatePage}
              onDelete={onDelete}
              onFinish={onFinish}
              onAddQuote={onAddQuote}
            />
          ))
        )}
      </div>
    </div>
  );
}

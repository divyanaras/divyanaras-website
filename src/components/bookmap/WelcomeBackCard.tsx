import { useMemo } from "react";
import { motion } from "framer-motion";
import { getDaysSinceLastSession, getLastReadBook } from "@/lib/bookmap-utils";
import type { Book } from "@/hooks/useBookMap";

interface WelcomeBackCardProps {
  books: Book[];
  onLogSession: (bookId: string) => void;
}

export function WelcomeBackCard({ books, onLogSession }: WelcomeBackCardProps) {
  const { daysSince, lastBook } = useMemo(() => {
    const daysSince = getDaysSinceLastSession(books);
    const lastBook = getLastReadBook(books);
    return { daysSince, lastBook };
  }, [books]);

  // Only show if there's a 2+ day gap and a book to resume
  if (daysSince === null || daysSince < 2 || !lastBook) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full border border-amber-500/30 bg-amber-500/5 rounded-lg p-5"
    >
      <p className="text-sm text-foreground leading-relaxed">
        welcome back.{" "}
        <span className="text-muted-foreground">
          it's been {daysSince} days. you were on page {lastBook.currentPage} of{" "}
        </span>
        <span className="font-semibold text-foreground">{lastBook.title}</span>
        <span className="text-muted-foreground">.</span>
      </p>
      <button
        onClick={() => onLogSession(lastBook.id)}
        className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline mt-3 transition-colors"
      >
        pick up where you left off →
      </button>
    </motion.div>
  );
}

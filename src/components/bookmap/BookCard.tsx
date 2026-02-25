import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, CheckCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Book } from "@/hooks/useBookMap";

interface BookCardProps {
  book: Book;
  index: number;
  onUpdatePage?: (bookId: string, page: number) => void;
  onDelete?: (bookId: string) => void;
  onFinish?: (bookId: string) => void;
  onAddQuote?: (bookId: string, quote: string) => void;
}

export function BookCard({ book, index, onUpdatePage, onDelete, onFinish, onAddQuote }: BookCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showQuotePrompt, setShowQuotePrompt] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const quoteInputRef = useRef<HTMLInputElement>(null);
  const hasPages = book.totalPages > 0;
  const [localPage, setLocalPage] = useState(hasPages ? book.currentPage : book.currentPage);
  const progress = hasPages ? (localPage / book.totalPages) * 100 : localPage;

  const handleSliderChange = (value: number[]) => {
    setLocalPage(value[0]);
  };

  const handleSliderCommit = (value: number[]) => {
    const maxVal = hasPages ? book.totalPages : 100;
    if (value[0] >= maxVal) {
      // Don't update page yet — let finishBook handle setting currentPage to max
      onFinish?.(book.id);
    } else {
      onUpdatePage?.(book.id, value[0]);
      setShowQuotePrompt(true);
      setTimeout(() => quoteInputRef.current?.focus(), 50);
    }
  };

  const handleSaveQuote = () => {
    const trimmed = quoteText.trim();
    if (trimmed) {
      onAddQuote?.(book.id, trimmed);
    }
    setQuoteText("");
    setShowQuotePrompt(false);
  };

  const handleDismissQuote = () => {
    setQuoteText("");
    setShowQuotePrompt(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete?.(book.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="w-full border border-border rounded-lg p-4 hover:border-foreground/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        {/* Cover thumbnail or placeholder */}
        <Link to={`/bookmap/book/${book.id}`} className="flex-shrink-0">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-12 h-[4.5rem] rounded-md object-cover"
            />
          ) : (
            <div className="w-12 h-[4.5rem] rounded-md bg-amber-900/40 flex items-center justify-center p-1.5 overflow-hidden">
              <span className="text-[8px] text-amber-200/80 font-semibold leading-tight text-center line-clamp-3 break-words">
                {book.title}
              </span>
            </div>
          )}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/bookmap/book/${book.id}`} className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {book.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{book.author}</p>
            </Link>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="flex-shrink-0 p-1 rounded hover:bg-destructive/10 transition-colors"
              title={confirmDelete ? "tap again to confirm" : "delete book"}
            >
              <Trash2
                size={14}
                className={confirmDelete ? "text-destructive" : "text-muted-foreground/50 hover:text-muted-foreground"}
              />
            </button>
          </div>

          {confirmDelete && (
            <p className="text-xs text-destructive mt-1">delete this book? this can't be undone.</p>
          )}

          {/* Progress — always visible */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              {hasPages ? (
                <span>p. {localPage} of {book.totalPages}</span>
              ) : (
                <span>{Math.round(progress)}% done</span>
              )}
              <span>{Math.round(progress)}%</span>
            </div>
            {book.status === "reading" ? (
              <Slider
                value={[localPage]}
                min={0}
                max={hasPages ? book.totalPages : 100}
                step={1}
                onValueChange={handleSliderChange}
                onValueCommit={handleSliderCommit}
                className="cursor-grab active:cursor-grabbing"
              />
            ) : (
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${book.status === "finished" ? "bg-green-500" : "bg-muted-foreground/40"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Quote prompt after slider move */}
          {showQuotePrompt && book.status === "reading" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 flex gap-2 items-center"
            >
              <Input
                ref={quoteInputRef}
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="anything memorable?"
                className="text-xs h-8 bg-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveQuote();
                  if (e.key === "Escape") handleDismissQuote();
                }}
              />
              <Button size="sm" variant="ghost" className="h-8 text-xs px-2" onClick={handleSaveQuote}>
                save
              </Button>
              <button onClick={handleDismissQuote} className="text-muted-foreground/50 hover:text-muted-foreground text-xs px-1">
                ✕
              </button>
            </motion.div>
          )}

          {/* Finished badge */}
          {book.status === "finished" && (
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={12} className="text-green-500" />
              <span className="text-xs text-muted-foreground">
                finished
              </span>
            </div>
          )}

          {/* DNF info */}
          {book.status === "dnf" && (
            <p className="text-xs text-muted-foreground mt-2">
              stopped reading
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

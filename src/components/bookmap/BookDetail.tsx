import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ArrowLeft, BookOpen, XCircle, Quote, Pencil, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useBookMap } from "@/hooks/useBookMap";
import { LogSessionDrawer } from "./LogSessionDrawer";
import { DnfDialog } from "./DnfDialog";

const STATUS_BADGE = {
  reading: { label: "reading", className: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  finished: { label: "finished", className: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" },
  dnf: { label: "did not finish", className: "bg-muted text-muted-foreground border-border" },
} as const;

export default function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { getBook, books, logSession, dnfBook, updateFinishNote, addQuote } = useBookMap();
  const book = getBook(bookId || "");

  const [sessionOpen, setSessionOpen] = useState(false);
  const [dnfOpen, setDnfOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [addingQuote, setAddingQuote] = useState(false);
  const [newQuote, setNewQuote] = useState("");
  const quoteInputRef = useRef<HTMLInputElement>(null);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
        <GrainOverlay />
        <ThemeToggle />
        <p className="text-muted-foreground">book not found.</p>
        <Link to="/bookmap" className="text-sm text-amber-600 dark:text-amber-400 hover:underline mt-2">
          Back to Bookmap
        </Link>
      </div>
    );
  }

  const progress = book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : 0;
  const badge = STATUS_BADGE[book.status];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 px-6 py-4 bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:right-auto">
        <div className="flex flex-col gap-2">
          <Link to="/work" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Work</Link>
          <Link to="/bookshelf" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Bookshelf</Link>
          <Link to="/bookmap" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Bookmap</Link>
        </div>
      </nav>

      <main className="page-transition max-w-lg w-full flex flex-col z-10 pt-24 md:pt-16">
        {/* Back */}
        <Link
          to="/bookmap"
          className="self-start flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Bookmap</span>
        </Link>

        {/* Book header */}
        <div className="flex items-start gap-4 mb-6">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="w-16 h-24 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-24 rounded-lg bg-amber-900/40 flex items-center justify-center flex-shrink-0 p-2 overflow-hidden">
              <span className="text-[10px] text-amber-200/80 font-semibold leading-tight text-center line-clamp-4 break-words">
                {book.title}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-foreground">{book.title}</h1>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <Badge variant="outline" className={`mt-2 text-xs ${badge.className}`}>
              {badge.label}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>page {book.currentPage} of {book.totalPages}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Finish note — editable */}
        <div className="border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">how I liked it in a line</p>
            {!editingNote && (
              <button
                onClick={() => {
                  setNoteText(book.finishNote || "");
                  setEditingNote(true);
                }}
                className="text-muted-foreground/50 hover:text-muted-foreground"
              >
                <Pencil size={12} />
              </button>
            )}
          </div>
          {editingNote ? (
            <div className="space-y-2">
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="one line — what did you think?"
                className="bg-background resize-none text-sm"
                rows={2}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => setEditingNote(false)}
                >
                  cancel
                </Button>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    updateFinishNote(book.id, noteText.trim());
                    setEditingNote(false);
                  }}
                >
                  save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground">
              {book.finishNote || <span className="text-muted-foreground italic">tap the pencil to add a note</span>}
            </p>
          )}
        </div>

        {/* Memorable quotes — editable */}
        <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Quote size={14} className="text-amber-600 dark:text-amber-400" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">memorable quotes</p>
            </div>
            {!addingQuote && (
              <button
                onClick={() => {
                  setAddingQuote(true);
                  setTimeout(() => quoteInputRef.current?.focus(), 50);
                }}
                className="text-muted-foreground/50 hover:text-muted-foreground"
              >
                <Plus size={14} />
              </button>
            )}
          </div>
          {book.memorableQuotes && book.memorableQuotes.length > 0 && (
            <div className="space-y-3 mb-3">
              {book.memorableQuotes.map((quote, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-foreground italic pl-3 border-l-2 border-amber-500/40"
                >
                  "{quote}"
                </motion.p>
              ))}
            </div>
          )}
          {addingQuote ? (
            <div className="flex gap-2 items-center">
              <Input
                ref={quoteInputRef}
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                placeholder="a line that stopped you"
                className="text-xs h-8 bg-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newQuote.trim()) {
                    addQuote(book.id, newQuote.trim());
                    setNewQuote("");
                    setAddingQuote(false);
                  }
                  if (e.key === "Escape") {
                    setNewQuote("");
                    setAddingQuote(false);
                  }
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs px-2"
                onClick={() => {
                  if (newQuote.trim()) {
                    addQuote(book.id, newQuote.trim());
                  }
                  setNewQuote("");
                  setAddingQuote(false);
                }}
              >
                save
              </Button>
            </div>
          ) : (
            !book.memorableQuotes?.length && (
              <p className="text-sm text-muted-foreground italic">tap + to add a quote</p>
            )
          )}
        </div>

        {/* DNF reason */}
        {book.status === "dnf" && book.dnfReason && (
          <div className="border border-border rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">why i stopped</p>
            <p className="text-sm text-foreground">{book.dnfReason}</p>
          </div>
        )}

        {/* Action buttons */}
        {book.status === "reading" && (
          <div className="flex gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setSessionOpen(true)}
            >
              <BookOpen size={14} className="mr-1" /> log session
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDnfOpen(true)}
            >
              <XCircle size={14} className="mr-1" /> dnf
            </Button>
          </div>
        )}

        {/* Started date */}
        <p className="text-xs text-muted-foreground">
          started {format(parseISO(book.startDate), "MMMM d, yyyy")}
        </p>
      </main>

      {/* Drawers / Dialogs */}
      <LogSessionDrawer
        open={sessionOpen}
        onOpenChange={setSessionOpen}
        books={books}
        onLog={logSession}
        preselectedBookId={book.id}
      />
      <DnfDialog
        open={dnfOpen}
        onOpenChange={setDnfOpen}
        bookTitle={book.title}
        onDnf={(reason) => {
          dnfBook(book.id, reason);
          setDnfOpen(false);
        }}
      />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, BookOpen, Camera, BookCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FinishBookDialog } from "@/components/bookmap/FinishBookDialog";
import { useBookMap } from "@/hooks/useBookMap";
import { ReadingHeatmap } from "@/components/bookmap/ReadingHeatmap";
import { WelcomeBackCard } from "@/components/bookmap/WelcomeBackCard";
import { BookLibrary } from "@/components/bookmap/BookLibrary";
import { AddBookForm } from "@/components/bookmap/AddBookForm";
import { LogSessionDrawer } from "@/components/bookmap/LogSessionDrawer";

const BookMap = () => {
  const { books, reading, finished, dnf, addBook, logSession, updateCurrentPage, finishBook, addQuote, deleteBook } = useBookMap();
  const year = new Date().getFullYear();

  const [addBookOpen, setAddBookOpen] = useState(false);
  const [logSessionOpen, setLogSessionOpen] = useState(false);
  const [preselectedBookId, setPreselectedBookId] = useState<string | undefined>();
  const [preselectedDate, setPreselectedDate] = useState<string | undefined>();
  const [sharePreviewOpen, setSharePreviewOpen] = useState(false);
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);
  const [finishBookId, setFinishBookId] = useState<string | undefined>();
  const [yearReadsOpen, setYearReadsOpen] = useState(false);

  const handleLogSessionForBook = (bookId: string) => {
    setPreselectedBookId(bookId);
    setLogSessionOpen(true);
  };

  // Recent books for screenshot dialog (reading + finished, sorted by latest activity)
  const recentBooks = [...reading, ...finished]
    .sort((a, b) => {
      const aDate = a.sessions.length > 0 ? a.sessions[a.sessions.length - 1].date : a.startDate;
      const bDate = b.sessions.length > 0 ? b.sessions[b.sessions.length - 1].date : b.startDate;
      return bDate.localeCompare(aDate);
    })
    .slice(0, 5);

  const handleFinishFromSlider = (bookId: string) => {
    setFinishBookId(bookId);
    setFinishDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 px-6 py-4 bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:right-auto">
        <div className="flex flex-col gap-2">
          <Link
            to="/work"
            className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Work
          </Link>
          <Link
            to="/bookshelf"
            className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Bookshelf
          </Link>
          <Link
            to="/bookmap"
            className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Bookmap
          </Link>
        </div>
      </nav>

      <main className="page-transition max-w-lg w-full flex flex-col z-10 pt-24 md:pt-16">
        {/* Back Link */}
        <Link
          to="/"
          className="self-start flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Home</span>
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Bookmap</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{year}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSharePreviewOpen(true)}
              disabled={books.length === 0}
            >
              <Camera size={14} className="mr-1" />
              screenshot this!
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPreselectedBookId(undefined);
                setLogSessionOpen(true);
              }}
              disabled={reading.length === 0}
            >
              <BookOpen size={14} className="mr-1" />
              log
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAddBookOpen(true)}
            >
              <Plus size={14} className="mr-1" />
              add book
            </Button>
          </div>
        </div>

        {/* Reading Heatmap */}
        <section className="mb-8">
          <ReadingHeatmap books={books} year={year} onDateSelect={(date) => setPreselectedDate(date)} />
        </section>

        {/* Welcome Back Card */}
        <div className="mb-8">
          <WelcomeBackCard books={books} onLogSession={handleLogSessionForBook} />
        </div>

        {/* Book Library */}
        <section className="mb-8">
          <BookLibrary
            books={books}
            reading={reading}
            finished={finished}
            dnf={dnf}
            onUpdatePage={updateCurrentPage}
            onDelete={deleteBook}
            onFinish={handleFinishFromSlider}
            onAddQuote={addQuote}
          />
        </section>

        {/* Year Reads button */}
        {finished.length > 0 && (
          <section className="mb-8">
            <button
              onClick={() => setYearReadsOpen(true)}
              className="w-full border border-border rounded-lg p-4 hover:border-foreground/20 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <BookCheck size={16} className="text-green-500" />
                <span className="text-sm font-semibold text-foreground">{year} reads</span>
                <span className="text-xs text-muted-foreground ml-auto">{finished.length} book{finished.length !== 1 ? "s" : ""}</span>
              </div>
            </button>
          </section>
        )}
      </main>

      {/* Screenshot Dialog */}
      <Dialog open={sharePreviewOpen} onOpenChange={setSharePreviewOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Bookmap {year}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            {/* Heatmap */}
            <div className="mb-6">
              <ReadingHeatmap books={books} year={year} />
            </div>

            {/* Latest reads */}
            {recentBooks.length > 0 && (
              <div className="space-y-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">latest reads</p>
                {recentBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-start gap-4 mb-2">
                      {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} className="w-12 h-[4.5rem] rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-[4.5rem] rounded-lg bg-amber-900/40 flex items-center justify-center flex-shrink-0 p-1.5 overflow-hidden">
                          <span className="text-[8px] text-amber-200/80 font-semibold leading-tight text-center line-clamp-3 break-words">{book.title}</span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                        {book.status === "finished" ? (
                          <div className="flex items-center gap-1 mt-1.5">
                            <CheckCircle size={12} className="text-green-500" />
                            <span className="text-xs text-muted-foreground">finished</span>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : book.currentPage}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              {book.totalPages > 0 ? `p. ${book.currentPage} of ${book.totalPages}` : `${book.currentPage}%`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {book.finishNote && (
                      <div className="border border-border rounded-lg p-3 mt-1">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">how I liked it in a line</p>
                        <p className="text-sm text-foreground">{book.finishNote}</p>
                      </div>
                    )}
                    {i < recentBooks.length - 1 && (
                      <div className="border-b border-border mt-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            )}


          </div>
        </DialogContent>
      </Dialog>

      {/* Year Reads Dialog */}
      <Dialog open={yearReadsOpen} onOpenChange={setYearReadsOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">{year} reads</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-2">
            {finished.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">no finished books yet.</p>
            ) : (
              finished.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Book header — matches BookDetail layout */}
                  <div className="flex items-start gap-4 mb-3">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.title} className="w-14 h-20 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-20 rounded-lg bg-amber-900/40 flex items-center justify-center flex-shrink-0 p-1.5 overflow-hidden">
                        <span className="text-[8px] text-amber-200/80 font-semibold leading-tight text-center line-clamp-4 break-words">{book.title}</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-foreground">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <CheckCircle size={12} className="text-green-500" />
                        <span className="text-xs text-muted-foreground">finished</span>
                      </div>
                    </div>
                  </div>

                  {/* "how I liked it in a line" */}
                  {book.finishNote && (
                    <div className="border border-border rounded-lg p-3 mb-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">how I liked it in a line</p>
                      <p className="text-sm text-foreground">{book.finishNote}</p>
                    </div>
                  )}

                  {/* Divider between books */}
                  {i < finished.length - 1 && (
                    <div className="border-b border-border mt-4" />
                  )}
                </motion.div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <AddBookForm
        open={addBookOpen}
        onOpenChange={setAddBookOpen}
        onSubmit={addBook}
        onFinishImmediately={handleFinishFromSlider}
      />
      <LogSessionDrawer
        open={logSessionOpen}
        onOpenChange={setLogSessionOpen}
        books={[...reading, ...finished]}
        onLog={logSession}
        preselectedBookId={preselectedBookId}
        preselectedDate={preselectedDate}
      />
      {finishBookId && (
        <FinishBookDialog
          open={finishDialogOpen}
          onOpenChange={setFinishDialogOpen}
          bookTitle={books.find((b) => b.id === finishBookId)?.title || ""}
          onFinish={(note, quotes, finishMonth) => {
            finishBook(finishBookId, note, quotes, finishMonth);
            setFinishDialogOpen(false);
            setFinishBookId(undefined);
          }}
        />
      )}
    </div>
  );
};

export default BookMap;

import { Link } from "react-router-dom";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { books } from "@/data/books";

const Bookshelf = () => {
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
            work
          </Link>
          <Link
            to="/bookshelf"
            className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            bookshelf
          </Link>
        </div>
      </nav>

      <main className="page-transition max-w-lg w-full flex flex-col items-center text-center z-10 pt-24 md:pt-16">
        {/* Back Link */}
        <Link
          to="/"
          className="self-start flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">home</span>
        </Link>

        {/* Header */}
        <div className="w-full border border-border rounded-lg p-6 mb-12 text-left">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Bookshelf</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            here's a set of books which moved me when i read them. the total sum of these content here, is the person i am today.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            my loud opinions on them are supported as one-liners with the book, and the ones in <span className="text-red-700 dark:text-red-400">red</span> are books that moved me extra.
          </p>
        </div>

        {/* Book List */}
        <section className="w-full text-left mb-12">
          <div className="space-y-4">
            {books.map((book, index) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <p className="text-base leading-relaxed">
                  <span className={`font-semibold ${book.isFavorite ? 'text-red-700 dark:text-red-400' : 'text-foreground'}`}>
                    {book.title}
                  </span>
                  <span className="text-muted-foreground"> by {book.author}</span>
                  <span className="text-muted-foreground"> - {book.review}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground font-medium self-start">
          always adding more. always rereading old favorites.
        </p>
      </main>
    </div>
  );
};

export default Bookshelf;

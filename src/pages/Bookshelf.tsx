import { Link } from "react-router-dom";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface Book {
  title: string;
  author: string;
  review: string;
}

const books: Book[] = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    review: "Epic in scope but the analogies feel dated now that sci-fi has evolved so much."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    review: "Simple frameworks that actually stick. Changed how I think about systems."
  },
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    review: "Should be mandatory reading for anyone building products. Brutally practical."
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    review: "Raw and honest. Makes you want to run through walls for your ideas."
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    review: "Reframes everything you thought you knew about being human."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    review: "Overhyped but the journey metaphor hits different at certain life stages."
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    review: "Dense but rewarding. Your brain will never feel the same."
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    review: "A warm hug disguised as fiction. Read it when life feels heavy."
  },
];

const Bookshelf = () => {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />
      
      <main className="page-transition max-w-2xl mx-auto z-10 relative">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">back</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4 font-medium">
            Bookshelf
          </h1>
          <p className="text-muted-foreground text-base">
            books that shaped how i think, work, and wander.
          </p>
        </div>

        {/* Book List */}
        <div className="space-y-4">
          {books.map((book, index) => (
            <motion.div 
              key={book.title}
              className="book-card p-5 bg-card/50 backdrop-blur-sm border border-border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-foreground font-medium">{book.title}</h3>
                <span className="text-xs text-muted-foreground shrink-0 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
              <p className="text-sm text-foreground/80 italic leading-relaxed">"{book.review}"</p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-muted-foreground text-center font-medium">
          always adding more. always rereading old favorites.
        </p>
      </main>
    </div>
  );
};

export default Bookshelf;
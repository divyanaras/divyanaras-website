import { Link } from "react-router-dom";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface Book {
  title: string;
  author: string;
  review: string;
  highlighted?: boolean;
  isSubBook?: boolean;
}

const books: Book[] = [
  {
    title: "Molecule of More",
    author: "Daniel Lieberman",
    review: "neuroscience, a friendly layman read",
    highlighted: true,
  },
  {
    title: "Art of Laziness",
    author: "Library Mindset",
    review: "quick skim, nothing new",
  },
  {
    title: "Bastard of Istanbul",
    author: "Elif Shafak",
    review: "extremely rich in writing, a lil redundant with her other ones",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    review: "classic, descriptive",
  },
  {
    title: "A Little Life",
    author: "Hanya Yanagihara",
    review: "internet is right sometimes, worth the tears",
    highlighted: true,
  },
  {
    title: "Who Moved My Cheese",
    author: "Spencer Johnson",
    review: "shortest, most impactful entrepreneurial piece",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    review: "truly scary and inspiring, like 1984",
    highlighted: true,
  },
  {
    title: "Orbital",
    author: "Samantha Harvey",
    review: "takes you on a real life space orbital",
    highlighted: true,
  },
  {
    title: "On Earth We're Briefly Gorgeous",
    author: "Ocean Vuong",
    review: "emotional, poetic, a little too much",
  },
  {
    title: "Good Material",
    author: "Dolly Alderton",
    review: "funny, new age, great writing",
  },
  {
    title: "White Nights",
    author: "Dostoevsky",
    review: "makes me rethink reading classics now",
  },
  {
    title: "Three-Body Problem",
    author: "Cixin Liu",
    review: "sci-fi, THE BEST BOOK SERIES OF MY LIFE",
    highlighted: true,
  },
  {
    title: "The Dark Forest",
    author: "Cixin Liu",
    review: "novel concepts, the reason why this series is the greatest",
    highlighted: true,
    isSubBook: true,
  },
  {
    title: "Death's End",
    author: "Cixin Liu",
    review: "can be a bit of a drag, ends great no notes",
    highlighted: true,
    isSubBook: true,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    review: "how did i not read this earlier",
  },
  {
    title: "The Redemption of Time",
    author: "Baoshu",
    review: "save yourselves from this misery",
  },
  {
    title: "Calculating God",
    author: "Robert J. Sawyer",
    review: "deals with a loaded question, introspect-able",
  },
  {
    title: "The Elephant Vanishes",
    author: "Murakami",
    review: "loved 2 short stories, hated the rest",
  },
  {
    title: "Never Logged Out",
    author: "Ria Chopra",
    review: "a nice lil rabbit hole",
  },
  {
    title: "Foundation Series",
    author: "Isaac Asimov",
    review: "decent sci-fi, reading the 2nd",
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
          <span className="text-sm">back</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            bookshelf
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-3">
            here's a set of books which moved me when i read them. the total sum of these content here, is the person i am today.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            my loud opinions on them are supported as one-liners with the book, and the ones in <span className="text-red-700 dark:text-red-400">red</span> are books that moved me extra.
          </p>
        </div>

        {/* Book List */}
        <div className="space-y-3">
          {books.map((book, index) => (
            <motion.div 
              key={book.title}
              className={`${book.isSubBook ? 'ml-6' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <p className={`text-base leading-relaxed ${book.highlighted ? 'text-red-700 dark:text-red-400' : 'text-foreground'}`}>
                <span className="font-semibold">{book.title}</span>
                {" by "}
                <span className="font-semibold">{book.author}</span>
                {" - "}
                <span className="font-normal">{book.review}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-sm text-muted-foreground">
          always adding more. always rereading old favorites.
        </p>
      </main>
    </div>
  );
};

export default Bookshelf;

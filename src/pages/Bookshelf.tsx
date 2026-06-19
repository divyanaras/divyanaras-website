import { useState, useMemo, useRef, useEffect } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SideNav } from "@/components/SideNav";
import { getBooks, type Book, type BookCategory } from "@/data/books";
import flowerHighlight from "@/assets/icons/flower_highlight.png";

function coverSrc(url: string) {
  return url.replace("/upload/", "/upload/w_300,f_auto,q_auto/");
}

const PLACEHOLDER_COLORS = [
  "hsl(38 45% 80%)", "hsl(30 38% 78%)", "hsl(44 40% 82%)",
  "hsl(28 32% 76%)", "hsl(42 35% 84%)", "hsl(34 40% 79%)",
];

const SERIES_ORDER: string[][] = [
  ["1Q84", "Norwegian Wood", "Kafka on the Shore", "A Wild Sheep Chase", "The Elephant Vanishes"],
  ["The Three-Body Problem", "The Dark Forest", "Death's End", "The Redemption of Time"],
  ["Angels and Demons", "The Da Vinci Code", "Digital Fortress"],
  ["The Forty Rules of Love", "The Bastard of Istanbul", "The Architect's Apprentice"],
  ["The Humans", "The Midnight Library", "The Comfort Book"],
  ["Harry Potter and the Order of the Phoenix", "Harry Potter and the Half-Blood Prince"],
  ["Foundation", "Foundation and Empire"],
  ["The Immortals of Meluha", "The Oath of the Vayuputras"],
  ["Days at the Morisaki Bookshop", "More Days at the Morisaki Bookshop"],
  ["1984", "Animal Farm"],
  ["Independence", "The Palace of Illusions"],
  ["White Nights", "Crime and Punishment"],
  ["Deep Work", "Digital Minimalism"],
];

function groupBooks(books: Book[]): Book[] {
  const byTitle = new Map(books.map((b) => [b.title, b]));
  const used = new Set<string>();
  const result: Book[] = [];

  for (const group of SERIES_ORDER) {
    const matched = group.map((t) => byTitle.get(t)).filter((b): b is Book => !!b);
    if (matched.length >= 2) {
      matched.forEach((b) => { result.push(b); used.add(b.title); });
    }
  }
  books.forEach((b) => { if (!used.has(b.title)) result.push(b); });
  return result;
}

// ── BookCard ────────────────────────────────────────────────────────────────

function BookCard({ book, index }: { book: Book; index: number }) {
  const [hovered, setHovered] = useState(false);
  const bg = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <div
      className="relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "rotate(2deg) scale(1.05)" : "rotate(0deg) scale(1)",
        transition: "transform 0.16s ease",
      }}
    >
      <div className="rounded overflow-hidden shadow-sm">
        {book.cover ? (
          <img src={coverSrc(book.cover)} alt={book.title} loading="lazy" draggable={false} className="w-full h-auto block" />
        ) : (
          <div className="aspect-[2/3] w-full" style={{ background: bg }} />
        )}
      </div>

      {/* flower highlight */}
      {book.highlight && (
        <img
          src={flowerHighlight}
          alt=""
          draggable={false}
          className="absolute -top-2 -left-2 w-7 h-7 pointer-events-none"
          style={{ transform: "rotate(-15deg)" }}
        />
      )}
      <div
        className="absolute inset-0 flex flex-col justify-end p-2 rounded"
        style={{
          background: "linear-gradient(to top, rgba(30,24,18,0.92) 48%, transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.16s ease",
        }}
      >
        <p className="text-[10px] font-semibold text-white leading-tight line-clamp-2">
          {book.title}{book.isFavorite && <span className="text-amber-400 ml-1">★</span>}
        </p>
        <p className="text-[9px] text-white/60 mt-0.5 leading-tight line-clamp-1">{book.author}</p>
      </div>
    </div>
  );
}

type CategoryFilter = "all" | BookCategory;

// ── Page ────────────────────────────────────────────────────────────────────

const Bookshelf = () => {
  useEffect(() => { document.title = "digital library — divya narasimhan"; }, []);
  const allBooks = getBooks();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [authorSearch, setAuthorSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let books = category === "all" ? allBooks : allBooks.filter((b) => b.category === category);
    if (authorSearch.trim()) {
      const q = authorSearch.toLowerCase();
      books = books.filter((b) => b.author.toLowerCase().includes(q));
    }
    return groupBooks(books);
  }, [allBooks, category, authorSearch]);

  return (
    <div className="min-h-screen relative">
      <GrainOverlay />
      <SideNav />

      <div className="ml-40 px-10 py-10">
        <div className="page-transition max-w-6xl">

          {/* Header */}
          <h1 className="font-handwritten text-4xl md:text-5xl tracking-normal leading-none mb-6">
            digital library
          </h1>
          <p className="text-sm text-foreground leading-relaxed max-w-md mb-3">
            an internet archive of my existing bookshelf. books on scifi, neuroscience, slice of life, magical reality, business, psychology and more. as i'm parting ways with my physical bookshelf, this comes with me wherever i go. the books below are the real covers from my shelf.
          </p>
          <p className="text-sm text-foreground leading-relaxed max-w-md mb-10">
            <img src={flowerHighlight} alt="" className="inline-block w-4 h-4 mr-1 align-middle" style={{ transform: "rotate(-15deg)" }} /> books with red stars moved me the most.
          </p>

          {/* Filter bar */}
          <div className="flex items-center justify-between mb-8 gap-6 flex-wrap">
            {/* Category */}
            <div className="flex items-center gap-5">
              {(["all", "fiction", "non-fiction"] as CategoryFilter[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCategory(opt)}
                  className={`text-xs transition-colors duration-100 ${
                    category === opt ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Author search */}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="search by author"
                value={authorSearch}
                onChange={(e) => setAuthorSearch(e.target.value)}
                className="text-xs bg-transparent border-b border-border/60 focus:border-primary outline-none pb-0.5 w-36 placeholder:text-muted-foreground/50 transition-colors"
              />
              {authorSearch && (
                <button
                  onClick={() => { setAuthorSearch(""); inputRef.current?.focus(); }}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  ×
                </button>
              )}
              <span className="text-xs text-muted-foreground">{filtered.length}</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-3 gap-y-5">
            {filtered.map((book, i) => (
              <BookCard key={book.title} book={book} index={i} />
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-16 pb-10">
            hover a cover
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;

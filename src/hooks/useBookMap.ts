import { useState, useEffect, useCallback } from "react";

// --- Types ---

export interface ReadingSession {
  id: string;
  date: string; // "YYYY-MM-DD"
  pagesRead: number;
  currentPage: number; // page after this session
  intensity?: 1 | 2 | 3; // 1=light, 2=moderate, 3=intense
}

export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  coverUrl?: string;
  status: "reading" | "finished" | "dnf";
  currentPage: number;
  startDate: string;
  finishDate?: string;
  finishNote?: string;
  memorableQuotes?: string[];
  dnfReason?: string;
  sessions: ReadingSession[];
}

// --- Constants ---

const STORAGE_KEY = "bookmap_v1";

// --- Helpers ---

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// --- Hook ---

export function useBookMap() {
  const [books, setBooks] = useState<Book[]>(loadBooks);

  // Persist on every change
  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const addBook = useCallback(
    (data: { title: string; author: string; totalPages: number; coverUrl?: string }) => {
      const book: Book = {
        id: generateId(),
        title: data.title,
        author: data.author,
        totalPages: data.totalPages,
        coverUrl: data.coverUrl,
        status: "reading",
        currentPage: 0,
        startDate: new Date().toISOString().slice(0, 10),
        sessions: [],
      };
      setBooks((prev) => [book, ...prev]);
      return book;
    },
    []
  );

  const logSession = useCallback(
    (bookId: string, pagesRead: number, date?: string, intensity?: 1 | 2 | 3) => {
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id !== bookId) return book;
          const newCurrentPage = Math.min(book.currentPage + pagesRead, book.totalPages);
          const session: ReadingSession = {
            id: generateId(),
            date: date || new Date().toISOString().slice(0, 10),
            pagesRead,
            currentPage: newCurrentPage,
            intensity: intensity || 2,
          };
          return {
            ...book,
            currentPage: newCurrentPage,
            sessions: [...book.sessions, session],
          };
        })
      );
    },
    []
  );

  const updateCurrentPage = useCallback((bookId: string, page: number) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        const max = book.totalPages > 0 ? book.totalPages : 100;
        return {
          ...book,
          currentPage: Math.min(Math.max(0, page), max),
        };
      })
    );
  }, []);

  const finishBook = useCallback((bookId: string, note?: string, quotes?: string[], finishMonth?: string) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        // If month provided, build a date from it (1st of that month, current year)
        let finishDate = new Date().toISOString().slice(0, 10);
        if (finishMonth) {
          const monthIndex = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].indexOf(finishMonth);
          if (monthIndex >= 0) {
            const year = new Date().getFullYear();
            finishDate = `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;
          }
        }
        // Merge existing quotes with any new ones from the finish dialog
        const existingQuotes = book.memorableQuotes || [];
        const newQuotes = quotes && quotes.length > 0 ? quotes : [];
        const mergedQuotes = [...existingQuotes, ...newQuotes];
        return {
          ...book,
          status: "finished" as const,
          currentPage: book.totalPages,
          finishDate,
          finishNote: note || book.finishNote,
          memorableQuotes: mergedQuotes.length > 0 ? mergedQuotes : undefined,
        };
      })
    );
  }, []);

  const dnfBook = useCallback((bookId: string, reason?: string) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        return {
          ...book,
          status: "dnf" as const,
          finishDate: new Date().toISOString().slice(0, 10),
          dnfReason: reason,
        };
      })
    );
  }, []);

  const updateFinishNote = useCallback((bookId: string, note: string) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        return {
          ...book,
          finishNote: note || undefined,
        };
      })
    );
  }, []);

  const addQuote = useCallback((bookId: string, quote: string) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        return {
          ...book,
          memorableQuotes: [...(book.memorableQuotes || []), quote],
        };
      })
    );
  }, []);

  const deleteBook = useCallback((bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  }, []);

  const getBook = useCallback(
    (bookId: string) => books.find((b) => b.id === bookId),
    [books]
  );

  // Filtered lists
  const reading = books.filter((b) => b.status === "reading");
  const finished = books.filter((b) => b.status === "finished");
  const dnf = books.filter((b) => b.status === "dnf");

  return {
    books,
    reading,
    finished,
    dnf,
    addBook,
    logSession,
    updateCurrentPage,
    finishBook,
    dnfBook,
    updateFinishNote,
    addQuote,
    deleteBook,
    getBook,
  };
}

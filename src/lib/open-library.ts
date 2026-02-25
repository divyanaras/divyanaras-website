// Book search — Open Library (primary) + Google Books (fallback)

interface BookSearchResult {
  coverUrl?: string;
  totalPages?: number;
  title?: string;
  author?: string;
}

// --- Open Library ---

interface OLDoc {
  title?: string;
  author_name?: string[];
  cover_i?: number;
  number_of_pages_median?: number;
}

interface OLResponse {
  docs: OLDoc[];
}

async function searchOpenLibrary(
  title: string,
  author?: string
): Promise<BookSearchResult | null> {
  const params = new URLSearchParams({
    title,
    limit: "5",
    fields: "title,author_name,number_of_pages_median,cover_i",
  });
  if (author) params.set("author", author);

  const res = await fetch(`https://openlibrary.org/search.json?${params}`);
  if (!res.ok) return null;

  const data: OLResponse = await res.json();
  if (!data.docs || data.docs.length === 0) return null;

  // Prefer a result with both cover and pages
  const best =
    data.docs.find((d) => d.cover_i && d.number_of_pages_median) ||
    data.docs.find((d) => d.cover_i) ||
    data.docs[0];

  return {
    coverUrl: best.cover_i
      ? `https://covers.openlibrary.org/b/id/${best.cover_i}-M.jpg`
      : undefined,
    totalPages: best.number_of_pages_median || undefined,
    title: best.title || undefined,
    author: best.author_name?.[0] || undefined,
  };
}

// --- Google Books (fallback) ---

interface GoogleBooksVolume {
  volumeInfo: {
    title?: string;
    authors?: string[];
    pageCount?: number;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBooksVolume[];
}

async function searchGoogleBooks(
  title: string,
  author?: string
): Promise<BookSearchResult | null> {
  let query = `intitle:${title}`;
  if (author) query += `+inauthor:${author}`;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&printType=books`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const data: GoogleBooksResponse = await res.json();
  const items = data.items || [];
  if (items.length === 0) return null;

  const best =
    items.find((d) => d.volumeInfo.imageLinks?.thumbnail && d.volumeInfo.pageCount) ||
    items.find((d) => d.volumeInfo.imageLinks?.thumbnail) ||
    items[0];

  const info = best.volumeInfo;
  let coverUrl = info.imageLinks?.thumbnail;
  if (coverUrl) coverUrl = coverUrl.replace("http://", "https://");

  return {
    coverUrl: coverUrl || undefined,
    totalPages: info.pageCount || undefined,
    title: info.title || undefined,
    author: info.authors?.[0] || undefined,
  };
}

// --- Public API ---

export async function searchBook(
  title: string,
  author?: string
): Promise<BookSearchResult | null> {
  // Try Open Library first
  try {
    const result = await searchOpenLibrary(title, author);
    if (result) return result;
  } catch {
    // fall through to Google Books
  }

  // Fallback to Google Books
  try {
    return await searchGoogleBooks(title, author);
  } catch {
    return null;
  }
}

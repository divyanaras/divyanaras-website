# divyanaras.com

My personal website — built with React, Vite, and Tailwind CSS. Hosted on GitHub Pages at [divyanaras.com](https://divyanaras.com).

## What's on the site
- **Home** — short bio and links to Substack, X, LinkedIn, and cal.com
- **Work** — my work and projects
- **Bookshelf** — books I've read with one-liner reviews. Favorites highlighted in red.
- **Bookmap** — personal reading tracker with heatmap, book library, and sharing

---

## Bookmap — how it works

Bookmap is a personal reading tracker that lives at `/bookmap`. All data is stored in your browser's localStorage (no backend, no login). Here's what you can do and how everything connects.

### What you can do

| Action | How |
|--------|-----|
| **Add a book** | Click "add book" → enter title + author → hit "fetch" to auto-fill cover and pages from Open Library → "start reading" |
| **Add a finished book** | Same as above, but check "already finished this one" → finish dialog opens immediately |
| **Track progress** | Drag the slider on any book card to update your page |
| **Log a session** | Click "log" → pick book, intensity (light/moderate/intense), date → heatmap updates |
| **Log from heatmap** | Click any heatmap tile → click "log" → date auto-fills to that tile's date |
| **Finish a book** | Drag slider to 100% → finish dialog opens → add a note, quotes, and month finished |
| **Add quotes while reading** | Move the slider → "anything memorable?" prompt appears → type and save |
| **Edit notes and quotes later** | Click into any book → pencil icon to edit your note, + icon to add quotes |
| **Mark as DNF** | Click into a book → "dnf" button → add a reason |
| **Delete a book** | Tap the trash icon on any book card → tap again to confirm |
| **Screenshot** | Click "screenshot this!" → see your heatmap + latest reads in a shareable preview |
| **View year reads** | Click the "2026 reads" button → see all finished books with your notes |

### How the files talk to each other

```
BookMap.tsx (main page — orchestrates everything)
│
├── useBookMap.ts (hook — all data + actions)
│   ├── addBook, logSession, updateCurrentPage
│   ├── finishBook, dnfBook, deleteBook
│   ├── addQuote, updateFinishNote
│   └── localStorage read/write (key: bookmap_v1)
│
├── ReadingHeatmap.tsx (the green/amber grid)
│   ├── bookmap-utils.ts → buildHeatmapData, groupByWeek
│   ├── Click a tile → tells BookMap.tsx which date was selected
│   └── Shows day-session popover on click
│
├── WelcomeBackCard.tsx (greeting + nudge to log)
│   └── Shows your most recent book, prompts to log a session
│
├── BookLibrary.tsx (reading/finished tabs)
│   └── BookCard.tsx (one per book)
│       ├── Slider → onUpdatePage (drag to track progress)
│       ├── Slider to 100% → onFinish → opens FinishBookDialog
│       ├── Slider move → quote prompt → onAddQuote
│       └── Delete button → onDelete
│
├── AddBookForm.tsx (dialog to add a new book)
│   ├── open-library.ts → searchBook (fetches cover + pages)
│   └── "Already finished" checkbox → opens FinishBookDialog
│
├── LogSessionDrawer.tsx (dialog to log a reading session)
│   ├── Book selector (shows reading + finished books)
│   ├── Intensity picker (light / moderate / intense)
│   └── Date picker (auto-fills from heatmap tile click)
│
├── FinishBookDialog.tsx (dialog when finishing a book)
│   ├── Month selector
│   ├── "How I liked it in a line" text area
│   └── Memorable quotes text area (merges with existing)
│
└── Screenshot Dialog (inline in BookMap.tsx)
    ├── ReadingHeatmap (read-only copy)
    └── Latest reads list with covers + finish notes

BookDetail.tsx (separate page at /bookmap/book/:id)
├── useBookMap.ts (same hook, shared data)
├── Editable finish note (pencil icon)
├── Editable quotes (+ icon to add)
├── Log session button → LogSessionDrawer
└── DNF button → DnfDialog
```

### Data flow — a typical session

```
You drag slider to page 120
  → BookCard calls onUpdatePage(bookId, 120)
    → useBookMap.updateCurrentPage updates localStorage
      → BookCard re-renders with new position
        → Quote prompt appears: "anything memorable?"

You type a quote and hit save
  → BookCard calls onAddQuote(bookId, "the quote")
    → useBookMap.addQuote pushes to book.memorableQuotes[]
      → localStorage updates

You drag slider to 100%
  → BookCard calls onFinish(bookId)
    → BookMap opens FinishBookDialog
      → You fill in note + more quotes
        → useBookMap.finishBook merges new quotes with existing ones
          → Book status → "finished", heatmap + library update
```

### Where data lives

- **Bookmap data**: `localStorage` key `bookmap_v1` — array of Book objects with sessions, quotes, notes
- **Bookshelf data**: `src/data/books.ts` — static array, edit directly in code
- **These are separate** — bookmap and bookshelf don't share data

---

## How to add a book to the bookshelf

1. Go to `src/data/books.ts` on GitHub
2. Click the pencil icon to edit
3. Add a new line in this format:
```
{ title: "Book Title", author: "Author Name", review: "your one-liner" },
```
Add `isFavorite: true` before the `}` to highlight it in red.

4. Click **"Commit changes"** — site updates in ~2 minutes.

## How to run locally
Make sure Node.js is installed, then open Terminal and run:
```bash
cd ~/Desktop/claude-projects/divyanaras-website
source ~/.nvm/nvm.sh && npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to push changes to GitHub
After making changes locally:
```bash
git add .
git commit -m "describe what you changed"
git push
```

## Tech stack
- **React** — JavaScript framework
- **Vite** — builds and runs the project locally
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components (dialogs, buttons, sliders, selects)
- **framer-motion** — animations
- **date-fns** — date formatting
- **next-themes** — light/dark mode toggle
- **Open Library API** — book cover and page count lookup
- **localStorage** — bookmap data persistence
- **GitHub Pages** — hosting

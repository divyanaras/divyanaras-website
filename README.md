# divyanaras.com

My personal website — built with React, Vite, and Tailwind CSS. Hosted on GitHub Pages at [divyanaras.com](https://divyanaras.com).

## What's on the site
- **Home** — short bio and links to Substack, X, LinkedIn, and cal.com
- **Bookshelf** — books I've read with one-liner reviews. Favorites highlighted in red.
- **Work** — my work and projects

## How to add a book
1. Go to `src/data/books.ts` on GitHub
2. Click the pencil ✏️ icon to edit
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
- **next-themes** — light/dark mode toggle
- **framer-motion** — animations
- **GitHub Pages** — hosting


export interface Book {
  title: string;
  author: string;
  review: string;
  isFavorite?: boolean;
}

// ─────────────────────────────────────────────
// YOUR BOOKSHELF
// To add a book, copy any line below and paste
// it at the top or bottom of the list.
// Set isFavorite: true to highlight it in red.
// ─────────────────────────────────────────────

export const books: Book[] = [
  { title: "Molecule of More", author: "Daniel Lieberman", review: "neuroscience, a friendly layman read", isFavorite: true },
  { title: "Art of Laziness", author: "Library Mindset", review: "quick skim, nothing new" },
  { title: "Bastard of Istanbul", author: "Elif Shafak", review: "extremely rich in writing, a little redundant with her other ones" },
  { title: "Dune", author: "Frank Herbert", review: "classic, descriptive" },
  { title: "A Little Life", author: "Hanya Yanagihara", review: "internet is right sometimes, worth the tears", isFavorite: true },
  { title: "Who Moved My Cheese", author: "Spencer Johnson", review: "shortest, most impactful entrepreneurial piece" },
  { title: "Brave New World", author: "Aldous Huxley", review: "truly scary and inspiring, like 1984", isFavorite: true },
  { title: "Orbital", author: "Samantha Harvey", review: "takes you on a real life space orbital", isFavorite: true },
  { title: "On Earth We're Briefly Gorgeous", author: "Ocean Vuong", review: "emotional, poetic, a little too much" },
  { title: "Good Material", author: "Dolly Alderton", review: "funny, new age, great writing" },
  { title: "White Nights", author: "Dostoevsky", review: "makes me rethink reading classics now" },
  { title: "Three-Body Problem", author: "Cixin Liu", review: "sci-fi, THE BEST BOOK SERIES OF MY LIFE", isFavorite: true },
  { title: "The Dark Forest", author: "Cixin Liu", review: "novel concepts, the reason why this series is the greatest", isFavorite: true },
  { title: "Death's End", author: "Cixin Liu", review: "can be a bit of a drag, ends great no notes", isFavorite: true },
  { title: "Deep Work", author: "Cal Newport", review: "how did I not read this earlier" },
  { title: "The Redemption of Time", author: "Baoshu", review: "save yourselves from this misery" },
  { title: "Calculating God", author: "Robert J. Sawyer", review: "deals with a loaded question, introspectable" },
  { title: "The Elephant Vanishes", author: "Murakami", review: "loved 2 short stories, hated the rest" },
  { title: "Never Logged Out", author: "Ria Chopra", review: "a nice little rabbit hole" },
  { title: "Foundation Series", author: "Isaac Asimov", review: "decent sci-fi" },
  { title: "1984", author: "George Orwell", review: "classic, pulls you in on a cynical ride" },
  { title: "Days at the Morisaki Bookshop (2 books)", author: "Satoshi Yagisawa", review: "a really good slump read" },
  { title: "1Q84", author: "Haruki Murakami", review: "Murakami's best work imo, gripping and plot intense", isFavorite: true },
  { title: "Metamorphosis", author: "Franz Kafka", review: "when you feel existential and poetic all at the same time" },
  { title: "Architect's Apprentice", author: "Elif Shafak", review: "rich, exquisite, makes us realise the power of imagination" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", review: "book that has taught me the most in my life", isFavorite: true },
  { title: "Midnight Library", author: "Matt Haig", review: "really fun, philosophical" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", review: "how lukewarm can be a poison and you've got to fight against it" },
  { title: "Harry Potter Series (all 7 books)", author: "J.K. Rowling", review: "takes back to childhood, evergreen" },
  { title: "A Man Called Ove", author: "Fredrik Backman", review: "mellow read, won't vouch much" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", review: "post American civil war, innocent read" },
  { title: "The Book Thief", author: "Markus Zusak", review: "can never get bored of the reread, historical fiction at its peak" },
  { title: "Norwegian Wood", author: "Haruki Murakami", review: "covers themes of loneliness well" },
  { title: "Acts of God", author: "Kanan Gill", review: "satirical take on the world of science, pretentious yet funny" },
  { title: "Five People You Meet in Heaven", author: "Mitch Albom", review: "philosophical, one time read" },
  { title: "Kafka on the Shore", author: "Haruki Murakami", review: "can do it once, not more" },
  { title: "Yellowface", author: "R.F. Kuang", review: "fast read, plot might bore" },
  { title: "All the Light We Cannot See", author: "Anthony Doerr", review: "enticing and rich in writing, emotional" },
  { title: "Digital Fortress", author: "Dan Brown", review: "what got me into reading, owe this one" },
  { title: "Alchemist", author: "Paulo Coelho", review: "disappoints, too philosophical" },
  { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", review: "mythological fiction, plays the perspective game well" },
  { title: "Independence", author: "Chitra Banerjee Divakaruni", review: "very intense Indian historical fiction, must-read" },
  { title: "The Da Vinci Code", author: "Dan Brown", review: "goated book, the author peaked here", isFavorite: true },
  { title: "Angels and Demons", author: "Dan Brown", review: "talking about it would make me wanna re-read" },
  { title: "The Girl on the Train", author: "Paula Hawkins", review: "fun, slow read" },
];

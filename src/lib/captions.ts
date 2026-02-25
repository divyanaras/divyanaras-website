// Witty auto-generated captions for finished books and heatmap exports.
// Template system with personality — {title}, {author}, {pages}, {sessions}, {days}.

interface CaptionData {
  title: string;
  author: string;
  pages: number;
  sessions: number;
  days: number;
}

const FINISH_TEMPLATES = [
  "survived {pages} pages of {author}. send help.",
  "finished {title} in {sessions} sessions. no regrets.",
  "{pages} pages. {sessions} sessions. {title} is done. next.",
  "just put down {title} after {days} days. the vibes were immaculate.",
  "reading {title} in {days} days is a flex and i know it.",
  "{pages} pages of {author} and i'm still thinking about it.",
  "{title} — {pages} pages, {sessions} sessions, zero regrets.",
  "{author} really said 'here's {pages} pages' and i said 'bet.'",
];

const HEATMAP_TEMPLATES = [
  "reading is cheaper than therapy.",
  "my heatmap is my personality.",
  "pages > screen time.",
  "this is what consistency looks like.",
  "tracked every session. yes, i'm that person.",
  "books read. pages logged. no regrets.",
];

function fill(template: string, data: CaptionData): string {
  return template
    .replace(/\{title\}/g, data.title)
    .replace(/\{author\}/g, data.author)
    .replace(/\{pages\}/g, String(data.pages))
    .replace(/\{sessions\}/g, String(data.sessions))
    .replace(/\{days\}/g, String(data.days));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFinishCaption(data: CaptionData): string {
  return fill(pick(FINISH_TEMPLATES), data);
}

export function generateHeatmapCaption(): string {
  return pick(HEATMAP_TEMPLATES);
}

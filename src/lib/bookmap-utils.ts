import {
  format,
  subDays,
  differenceInDays,
  differenceInWeeks,
  addDays,
  startOfWeek,
  parseISO,
  isAfter,
  isBefore,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
} from "date-fns";
import type { Book, ReadingSession } from "@/hooks/useBookMap";

// --- Heatmap ---

export interface HeatmapDay {
  date: string; // "YYYY-MM-DD"
  pages: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity for coloring
}

export function buildHeatmapData(books: Book[], year: number): HeatmapDay[] {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 0, 1));
  const today = new Date();
  const endDate = isBefore(end, today) ? end : today;

  // Aggregate intensity per day across all books
  const intensityByDate: Record<string, number> = {};
  for (const book of books) {
    for (const session of book.sessions) {
      const sessionIntensity = session.intensity || 2; // default moderate for legacy sessions
      intensityByDate[session.date] = (intensityByDate[session.date] || 0) + sessionIntensity;
    }
  }

  // Build day array — level mapping: 1→L1, 2→L2, 3→L3, 4+→L4
  const days = eachDayOfInterval({ start, end: endDate });
  return days.map((d) => {
    const dateStr = format(d, "yyyy-MM-dd");
    const intensity = intensityByDate[dateStr] || 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (intensity >= 4) level = 4;
    else if (intensity === 3) level = 3;
    else if (intensity === 2) level = 2;
    else if (intensity >= 1) level = 1;
    return { date: dateStr, pages: intensity, level };
  });
}

// Group heatmap data into weeks (columns) for CSS grid
export function groupByWeek(days: HeatmapDay[]): HeatmapDay[][] {
  if (days.length === 0) return [];
  const weeks: HeatmapDay[][] = [];
  let currentWeek: HeatmapDay[] = [];

  // Pad the first week with empty days
  const firstDay = parseISO(days[0].date);
  const weekStart = startOfWeek(firstDay, { weekStartsOn: 0 }); // Sunday
  const padDays = differenceInDays(firstDay, weekStart);
  for (let i = 0; i < padDays; i++) {
    currentWeek.push({ date: "", pages: 0, level: 0 });
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}

// --- Quick Stats ---

export interface QuickStats {
  booksThisYear: number;
  pagesPerWeek: number;
  currentStreak: number; // consecutive days with reading
  avgPagesPerSession: number;
}

export function calculateQuickStats(books: Book[], year: number): QuickStats {
  const yearStr = String(year);

  // Books finished this year
  const booksThisYear = books.filter(
    (b) => b.status === "finished" && b.finishDate?.startsWith(yearStr)
  ).length;

  // All sessions this year
  const yearSessions = books.flatMap((b) =>
    b.sessions.filter((s) => s.date.startsWith(yearStr))
  );

  // Pages per week
  const now = new Date();
  const yearStart = startOfYear(new Date(year, 0, 1));
  const weeksElapsed = Math.max(1, differenceInWeeks(now, yearStart) || 1);
  const totalPages = yearSessions.reduce((sum, s) => sum + s.pagesRead, 0);
  const pagesPerWeek = Math.round(totalPages / weeksElapsed);

  // Average pages per session
  const avgPagesPerSession =
    yearSessions.length > 0
      ? Math.round(totalPages / yearSessions.length)
      : 0;

  // Current streak
  const currentStreak = calculateStreak(books);

  return { booksThisYear, pagesPerWeek, currentStreak, avgPagesPerSession };
}

function calculateStreak(books: Book[]): number {
  const sessionDates = new Set<string>();
  for (const book of books) {
    for (const session of book.sessions) {
      sessionDates.add(session.date);
    }
  }

  let streak = 0;
  let day = new Date();
  // Check today first; if not today, start from yesterday
  const todayStr = format(day, "yyyy-MM-dd");
  if (!sessionDates.has(todayStr)) {
    day = subDays(day, 1);
  }

  while (sessionDates.has(format(day, "yyyy-MM-dd"))) {
    streak++;
    day = subDays(day, 1);
  }
  return streak;
}

// --- Welcome Back ---

export function getDaysSinceLastSession(books: Book[]): number | null {
  const allSessions = books.flatMap((b) => b.sessions);
  if (allSessions.length === 0) return null;

  const dates = allSessions.map((s) => parseISO(s.date));
  const latest = dates.reduce((a, b) => (isAfter(a, b) ? a : b));
  return differenceInDays(new Date(), latest);
}

export function getLastReadBook(books: Book[]): Book | null {
  const reading = books.filter((b) => b.status === "reading" && b.sessions.length > 0);
  if (reading.length === 0) return null;

  return reading.reduce((latest, book) => {
    const lastSession = book.sessions[book.sessions.length - 1];
    const latestSession = latest.sessions[latest.sessions.length - 1];
    return lastSession.date > latestSession.date ? book : latest;
  });
}

// --- Pace Math (for BookDetail) ---

export interface PaceStats {
  avgPagesPerSession: number;
  totalSessions: number;
  pagesRemaining: number;
  sessionsRemaining: number;
  estimatedFinishDate: string | null; // "YYYY-MM-DD"
  avgDaysBetweenSessions: number;
}

export function calculatePaceStats(book: Book): PaceStats {
  const { sessions, currentPage, totalPages } = book;
  const totalSessions = sessions.length;
  const totalPagesRead = sessions.reduce((sum, s) => sum + s.pagesRead, 0);
  const avgPagesPerSession = totalSessions > 0 ? Math.round(totalPagesRead / totalSessions) : 0;
  const pagesRemaining = Math.max(0, totalPages - currentPage);
  const sessionsRemaining = avgPagesPerSession > 0 ? Math.ceil(pagesRemaining / avgPagesPerSession) : 0;

  // Average gap between sessions
  let avgDaysBetweenSessions = 0;
  if (totalSessions >= 2) {
    const sortedDates = sessions.map((s) => parseISO(s.date)).sort((a, b) => a.getTime() - b.getTime());
    let totalGap = 0;
    for (let i = 1; i < sortedDates.length; i++) {
      totalGap += differenceInDays(sortedDates[i], sortedDates[i - 1]);
    }
    avgDaysBetweenSessions = Math.round(totalGap / (sortedDates.length - 1));
  }

  // Estimated finish date
  let estimatedFinishDate: string | null = null;
  if (sessionsRemaining > 0 && avgDaysBetweenSessions > 0) {
    const daysLeft = sessionsRemaining * avgDaysBetweenSessions;
    estimatedFinishDate = format(addDays(new Date(), daysLeft), "yyyy-MM-dd");
  }

  return {
    avgPagesPerSession,
    totalSessions,
    pagesRemaining,
    sessionsRemaining,
    estimatedFinishDate,
    avgDaysBetweenSessions,
  };
}

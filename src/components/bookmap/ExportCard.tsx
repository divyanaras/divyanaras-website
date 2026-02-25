import { useMemo } from "react";
import { parseISO } from "date-fns";
import { buildHeatmapData, groupByWeek } from "@/lib/bookmap-utils";
import { generateHeatmapCaption } from "@/lib/captions";
import type { Book } from "@/hooks/useBookMap";

// Bright amber/orange palette
const LEVEL_COLORS_DARK: Record<number, string> = {
  0: "#2a2520",
  1: "#d4a01799",
  2: "#f59e0b",
  3: "#f59e0b",
  4: "#f97316",
};

const LEVEL_COLORS_LIGHT: Record<number, string> = {
  0: "#e8e0d8",
  1: "#fcd34d99",
  2: "#fbbf24",
  3: "#f59e0b",
  4: "#f97316",
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface ExportCardProps {
  books: Book[];
  year: number;
  squareRef: React.RefObject<HTMLDivElement | null>;
  storyRef: React.RefObject<HTMLDivElement | null>;
  inline?: boolean;
  lightMode?: boolean;
}

function lastSessionDate(book: Book): string {
  if (book.sessions.length === 0) return book.finishDate || book.startDate;
  return book.sessions[book.sessions.length - 1].date;
}

function titleColor(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
  const hues = [25, 30, 35, 40, 20, 15];
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue}, 45%, 28%)`;
}

export function ExportCard({ books, year, squareRef, storyRef, inline, lightMode }: ExportCardProps) {
  const isLight = !!lightMode;
  const colors = isLight ? LEVEL_COLORS_LIGHT : LEVEL_COLORS_DARK;

  const t = isLight
    ? { bg: "linear-gradient(155deg, #faf6f1 0%, #f0ebe4 50%, #faf6f1 100%)", text: "#1a1512", sub: "#6a6058", muted: "#8a7e72", faint: "#b8b0a4", cardBg: "rgba(184,134,11,0.06)", cardBorder: "rgba(184,134,11,0.15)", barBg: "#d8d0c8", barFill: "#f59e0b" }
    : { bg: "linear-gradient(155deg, #1a1512 0%, #231e19 50%, #1a1512 100%)", text: "#e8ddd0", sub: "#8a7e72", muted: "#6a6058", faint: "#4a4440", cardBg: "rgba(184,134,11,0.04)", cardBorder: "rgba(184,134,11,0.15)", barBg: "#2a2520", barFill: "#f59e0b" };

  const { weeks, monthPositions } = useMemo(() => {
    const days = buildHeatmapData(books, year);
    const weeks = groupByWeek(days);
    const monthPositions: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      for (const day of week) {
        if (!day.date) continue;
        const month = parseISO(day.date).getMonth();
        if (month !== lastMonth) {
          monthPositions.push({ label: MONTH_LABELS[month], col: weekIndex });
          lastMonth = month;
        }
        break;
      }
    });
    return { weeks, monthPositions };
  }, [books, year]);

  const caption = useMemo(() => generateHeatmapCaption(), []);

  const recentBooks = useMemo(
    () => books
      .filter((b) => b.status === "finished" || b.status === "reading")
      .sort((a, b) => lastSessionDate(b).localeCompare(lastSessionDate(a)))
      .slice(0, 3),
    [books]
  );

  // Cover placeholder
  const coverPlaceholder = (b: Book, w: number, h: number) => (
    <div style={{
      width: w, height: h, borderRadius: 4, background: titleColor(b.title),
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, padding: 3, overflow: "hidden",
    }}>
      <span style={{
        fontSize: Math.min(8, w * 0.2), color: "#e8ddd0", fontWeight: 600,
        lineHeight: 1.2, textAlign: "center", wordBreak: "break-word",
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {b.title}
      </span>
    </div>
  );

  // Progress bar for export
  const progressBar = (b: Book) => {
    const hasPages = b.totalPages > 0;
    const pct = b.status === "finished" ? 100 : hasPages ? (b.currentPage / b.totalPages) * 100 : b.currentPage;
    return (
      <div style={{ marginTop: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 7, color: t.sub }}>
            {hasPages ? `p. ${b.currentPage} of ${b.totalPages}` : `${Math.round(pct)}% done`}
          </span>
          <span style={{ fontSize: 7, color: t.sub }}>{Math.round(pct)}%</span>
        </div>
        <div style={{ width: "100%", height: 3, background: t.barBg, borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: "100%", borderRadius: 2,
            background: b.status === "finished" ? "#22c55e" : t.barFill,
          }} />
        </div>
      </div>
    );
  };

  // Book card with progress bar and finish note
  const bookCard = (b: Book, compact?: boolean) => (
    <div key={b.id} style={{ marginBottom: compact ? 10 : 14 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        {b.coverUrl ? (
          <img src={b.coverUrl} alt={b.title} style={{ width: compact ? 32 : 36, height: compact ? 46 : 52, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
        ) : coverPlaceholder(b, compact ? 32 : 36, compact ? 46 : 52)}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: compact ? 10 : 11, fontWeight: 600, lineHeight: 1.3, color: t.text }}>{b.title}</div>
          <div style={{ fontSize: compact ? 8 : 9, color: t.sub, marginTop: 1 }}>{b.author}</div>
          {b.status === "reading" && (
            <div style={{ fontSize: 7, color: "#f59e0b", marginTop: 2, fontWeight: 500 }}>reading now</div>
          )}
          {progressBar(b)}
        </div>
      </div>
      {b.finishNote && (
        <div style={{
          marginTop: 5, padding: "4px 7px",
          border: `1px solid ${t.cardBorder}`, borderRadius: 5, background: t.cardBg,
        }}>
          <div style={{ fontSize: 6, color: t.sub, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 1 }}>how I liked it in a line</div>
          <div style={{ fontSize: compact ? 8 : 9, color: isLight ? "#4a4440" : "#c4b8a8", lineHeight: 1.4 }}>{b.finishNote}</div>
        </div>
      )}
    </div>
  );

  // --- Heatmap builder (no legend) ---
  const buildHeatmap = (cellSz: number, gapSz: number) => (
    <div>
      {/* Month labels */}
      <div style={{ display: "flex", gap: gapSz, marginBottom: 2 }}>
        {weeks.map((_, wi) => {
          const ml = monthPositions.find((m) => m.col === wi);
          return (
            <div key={wi} style={{ width: cellSz, flexShrink: 0 }}>
              {ml && <span style={{ fontSize: Math.max(6, cellSz * 0.6), color: t.sub, fontWeight: 500 }}>{ml.label}</span>}
            </div>
          );
        })}
      </div>
      {/* Grid */}
      <div style={{ display: "flex", gap: gapSz }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: gapSz }}>
            {week.map((day, di) => (
              <div key={`${wi}-${di}`} style={{
                width: cellSz, height: cellSz, borderRadius: Math.max(1, cellSz * 0.15),
                backgroundColor: day.date ? colors[day.level] : "transparent",
              }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // --- Single stacked layout: heatmap on top, books below ---
  const buildStackedLayout = (w: number, h: number) => {
    const pad = 28;
    const isStory = h > w; // 9:16
    const booksToShow = recentBooks.slice(0, isStory ? 3 : 2);
    const availW = w - pad * 2;
    const numWeeks = weeks.length || 1;
    const gap = 2;
    const cell = Math.floor((availW - (numWeeks - 1) * gap) / numWeeks);
    return (
      <div style={{ ...baseStyle(w, h), padding: pad }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>bookmap</div>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 500 }}>{year}</div>
        </div>
        {buildHeatmap(cell, gap)}
        {booksToShow.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 7, color: t.sub, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10, fontWeight: 500 }}>
              recent reads
            </div>
            {booksToShow.map((b) => bookCard(b, true))}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 14 }}>
          <div style={{ fontSize: 9, color: t.muted, fontStyle: "italic" }}>{caption}</div>
          <div style={{ fontSize: 7, color: t.faint }}>bookmap</div>
        </div>
      </div>
    );
  };

  // Base style with EXACT dimensions — no whitespace
  const baseStyle = (w: number, h: number): React.CSSProperties => ({
    background: t.bg,
    width: w,
    height: h,
    display: "flex",
    flexDirection: "column",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
    color: t.text,
    overflow: "hidden",
  });

  // Exact aspect ratio dimensions
  const SQ_W = 1080, SQ_H = 1080;
  const ST_W = 1080, ST_H = 1920;

  if (inline) {
    return (
      <div className="w-full">
        {/* Scaled-down preview of the 1:1 card */}
        <div className="export-preview-wrapper" style={{ width: "100%", position: "relative", paddingBottom: "100%", overflow: "hidden", borderRadius: 8 }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: SQ_W, height: SQ_H,
          }} className="export-inline-preview">
            {buildStackedLayout(SQ_W, SQ_H)}
          </div>
        </div>
        {/* Hidden full-res for screenshot */}
        <div className="fixed left-[-9999px] top-0">
          <div ref={squareRef}>{buildStackedLayout(SQ_W, SQ_H)}</div>
          <div ref={storyRef}>{buildStackedLayout(ST_W, ST_H)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-[-9999px] top-0">
      <div ref={squareRef}>{buildStackedLayout(SQ_W, SQ_H)}</div>
      <div ref={storyRef}>{buildStackedLayout(ST_W, ST_H)}</div>
    </div>
  );
}

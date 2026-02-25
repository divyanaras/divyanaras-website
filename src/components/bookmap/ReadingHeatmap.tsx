import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { buildHeatmapData, groupByWeek } from "@/lib/bookmap-utils";
import type { Book } from "@/hooks/useBookMap";
import { cn } from "@/lib/utils";

const LEVEL_COLORS = {
  0: "bg-muted/40",
  1: "bg-amber-300/60",
  2: "bg-amber-400",
  3: "bg-amber-500",
  4: "bg-orange-500",
} as const;

const INTENSITY_LABELS: Record<number, string> = {
  1: "light",
  2: "moderate",
  3: "intense",
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface ReadingHeatmapProps {
  books: Book[];
  year: number;
  onDateSelect?: (date: string) => void;
}

export function ReadingHeatmap({ books, year, onDateSelect }: ReadingHeatmapProps) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { weeks, monthPositions } = useMemo(() => {
    const days = buildHeatmapData(books, year);
    const weeks = groupByWeek(days);

    // Calculate month label positions
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

  // Get sessions for a specific date
  const sessionsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const results: { bookTitle: string; intensity: string }[] = [];
    for (const book of books) {
      for (const session of book.sessions) {
        if (session.date === selectedDate) {
          results.push({
            bookTitle: book.title,
            intensity: INTENSITY_LABELS[session.intensity || 2] || "moderate",
          });
        }
      }
    }
    return results;
  }, [selectedDate, books]);

  const handleCellClick = (date: string | null) => {
    if (!date) return;
    const newDate = selectedDate === date ? null : date;
    setSelectedDate(newDate);
    if (newDate) onDateSelect?.(newDate);
  };

  if (weeks.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-muted-foreground text-sm">no reading data for {year} yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Month labels */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex flex-col gap-1" style={{ minWidth: "max-content" }}>
          {/* Month row */}
          <div className="flex gap-[4px] ml-8 mb-1">
            {weeks.map((_, weekIndex) => {
              const monthLabel = monthPositions.find((m) => m.col === weekIndex);
              return (
                <div key={weekIndex} className="w-[16px]">
                  {monthLabel && (
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {monthLabel.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid: day labels + cells */}
          <div className="flex gap-0">
            {/* Day labels column */}
            <div className="flex flex-col gap-[4px] mr-1 w-7">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="h-[16px] flex items-center justify-end">
                  <span className="text-[10px] text-muted-foreground leading-none">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Heatmap columns (weeks) */}
            <div className="flex gap-[4px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[4px]">
                  {week.map((day, dayIndex) => {
                    const isToday = day.date === todayStr;
                    const isSelected = day.date === selectedDate;
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        onClick={() => handleCellClick(day.date)}
                        className={cn(
                          "w-[16px] h-[16px] rounded-sm transition-colors",
                          day.date ? LEVEL_COLORS[day.level] : "bg-transparent",
                          day.date && "cursor-pointer hover:ring-1 hover:ring-foreground/30",
                          isToday && "ring-1 ring-amber-400/60 animate-pulse",
                          isSelected && "ring-2 ring-foreground/60"
                        )}
                        title={
                          day.date
                            ? `${format(parseISO(day.date), "MMM d, yyyy")}: intensity ${day.pages}`
                            : ""
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Day sessions popover */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 border border-border rounded-lg p-3 bg-background"
          >
            <p className="text-xs font-medium text-foreground mb-2">
              {format(parseISO(selectedDate), "EEEE, MMM d, yyyy")}
            </p>
            {sessionsForDate.length === 0 ? (
              <p className="text-xs text-muted-foreground">no sessions</p>
            ) : (
              <div className="space-y-1.5">
                {sessionsForDate.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-foreground truncate mr-2">{s.bookTitle}</span>
                    <span className="text-muted-foreground flex-shrink-0">{s.intensity}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

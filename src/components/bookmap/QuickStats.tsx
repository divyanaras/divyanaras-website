import { useMemo } from "react";
import { motion } from "framer-motion";
import { calculateQuickStats } from "@/lib/bookmap-utils";
import type { Book } from "@/hooks/useBookMap";

interface QuickStatsProps {
  books: Book[];
  year: number;
}

export function QuickStats({ books, year }: QuickStatsProps) {
  const stats = useMemo(() => calculateQuickStats(books, year), [books, year]);

  const items = [
    { label: "books/year", value: stats.booksThisYear },
    { label: "pages/week", value: stats.pagesPerWeek },
    { label: "streak", value: `${stats.currentStreak}d` },
    { label: "avg/session", value: `${stats.avgPagesPerSession}p` },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="border border-border rounded-lg p-3 text-center bg-muted/20"
        >
          <p className="text-2xl font-bold text-foreground tracking-tight">{item.value}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

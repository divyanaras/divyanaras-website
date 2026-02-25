import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Book } from "@/hooks/useBookMap";

interface LogSessionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  books: Book[];
  onLog: (bookId: string, pagesRead: number, date?: string, intensity?: 1 | 2 | 3) => void;
  preselectedBookId?: string;
  preselectedDate?: string;
}

const INTENSITIES: { value: 1 | 2 | 3; label: string; description: string }[] = [
  { value: 1, label: "light", description: "skimming or a few pages" },
  { value: 2, label: "moderate", description: "a solid session" },
  { value: 3, label: "intense", description: "deep focus, couldn't stop" },
];

export function LogSessionDrawer({
  open,
  onOpenChange,
  books,
  onLog,
  preselectedBookId,
  preselectedDate,
}: LogSessionDrawerProps) {
  const [selectedBookId, setSelectedBookId] = useState(preselectedBookId || "");
  const [date, setDate] = useState(preselectedDate || format(new Date(), "yyyy-MM-dd"));
  const [intensity, setIntensity] = useState<1 | 2 | 3>(2);

  // Sync preselected values when dialog opens
  useEffect(() => {
    if (open) {
      if (preselectedBookId) setSelectedBookId(preselectedBookId);
      setDate(preselectedDate || format(new Date(), "yyyy-MM-dd"));
    }
  }, [open, preselectedBookId, preselectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookId) return;
    onLog(selectedBookId, 0, date, intensity);
    setIntensity(2);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">log a session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Book selector */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">book</Label>
            <Select value={selectedBookId} onValueChange={setSelectedBookId}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="select a book" />
              </SelectTrigger>
              <SelectContent>
                {books.map((book) => (
                  <SelectItem key={book.id} value={book.id}>
                    {book.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intensity */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">intensity</Label>
            <div className="flex gap-2">
              {INTENSITIES.map((i) => (
                <button
                  key={i.value}
                  type="button"
                  onClick={() => setIntensity(i.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    intensity === i.value
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                  }`}
                >
                  <div>{i.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{i.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-background"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedBookId}
          >
            log session
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface FinishBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookTitle: string;
  onFinish: (note?: string, quotes?: string[], finishMonth?: string) => void;
}

export function FinishBookDialog({
  open,
  onOpenChange,
  bookTitle,
  onFinish,
}: FinishBookDialogProps) {
  const currentMonth = MONTHS[new Date().getMonth()];
  const [note, setNote] = useState("");
  const [quotesText, setQuotesText] = useState("");
  const [finishMonth, setFinishMonth] = useState(currentMonth);

  const handleFinish = () => {
    const quotes = quotesText
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);
    onFinish(
      note.trim() || undefined,
      quotes.length > 0 ? quotes : undefined,
      finishMonth
    );
    setNote("");
    setQuotesText("");
    setFinishMonth(currentMonth);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">you finished it.</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            nice work on <span className="font-semibold text-foreground">{bookTitle}</span>.
            anything you want to remember about this one?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {/* Month selector */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">month finished</Label>
            <Select value={finishMonth} onValueChange={setFinishMonth}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              how I liked it in a line <span className="text-muted-foreground/60">(optional)</span>
            </Label>
            <Textarea
              placeholder="one line — what did you think?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-background resize-none"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              memorable quotes <span className="text-muted-foreground/60">(optional)</span>
            </Label>
            <Textarea
              placeholder="one quote per line. the lines that stopped you."
              value={quotesText}
              onChange={(e) => setQuotesText(e.target.value)}
              className="bg-background resize-none"
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              cancel
            </Button>
            <Button className="flex-1" onClick={handleFinish}>
              mark as finished
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

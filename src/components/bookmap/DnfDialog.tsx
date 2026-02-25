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

interface DnfDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookTitle: string;
  onDnf: (reason?: string) => void;
}

export function DnfDialog({
  open,
  onOpenChange,
  bookTitle,
  onDnf,
}: DnfDialogProps) {
  const [reason, setReason] = useState("");

  const handleDnf = () => {
    onDnf(reason.trim() || undefined);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">putting it down.</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            no shame in it. not every book is for every time.
            why are you stopping <span className="font-semibold text-foreground">{bookTitle}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              reason <span className="text-muted-foreground/60">(optional)</span>
            </Label>
            <Textarea
              placeholder="lost interest, wrong time, too dense..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-background resize-none"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              keep reading
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDnf}>
              put it down
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

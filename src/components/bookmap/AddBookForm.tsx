import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { searchBook } from "@/lib/open-library";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  totalPages: z.coerce.number().optional(),
  coverUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type BookFormData = z.infer<typeof bookSchema>;

interface AddBookFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; author: string; totalPages: number; coverUrl?: string }) => { id: string } | void;
  onFinishImmediately?: (bookId: string) => void;
}

export function AddBookForm({ open, onOpenChange, onSubmit, onFinishImmediately }: AddBookFormProps) {
  const [fetching, setFetching] = useState(false);
  const [alreadyFinished, setAlreadyFinished] = useState(false);
  const [fetchStatus, setFetchStatus] = useState<"idle" | "found" | "not-found">("idle");
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [showManualFields, setShowManualFields] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: { title: "", author: "", totalPages: undefined, coverUrl: "" },
  });

  const handleFetch = async () => {
    const title = getValues("title");
    const author = getValues("author");
    if (!title) return;

    setFetching(true);
    setFetchStatus("idle");
    setPreviewCover(null);

    try {
      const result = await searchBook(title, author || undefined);
      if (result) {
        if (result.coverUrl) {
          setValue("coverUrl", result.coverUrl);
          setPreviewCover(result.coverUrl);
        }
        if (result.totalPages) {
          setValue("totalPages", result.totalPages);
        }
        setFetchStatus("found");
      } else {
        setFetchStatus("not-found");
        setShowManualFields(true);
      }
    } catch {
      setFetchStatus("not-found");
      setShowManualFields(true);
    } finally {
      setFetching(false);
    }
  };

  const onFormSubmit = (data: BookFormData) => {
    const result = onSubmit({
      title: data.title,
      author: data.author,
      totalPages: data.totalPages || 0,
      coverUrl: data.coverUrl || undefined,
    });
    if (alreadyFinished && result?.id) {
      onFinishImmediately?.(result.id);
    }
    reset();
    setPreviewCover(null);
    setFetchStatus("idle");
    setAlreadyFinished(false);
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setPreviewCover(null);
      setFetchStatus("idle");
      setShowManualFields(false);
      setAlreadyFinished(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">add a book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit, () => setShowManualFields(true))} className="space-y-4 mt-2">
          {/* Cover preview */}
          {previewCover && (
            <div className="flex justify-center">
              <img
                src={previewCover}
                alt="Cover preview"
                className="w-20 h-28 rounded-lg object-cover shadow-md"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm text-muted-foreground">
              title
            </Label>
            <Input
              id="title"
              placeholder="The Great Gatsby"
              {...register("title")}
              className="bg-background"
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm text-muted-foreground">
              author
            </Label>
            <div className="flex gap-2">
              <Input
                id="author"
                placeholder="F. Scott Fitzgerald"
                {...register("author")}
                className="bg-background flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFetch}
                disabled={fetching}
                className="shrink-0"
              >
                {fetching ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Search size={14} />
                )}
                <span className="ml-1">{fetching ? "searching..." : "fetch"}</span>
              </Button>
            </div>
            {errors.author && (
              <p className="text-xs text-destructive">{errors.author.message}</p>
            )}
            {fetchStatus === "not-found" && (
              <p className="text-xs text-muted-foreground">couldn't find it. fill in manually.</p>
            )}
            {fetchStatus === "found" && (
              <p className="text-xs text-amber-600 dark:text-amber-400">found it — cover and pages filled in.</p>
            )}
          </div>

          {/* Only show pages field if fetch failed or user needs to fill manually */}
          {!showManualFields && fetchStatus === "idle" && (
            <p className="text-xs text-muted-foreground">tap fetch to auto-fill pages and cover.</p>
          )}
          {showManualFields && (
            <div className="space-y-2">
              <Label htmlFor="totalPages" className="text-sm text-muted-foreground">
                total pages <span className="text-muted-foreground/60">(optional)</span>
              </Label>
              <Input
                id="totalPages"
                type="number"
                placeholder="180"
                {...register("totalPages")}
                className="bg-background"
              />
              {errors.totalPages && (
                <p className="text-xs text-destructive">{errors.totalPages.message}</p>
              )}
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={alreadyFinished}
              onChange={(e) => setAlreadyFinished(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-muted-foreground">already finished this one</span>
          </label>

          <Button type="submit" className="w-full">
            {alreadyFinished ? "add & mark as finished" : "start reading"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

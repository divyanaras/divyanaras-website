import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { MAILTO_LETS_TALK } from "@/lib/mailto";
import iconHi from "@/assets/icons/hi.png";

interface FounderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FounderModal({ open, onOpenChange }: FounderModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[640px] max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-card text-foreground px-8 py-10 sm:px-12 sm:py-14 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={iconHi}
              alt=""
              draggable={false}
              className="die-cut w-20 h-20 md:w-24 md:h-24 object-contain shrink-0 -rotate-6"
            />
            <DialogPrimitive.Title className="text-xl md:text-2xl font-bold leading-tight">
              what i'm looking to work on
            </DialogPrimitive.Title>
          </div>

          <div className="h-px w-full bg-border mb-8" />

          <div className="space-y-5 text-[14px] leading-[1.75] text-foreground">
            <p>
              hello, here's my story: a product marketer with 3.5 years in cybersecurity, who quit
              her job at Zoho, to move to SF and to find the founders building the next layer of the
              internet.
            </p>
            <p>
              1/ I'm a product + growth person. looking to help founders in the cybersecurity space
              with GTM positioning, growth, branding, launch videos and demos. that's where my
              strengths lie but a huge believer of emergence when met with the right teams.
            </p>
            <p>
              2/ I love translating deep tech for a general audience. That's where my creativity
              actually lives. You can find my work in detail in{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-4 decoration-primary hover:opacity-75 transition-opacity duration-200"
              >
                this resume
              </a>
              .
            </p>
            <p>
              3/ I'm a US citizen and I'll be in SF next month. If you're building something
              interesting,{" "}
              <a
                href={MAILTO_LETS_TALK}
                className="font-semibold text-primary underline underline-offset-4 decoration-primary hover:opacity-75 transition-opacity duration-200"
              >
                let's talk
              </a>
              .
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

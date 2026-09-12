import { useEffect } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SideNav } from "@/components/SideNav";

const projects = [
  {
    title: "bookmap",
    tagline: "a reading heatmap for regular readers.",
    description: "GitHub-style commit graph for your reading, so you can see the habit instead of guessing at it.",
    stack: ["Vanilla JS", "Supabase"],
    youtube: "mJ1f6SDfSrE",
    links: [{ label: "open bookmap", href: "https://divyanaras.github.io/bookmap/" }],
  },
  {
    title: "writerscript",
    tagline: "bloat free, local audio editor for writers.",
    description: "A local, no-bloat audio editor for voicing articles — trim, merge, and clean up takes without the sound-mixing overhead.",
    stack: ["Python", "Flask", "Whisper"],
    youtube: "DUJ5A9Z9bac",
    links: [{ label: "if you want to clone this audio editor, here's the github repo", href: "https://github.com/divyanaras/writerscript" }],
  },
];

export default function VibecodeD() {
  useEffect(() => { document.title = "vibecoded projects — divya narasimhan"; }, []);

  return (
    <div className="min-h-screen relative">
      <GrainOverlay />
      <SideNav />

      <div className="ml-40 px-10 py-10 overflow-y-auto">
        <div className="page-transition flex flex-col h-full max-w-5xl">

          {/* Header */}
          <div className="mb-16 shrink-0">
            <h1 className="font-handwritten text-4xl md:text-5xl tracking-normal leading-none mb-6">
              vibecoded projects
            </h1>
            <p className="text-sm text-foreground leading-relaxed max-w-lg">
              projects i personally use and i'm passionate about. mostly vibecoded, making them better every day.
            </p>
          </div>

          {/* Projects — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {projects.map((p) => (
              <div key={p.title} className="flex flex-col min-h-0">
                {/* Video */}
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-sm shrink-0 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${p.youtube}`}
                    title={p.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Content below */}
                <h2 className="font-handwritten text-2xl tracking-normal leading-none mb-1">
                  {p.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-3">{p.tagline}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-3 line-clamp-4">
                  {p.description}
                </p>
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

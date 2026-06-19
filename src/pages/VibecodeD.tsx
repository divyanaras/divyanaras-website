import { useEffect } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SideNav } from "@/components/SideNav";

const projects = [
  {
    title: "bookmap",
    tagline: "a reading heatmap for regular readers.",
    description: "Reading is my favorite activity and I wanted to see my reading commit graphs regularly so that i dont beat myself up about it. An intuitive github-style heatmap for books with library and session logging — visualise your reading and what you liked about it. Built with vanilla JS and a Supabase backend.",
    youtube: "mJ1f6SDfSrE",
    links: [{ label: "open bookmap", href: "https://divyanaras.github.io/bookmap/" }],
  },
  {
    title: "writerscript",
    tagline: "bloat free, local audio editor for writers.",
    description: "I voice my substack articles a lot and found no alternative to the bulky heavy audio editors built for sound mixing. so i made my own. Flask-based local editor — upload m4a/mp3 takes, merge them, delete regions on a waveform, remove silences, enhance voice quality, align to script via Whisper, export as MP3. easy.",
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

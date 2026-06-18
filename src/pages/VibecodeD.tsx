import { Link } from "react-router-dom";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SideNav } from "@/components/SideNav";
import { motion } from "framer-motion";

const projects = [
  {
    title: "bookmap",
    desc: "a reading tracker that turns your books into a visual heatmap. log sessions, track moods, export a poster.",
    href: "/bookshelf",
    label: "open bookmap →",
  },
  {
    title: "writerscript",
    desc: "a tool that helps me structure and write long-form scripts before turning them into videos.",
    href: null,
    label: "coming soon",
  },
];

const videos: { title: string; thumb: string | null; href: string | null }[] = [];

const VibecodeD = () => (
  <div className="h-screen overflow-hidden relative">
    <GrainOverlay />
    <SideNav />

    <div className="ml-40 h-full flex flex-col px-10 py-10 overflow-y-auto">
      <div className="max-w-xl page-transition">
        <h1 className="text-2xl font-semibold text-foreground mb-6">projects</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          things I built, mostly with AI. tools I use daily, experiments, unfinished things worth sharing.
        </p>

        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">built</h2>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="border border-border rounded-lg p-4">
                <p className="font-semibold text-sm text-foreground mb-1">{p.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{p.desc}</p>
                {p.href ? (
                  <Link to={p.href} className="text-xs text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors">
                    {p.label}
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground">{p.label}</span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">videos</h2>
          <p className="text-xs text-muted-foreground mb-4">screen studio recordings of things I've built.</p>
          {videos.length === 0 ? (
            <p className="text-xs text-muted-foreground border border-dashed border-border rounded-lg p-5 text-center">
              adding videos soon —
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {videos.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="border border-border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {v.thumb ? <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground">{v.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  </div>
);

export default VibecodeD;

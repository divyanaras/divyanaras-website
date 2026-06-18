import { useState } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SocialGraph } from "@/components/SocialGraph";
import { FounderCTA } from "@/components/FounderCTA";
import { FounderModal } from "@/components/FounderModal";

const Index = () => {
  const [founderOpen, setFounderOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden px-6 md:px-12 py-10 relative">
      <GrainOverlay />

      <main className="page-transition max-w-6xl mx-auto pt-20 md:pt-24 grid md:grid-cols-[1fr_minmax(520px,620px)] gap-8 md:gap-12 items-start h-[calc(100vh-5rem)]">
        {/* Left column — text */}
        <div className="text-foreground max-w-xl">
          <h1 className="text-4xl md:text-5xl font-handwritten leading-tight tracking-normal mb-8">
            Hey, I'm Divya.
          </h1>
          <div className="space-y-4">
          <p className="text-sm md:text-base leading-relaxed">
            i'm interested in{" "}
            <a href="https://divyapshere.substack.com/p/your-brain-is-a-thief-politely?r=19q1c0" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">cognitive science</a>
            ,{" "}
            <a href="https://divyapshere.substack.com/p/are-genzs-actually-a-dumb-generation?r=19q1c0" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">culture</a>
            {" "}and{" "}
            <a href="https://divyapshere.substack.com/p/learning-inside-the-31?r=19q1c0" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">tech</a>
            . I read a lot of{" "}
            <a href="https://divyapshere.substack.com/p/the-three-body-problem-series-i-may?r=19q1c0" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">science fiction</a>
            {" "}these days and{" "}
            <a href="https://www.instagram.com/p/DWhT0UQE70o/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">make videos</a>
            {" "}about the things that i research and write. i also{" "}
            <a href="https://divyapshere.substack.com/p/if-my-future-self-could-cut-back?r=19q1c0" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">run</a>
            {" "}— one marathon a month, which still surprises me.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            for work, i'm a growth fanatic with a builder's mindset. 3.5 years in enterprise-security space, now moving to SF to figure out what's next.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            I also run{" "}
            <a href="/closed-room" className="text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity">closed room conversations</a>
            {" "}in Chennai — a community that meets to talk about culture, tech and books.
          </p>

          <FounderCTA onClick={() => setFounderOpen(true)} />
          </div>
        </div>

        {/* Right column — graph */}
        <div className="h-[520px] md:h-full min-h-[520px]">
          <SocialGraph />
        </div>
      </main>

      <FounderModal open={founderOpen} onOpenChange={setFounderOpen} />
    </div>
  );
};

export default Index;

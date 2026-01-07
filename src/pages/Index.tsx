import { LinkIcon } from "@/components/LinkIcon";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Twitter, Linkedin, PenLine, BookOpen, Coffee } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />
      
      <main className="page-transition max-w-md w-full flex flex-col items-center text-center z-10">
        {/* Name */}
        <h1 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Divya Narasimhan
        </h1>
        
        {/* Bio */}
        <div className="mb-16 space-y-4">
          <p className="text-foreground text-lg leading-relaxed font-light">
            hey, i'm divya.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            product marketer, brand builder & customer storyteller — 3+ years in big tech.
            <br />
            i love reading, writing, running & building weird stuff.
          </p>
        </div>

        {/* Icon Links Grid */}
        <div className="grid grid-cols-5 gap-4 md:gap-8 mb-12">
          <LinkIcon 
            to="https://x.com/divyapshere" 
            number="01" 
            icon={<Twitter className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
            external
            delay={100}
          />
          <LinkIcon 
            to="https://www.linkedin.com/in/profile-divyanarasimhan/" 
            number="02" 
            icon={<Linkedin className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
            external
            delay={200}
          />
          <LinkIcon 
            to="https://substack.com/@divyapshere" 
            number="03" 
            icon={<PenLine className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
            external
            delay={300}
          />
          <LinkIcon 
            to="/bookshelf" 
            number="04" 
            icon={<BookOpen className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
            delay={400}
          />
          <LinkIcon 
            to="https://cal.com" 
            number="05" 
            icon={<Coffee className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
            external
            delay={500}
          />
        </div>

        {/* Legend */}
        <div className="font-mono text-xs text-muted-foreground space-y-1">
          <p>(01) x · (02) linkedin · (03) substack</p>
          <p>(04) bookshelf · (05) let's chat</p>
        </div>
      </main>
    </div>
  );
};

export default Index;

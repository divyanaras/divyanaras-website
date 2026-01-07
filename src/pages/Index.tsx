import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IconLink } from "@/components/IconLink";

import iconSubstack from "@/assets/icon-substack.png";
import iconX from "@/assets/icon-x.png";
import iconLinkedin from "@/assets/icon-linkedin.png";
import iconBookshelf from "@/assets/icon-bookshelf.png";
import iconChat from "@/assets/icon-chat.png";

const Index = () => {
  const links = [
    {
      to: "https://substack.com/@divyapshere",
      number: "01",
      image: iconSubstack,
      label: "substack",
      external: true,
    },
    {
      to: "https://x.com/divyapshere",
      number: "02",
      image: iconX,
      label: "x",
      external: true,
    },
    {
      to: "https://www.linkedin.com/in/profile-divyanarasimhan/",
      number: "03",
      image: iconLinkedin,
      label: "linkedin",
      external: true,
    },
    {
      to: "/bookshelf",
      number: "04",
      image: iconBookshelf,
      label: "bookshelf",
      external: false,
    },
    {
      to: "https://cal.com",
      number: "05",
      image: iconChat,
      label: "let's chat",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />
      
      <main className="page-transition max-w-xl w-full flex flex-col items-center text-center z-10">
        {/* Name - Strong identity */}
        <h1 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 font-medium opacity-70">
          Divya Narasimhan
        </h1>
        
        {/* Bio - Clear hierarchy */}
        <div className="mb-16 space-y-5">
          <p className="text-foreground text-2xl md:text-3xl leading-relaxed font-semibold">
            hey i'm divya.
          </p>
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed max-w-md">
            a product marketer, brand strategist and storyteller with a builder's mindset— with 3+ years operating inside a global SaaS org.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            between this, i dribble with design, reading, writing, making new things and chasing harder questions.
          </p>
        </div>

        {/* Section Header */}
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
          places where i think in public
        </p>

        {/* Icon Links Grid */}
        <div className="grid grid-cols-5 gap-4 md:gap-8 mb-10">
          {links.map((link, index) => (
            <IconLink
              key={link.number}
              to={link.to}
              number={link.number}
              image={link.image}
              external={link.external}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="text-xs text-muted-foreground/70 space-y-1.5 font-medium tracking-wide">
          <p>(01) substack · (02) x · (03) linkedin</p>
          <p>(04) bookshelf · (05) let's chat</p>
        </div>
      </main>
    </div>
  );
};

export default Index;

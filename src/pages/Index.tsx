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
      to: "https://divyapshere.substack.com/archive",
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
      to: "https://cal.com/divya-narasimhan/30min",
      number: "05",
      image: iconChat,
      label: "let's chat - over a ramen, ideally",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />
      
      <main className="page-transition max-w-lg w-full flex flex-col items-center text-center z-10">
        {/* Name */}
        <h1 className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-10 font-medium">
          Divya Narasimhan
        </h1>
        
        {/* Bio */}
        <div className="mb-14 space-y-4">
          <p className="text-foreground text-xl leading-relaxed font-medium">
            <span className="underline decoration-1 underline-offset-4">hey, i'm Divya.</span>
          </p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            a product marketer, brand strategist and storyteller with a builder's mindset - 3+ years in security, endpoint and enterprise saas space.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            between this, i dribble with design, reading, writing, making new things and chasing harder questions.
          </p>
        </div>

        {/* Places text */}
        <p className="text-muted-foreground text-base mb-8 font-semibold">
          places where i think in public
        </p>

        {/* Icon Links Grid */}
        <div className="grid grid-cols-5 gap-3 md:gap-6 mb-10">
          {links.map((link, index) => (
            <IconLink
              key={link.number}
              to={link.to}
              number={link.number}
              image={link.image}
              external={link.external}
              delay={index * 80}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="text-xs text-muted-foreground space-y-1.5 font-medium tracking-wide">
          <p>(01) substack · (02) x · (03) linkedin</p>
          <p>(04) bookshelf · (05) let's chat</p>
        </div>
      </main>
    </div>
  );
};

export default Index;

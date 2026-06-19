import { Link } from "react-router-dom";

import iconSubstack from "@/assets/icons/substack.png";
import iconX from "@/assets/icons/x.png";
import iconLinkedin from "@/assets/icons/linkedin.png";
import iconInstagram from "@/assets/icons/instagram.png";
import iconEmail from "@/assets/icons/email.png";
import iconWork from "@/assets/icons/work.png";
import iconBookshelf from "@/assets/icons/bookshelf.png";
import iconVibecoded from "@/assets/icons/vibecoded.png";

import { MAILTO_LETS_TALK } from "@/lib/mailto";

type NodeKind = "external" | "internal";

interface IconNode {
  id: string;
  label: string;
  desc?: string;
  image: string;
  href: string;
  kind: NodeKind;
  left: string; // % of container width
  top: string;  // % of container height
  tilt: number; // hover tilt degrees
  bobDur: number;
  bobDelay: number;
  sizePx?: number;
}

const ICON_PX = 120;
const TEXT_W = 144;

const nodes: IconNode[] = [
  { id: "substack",  label: "substack",   desc: "writing on culture, AI and cognitive science",     image: iconSubstack,  href: "https://divyapshere.substack.com/archive",            kind: "external", left: "11%", top: "8%",  tilt: -13, bobDur: 4.6, bobDelay: 0,   sizePx: 144 },
  { id: "linkedin",  label: "linkedin",   desc: "professional work and network",                    image: iconLinkedin,  href: "https://www.linkedin.com/in/profile-divyanarasimhan/", kind: "external", left: "40%", top: "3%",  tilt: 10,  bobDur: 5.2, bobDelay: 0.7, sizePx: 132 },
  { id: "work",      label: "work",       desc: "selected work in cybersecurity and growth",        image: iconWork,      href: "/work",                                                kind: "internal", left: "66%", top: "9%",  tilt: -9,  bobDur: 4.0, bobDelay: 1.2, sizePx: 124 },
  { id: "bookshelf", label: "bookshelf",  desc: "digital library",                                  image: iconBookshelf, href: "/digital-library",                                      kind: "internal", left: "24%", top: "38%", tilt: 12,  bobDur: 4.8, bobDelay: 0.3, sizePx: 132 },
  { id: "instagram", label: "instagram",  desc: "videos on AI, culture and the harder questions",  image: iconInstagram, href: "https://www.instagram.com/divsleeps/",                  kind: "external", left: "55%", top: "43%", tilt: -11, bobDur: 5.4, bobDelay: 1.6, sizePx: 144 },
  { id: "x",         label: "x",          desc: "building and thinking in public",                 image: iconX,         href: "https://x.com/divyapshere",                             kind: "external", left: "9%",  top: "71%", tilt: 9,   bobDur: 4.4, bobDelay: 1.9, sizePx: 148 },
  { id: "vibecoded", label: "vibecoded",  desc: "vibecoded projects",                              image: iconVibecoded, href: "/vibecoded-projects",                                   kind: "internal", left: "36%", top: "68%", tilt: -8,  bobDur: 4.2, bobDelay: 0.5, sizePx: 120 },
  { id: "letstalk",  label: "let's talk", desc: "reach out if you find this interesting :)",       image: iconEmail,     href: MAILTO_LETS_TALK,                                         kind: "external", left: "63%", top: "71%", tilt: -10, bobDur: 5.0, bobDelay: 0.9, sizePx: 124 },
];

export function SocialGraph() {
  return (
    <div className="relative w-full h-full">
      {nodes.map((node) => {
        const isInternal = node.kind === "internal";
        const px = node.sizePx ?? ICON_PX;
        const style = {
          left: node.left,
          top: node.top,
          width: TEXT_W,
          animation: `bob ${node.bobDur}s ease-in-out infinite`,
          animationDelay: `${node.bobDelay}s`,
        } as React.CSSProperties;
        const inner = (
          <div className="icon-bob-wrap flex flex-col items-center" style={{ gap: 0 }}>
            {node.desc && (
              <span className="text-[11px] text-foreground leading-tight text-center pb-0.5" style={{ maxWidth: TEXT_W }}>
                {node.desc}
              </span>
            )}
            <img
              src={node.image}
              alt=""
              draggable={false}
              className="die-cut icon-tilt"
              style={{
                width: px,
                height: px,
                ["--tilt" as never]: `${node.tilt}deg`,
              }}
            />
          </div>
        );
        if (isInternal) {
          return (
            <Link
              key={node.id}
              to={node.href}
              aria-label={node.label}
              className="absolute"
              style={style}
            >
              {inner}
            </Link>
          );
        }
        return (
          <a
            key={node.id}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={node.label}
            className="absolute"
            style={style}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}

import { useEffect } from "react";
import { SideNav } from "@/components/SideNav";
import { GrainOverlay } from "@/components/GrainOverlay";

const CLOUD = "https://res.cloudinary.com/dvplqchad/image/upload/w_400,f_auto,q_auto/";

const photos = [
  { src: `${CLOUD}v1781779449/298af574-c4d8-4d45-89af-fd849193f141_j8fh4l.jpg`, tilt: -6,  top: "2%",  left: "1%",  w: 210 },
  { src: `${CLOUD}v1781779447/bd3c7b0f-664b-4115-ae2b-a3739390c575_l7sps3.jpg`,  tilt: 4,   top: "0%",  left: "30%", w: 210 },
  { src: `${CLOUD}v1781779528/e1d54e3e-1715-4568-8980-d25870056685_tl9hyw.jpg`,  tilt: -3,  top: "3%",  left: "59%", w: 210 },
  { src: `${CLOUD}v1781779445/002cff79-c1ff-40a8-a807-2b1a79a45dcd_cwrxr6.jpg`,  tilt: 6,   top: "48%", left: "8%",  w: 236 },
  { src: `${CLOUD}v1781779445/56a9b615-ef68-4da8-a33f-f90c40e97902_u537vt.jpg`,  tilt: -5,  top: "46%", left: "42%", w: 236 },
];

const sessions = [
  "everything under the sun",
  "books to the big screen",
  "morality in media",
  "should we separate art from the artist",
];

export default function ClosedRoom() {
  useEffect(() => { document.title = "closed room conversations — divya narasimhan"; }, []);
  return (
    <div className="h-screen overflow-hidden relative">
      <GrainOverlay />
      <SideNav />

      <div className="ml-40 h-full flex flex-col px-10 py-10">
        {/* Header row */}
        <div className="flex items-baseline justify-between mb-8 shrink-0">
          <h1 className="font-handwritten text-3xl md:text-4xl tracking-normal leading-none">
            closed room conversations
          </h1>
          <a
            href="https://www.instagram.com/divsleeps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline underline-offset-2 decoration-primary hover:opacity-75 transition-opacity ml-6 shrink-0"
          >
            instagram →
          </a>
        </div>

        {/* Main: text left, photos scattered right */}
        <div className="flex flex-1 gap-12 min-h-0">
          {/* Text */}
          <div className="w-72 shrink-0 flex flex-col gap-5 text-sm leading-relaxed text-foreground">
            <p>
              started in Jan 2026, this is an intentional community by 3 ambitious women where we talk about culture, books and tech.
            </p>
            <div>
              <p className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">sessions</p>
              <ul className="space-y-1.5">
                {sessions.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground shrink-0">—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scattered photos */}
          <div className="relative flex-1">
            {photos.map((p, i) => (
              <div
                key={i}
                className="absolute overflow-hidden rounded shadow-md"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.w,
                  transform: `rotate(${p.tilt}deg)`,
                  transition: "transform 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = `rotate(0deg) scale(1.04)`)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${p.tilt}deg)`)}
              >
                <img
                  src={p.src}
                  alt=""
                  draggable={false}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

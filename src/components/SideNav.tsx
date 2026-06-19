import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "work", href: "/work" },
  { label: "digital library", href: "/digital-library" },
  { label: "vibecoded projects", href: "/vibecoded-projects" },
  { label: "closed room conversations", href: "/closed-room-conversations" },
];

export function SideNav() {
  const { pathname } = useLocation();
  return (
    <>
      {/* ── Desktop sidebar — unchanged ── */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen w-40 flex-col justify-center px-6 z-20 gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={`text-sm leading-tight transition-colors duration-150 ${
              pathname === l.href
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/"
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-6"
        >
          ← home
        </Link>
      </nav>

      {/* ── Mobile top bar — new, desktop never sees this ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-3 border-b border-border/60"
        style={{ background: "hsl(42 47% 88%)" }}>
        <Link to="/" className="text-sm font-medium text-foreground tracking-wide">
          home
        </Link>
        <div className="flex items-center gap-4">
          {[
            { href: "/work",                        short: "work"      },
            { href: "/digital-library",             short: "library"   },
            { href: "/vibecoded-projects",          short: "projects"  },
            { href: "/closed-room-conversations",   short: "community" },
          ].map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-xs transition-colors duration-150 ${
                pathname === l.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {l.short}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

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
    <nav className="fixed top-0 left-0 h-screen w-40 flex flex-col justify-center px-6 z-20 gap-4">
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
  );
}

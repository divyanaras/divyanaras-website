import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkIconProps {
  to: string;
  number: string;
  icon: ReactNode;
  external?: boolean;
  delay?: number;
}

export function LinkIcon({ to, number, icon, external = false, delay = 0 }: LinkIconProps) {
  const content = (
    <div 
      className="link-item flex flex-col items-center gap-2 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-foreground hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="link-number font-mono text-xs text-muted-foreground">{number}</span>
    </div>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={to}>{content}</Link>;
}

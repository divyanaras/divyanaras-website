import { Link } from "react-router-dom";

interface IconLinkProps {
  to: string;
  label: string;
  image: string;
  external?: boolean;
  large?: boolean;
}

export function IconLink({ to, label, image, external = false, large = false }: IconLinkProps) {
  const sizeClass = large
    ? "w-20 h-20 md:w-28 md:h-28"
    : "w-16 h-16 md:w-20 md:h-20";

  const content = (
    <div className="group flex flex-col items-center gap-1">
      <div
        className={`${sizeClass} flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1`}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-contain die-cut"
          draggable={false}
        />
      </div>
      <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-200 leading-none">
        {label}
      </span>
    </div>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} aria-label={label}>
      {content}
    </Link>
  );
}

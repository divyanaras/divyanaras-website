import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface IconLinkProps {
  to: string;
  number: string;
  image: string;
  external?: boolean;
  delay?: number;
}

export function IconLink({ to, number, image, external = false, delay = 0 }: IconLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);
  };

  const content = (
    <motion.div
      className="link-item flex flex-col items-center gap-2 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{
        scale: isClicked ? 0.9 : isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, -5, 5, -3, 3, 0] : 0,
        y: isHovered ? -5 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        rotate: { duration: 0.4 },
      }}
    >
      <motion.div 
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden"
        animate={{
          filter: isHovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.05))",
        }}
      >
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>
      <motion.span 
        className="link-number text-xs text-muted-foreground"
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.1 : 1,
        }}
      >
        {number}
      </motion.span>
    </motion.div>
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

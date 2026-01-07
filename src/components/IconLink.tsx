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
      className="link-item flex flex-col items-center gap-1.5 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{
        scale: isClicked ? 0.9 : isHovered ? 1.08 : 1,
        y: isHovered ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      <motion.div 
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-lg"
        animate={{
          filter: isHovered 
            ? "drop-shadow(0 6px 12px rgba(0,0,0,0.2))" 
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.05))",
          opacity: isHovered ? 1 : 0.85,
        }}
        whileHover={{
          rotate: [0, -3, 3, 0],
          transition: { duration: 0.3 }
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
        className="link-number text-[10px] text-muted-foreground font-medium"
        animate={{
          opacity: isHovered ? 1 : 0.6,
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

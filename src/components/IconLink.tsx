import { useState, useEffect } from "react";
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
  const [idleShake, setIdleShake] = useState(0);

  // Subtle idle shake animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleShake(Math.random() * 4 - 2); // Random value between -2 and 2
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const content = (
    <motion.div
      className="link-item flex flex-col items-center gap-3 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{
        scale: isClicked ? 0.85 : isHovered ? 1.15 : 1,
        rotate: isHovered ? [0, -8, 8, -5, 5, 0] : idleShake,
        y: isHovered ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        rotate: { duration: 0.5 },
      }}
    >
      <motion.div 
        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center overflow-hidden"
        animate={{
          filter: isHovered 
            ? "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" 
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
        }}
      >
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-contain dark:invert"
          draggable={false}
        />
      </motion.div>
      <motion.span 
        className="link-number text-[10px] text-muted-foreground font-medium"
        animate={{
          opacity: isHovered ? 1 : 0.6,
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

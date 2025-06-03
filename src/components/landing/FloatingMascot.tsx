
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingMascotProps {
  position: string;
  color: string;
  delay: number;
  size?: number;
}

const FloatingMascot: React.FC<FloatingMascotProps> = ({ 
  position, 
  color, 
  delay, 
  size = 80 
}) => {
  return (
    <motion.div
      className={`absolute ${position} z-10`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 100 120" className="drop-shadow-lg">
        <defs>
          <linearGradient id={`gradient-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Droplet body */}
        <path
          d="M50 10 C30 30, 17.5 50, 17.5 70 C17.5 92.5, 32.5 110, 50 110 C67.5 110, 82.5 92.5, 82.5 70 C82.5 50, 70 30, 50 10 Z"
          fill={`url(#gradient-${delay})`}
        />
        
        {/* Highlight */}
        <ellipse
          cx="37.5"
          cy="35"
          rx="6"
          ry="9"
          fill="rgba(255, 255, 255, 0.6)"
        />
        
        {/* Eyes */}
        <circle cx="40" cy="55" r="3" fill="#fff" />
        <circle cx="60" cy="55" r="3" fill="#fff" />
        <circle cx="40.5" cy="56" r="1.5" fill="#333" />
        <circle cx="60.5" cy="56" r="1.5" fill="#333" />
        
        {/* Mouth */}
        <path
          d="M45 65 Q50 70 55 65"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

export default FloatingMascot;

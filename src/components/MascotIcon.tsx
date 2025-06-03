
import React from 'react';
import { motion } from 'framer-motion';

interface MascotIconProps {
  size?: number;
  mood?: 'happy' | 'excited' | 'sleepy' | 'sad';
  className?: string;
}

const MascotIcon: React.FC<MascotIconProps> = ({ 
  size = 60, 
  mood = 'happy',
  className = '' 
}) => {
  const getEyeStyle = () => {
    switch (mood) {
      case 'excited':
        return { rx: 4, ry: 5, cy: 25 };
      case 'sleepy':
        return { rx: 6, ry: 2, cy: 27 };
      case 'sad':
        return { rx: 3, ry: 4, cy: 26 };
      default:
        return { rx: 3, ry: 4, cy: 25 };
    }
  };

  const getMouthPath = () => {
    switch (mood) {
      case 'excited':
        return "M20 35 Q30 45 40 35";
      case 'sleepy':
        return "M25 38 Q30 40 35 38";
      case 'sad':
        return "M20 40 Q30 35 40 40";
      default:
        return "M22 35 Q30 42 38 35";
    }
  };

  const eyeStyle = getEyeStyle();

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 60 72" className="drop-shadow-md">
        <defs>
          <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00BFFF" />
            <stop offset="50%" stopColor="#87CEEB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4682B4" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main droplet body with glow */}
        <motion.path
          d="M30 5 C15 20, 7.5 35, 7.5 50 C7.5 62.5, 17.5 72, 30 72 C42.5 72, 52.5 62.5, 52.5 50 C52.5 35, 45 20, 30 5 Z"
          fill="url(#dropletGradient)"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Highlight on the droplet */}
        <motion.ellipse
          cx="22"
          cy="25"
          rx="5"
          ry="8"
          fill="rgba(255, 255, 255, 0.7)"
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Eyes with mood-based styling */}
        <motion.ellipse
          cx="23"
          cy={eyeStyle.cy}
          rx={eyeStyle.rx}
          ry={eyeStyle.ry}
          fill="#fff"
          animate={mood === 'sleepy' ? {
            scaleY: [1, 0.1, 1],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.ellipse
          cx="37"
          cy={eyeStyle.cy}
          rx={eyeStyle.rx}
          ry={eyeStyle.ry}
          fill="#fff"
          animate={mood === 'sleepy' ? {
            scaleY: [1, 0.1, 1],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Eye pupils */}
        {mood !== 'sleepy' && (
          <>
            <circle cx="24" cy="26" r="1.5" fill="#333" />
            <circle cx="38" cy="26" r="1.5" fill="#333" />
          </>
        )}
        
        {/* Mouth based on mood */}
        <motion.path
          d={getMouthPath()}
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={mood === 'excited' ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Small sparkles around the droplet for excitement */}
        {mood === 'excited' && (
          <>
            <motion.circle
              cx="10"
              cy="20"
              r="1"
              fill="#FFD700"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            />
            <motion.circle
              cx="50"
              cy="30"
              r="1"
              fill="#FFD700"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.circle
              cx="45"
              cy="15"
              r="1"
              fill="#FFD700"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default MascotIcon;

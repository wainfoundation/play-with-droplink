
import React from 'react';
import { motion } from 'framer-motion';
import { MascotStage } from '@/hooks/useMascotProgression';

interface MascotRendererProps {
  stage: MascotStage;
  mood?: string;
  size?: 'small' | 'medium' | 'large';
  isAnimated?: boolean;
}

const sizeClasses = {
  small: 'w-16 h-20',
  medium: 'w-24 h-30', 
  large: 'w-32 h-40'
};

const stageDescriptions: Record<MascotStage, string> = {
  baby: 'Curious and clingy, needs lots of care',
  kid: 'Energetic and playful, loves to explore',
  teen: 'Cool and moody, into music and games',
  adult: 'Ambitious and balanced, focused on work',
  old: 'Wise and nostalgic, loves sharing stories'
};

export default function MascotRenderer({ 
  stage, 
  mood = 'happy', 
  size = 'large',
  isAnimated = true 
}: MascotRendererProps) {
  const baseAnimation = {
    scale: [1, 1.05, 1],
    rotate: [0, 2, -2, 0]
  };

  const moodAnimations = {
    happy: { ...baseAnimation, transition: { duration: 2, repeat: Infinity } },
    excited: { 
      scale: [1, 1.1, 1], 
      rotate: [0, 5, -5, 0],
      transition: { duration: 1, repeat: Infinity }
    },
    sad: { 
      scale: [1, 0.95, 1],
      transition: { duration: 3, repeat: Infinity }
    },
    sick: {
      x: [0, -2, 2, 0],
      transition: { duration: 0.5, repeat: Infinity }
    },
    content: { ...baseAnimation, transition: { duration: 4, repeat: Infinity } }
  };

  const renderDroplet = () => {
    const dropletId = `droplet-${stage}-${Math.random()}`;
    
    return (
      <svg viewBox="0 0 100 120" className={`${sizeClasses[size]} drop-shadow-lg`}>
        <defs>
          <linearGradient id={`${dropletId}-gradient`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="50%" stopColor="#4A90E2" />
            <stop offset="100%" stopColor="#2E5B9C" />
          </linearGradient>
          <radialGradient id={`${dropletId}-highlight`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        
        {/* Main droplet body */}
        <path
          d="M50 15 C35 25, 20 40, 20 60 C20 80, 35 95, 50 95 C65 95, 80 80, 80 60 C80 40, 65 25, 50 15 Z"
          fill={`url(#${dropletId}-gradient)`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Highlight */}
        <ellipse
          cx="40"
          cy="35"
          rx="8"
          ry="12"
          fill={`url(#${dropletId}-highlight)`}
        />
        
        {/* Stage-specific accessories and features */}
        {stage === 'baby' && (
          <>
            {/* Pacifier */}
            <ellipse cx="50" cy="65" rx="8" ry="6" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1" />
            <circle cx="50" cy="65" r="3" fill="#FF69B4" />
            <rect x="46" y="62" width="8" height="2" rx="1" fill="#DDA0DD" />
            
            {/* Big innocent eyes */}
            <circle cx="42" cy="50" r="6" fill="white" />
            <circle cx="58" cy="50" r="6" fill="white" />
            <circle cx="42" cy="50" r="4" fill="black" />
            <circle cx="58" cy="50" r="4" fill="black" />
            <circle cx="43" cy="49" r="1.5" fill="white" />
            <circle cx="59" cy="49" r="1.5" fill="white" />
            
            {/* Cute blush */}
            <circle cx="30" cy="58" r="3" fill="rgba(255,182,193,0.6)" />
            <circle cx="70" cy="58" r="3" fill="rgba(255,182,193,0.6)" />
          </>
        )}
        
        {stage === 'kid' && (
          <>
            {/* Baseball cap */}
            <ellipse cx="50" cy="25" rx="20" ry="8" fill="#FF6B35" />
            <ellipse cx="50" cy="20" rx="15" ry="10" fill="#FF6B35" />
            <ellipse cx="35" cy="18" rx="8" ry="3" fill="#E55A2B" />
            
            {/* Playful eyes */}
            <circle cx="42" cy="45" r="5" fill="white" />
            <circle cx="58" cy="45" r="5" fill="white" />
            <circle cx="42" cy="45" r="3" fill="black" />
            <circle cx="58" cy="45" r="3" fill="black" />
            <circle cx="43" cy="44" r="1" fill="white" />
            <circle cx="59" cy="44" r="1" fill="white" />
            
            {/* Happy smile */}
            <path d="M40 65 Q50 72 60 65" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        
        {stage === 'teen' && (
          <>
            {/* Headphones */}
            <rect x="25" y="35" width="6" height="12" rx="3" fill="#333" />
            <rect x="69" y="35" width="6" height="12" rx="3" fill="#333" />
            <path d="M31 35 Q50 25 69 35" stroke="#333" strokeWidth="4" fill="none" />
            
            {/* Cool eyes (half-closed) */}
            <ellipse cx="42" cy="50" rx="6" ry="3" fill="white" />
            <ellipse cx="58" cy="50" rx="6" ry="3" fill="white" />
            <ellipse cx="42" cy="50" rx="4" ry="2" fill="black" />
            <ellipse cx="58" cy="50" rx="4" ry="2" fill="black" />
            
            {/* Smirk */}
            <path d="M45 65 Q52 68 58 65" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Hoodie */}
            <path d="M25 75 Q50 85 75 75 L75 95 Q50 105 25 95 Z" fill="#4A4A4A" opacity="0.8" />
          </>
        )}
        
        {stage === 'adult' && (
          <>
            {/* Glasses */}
            <circle cx="42" cy="45" r="8" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="58" cy="45" r="8" fill="none" stroke="#333" strokeWidth="2" />
            <line x1="50" y1="45" x2="50" y2="45" stroke="#333" strokeWidth="2" />
            <circle cx="42" cy="45" r="6" fill="white" opacity="0.3" />
            <circle cx="58" cy="45" r="6" fill="white" opacity="0.3" />
            
            {/* Professional eyes */}
            <circle cx="42" cy="45" r="3" fill="black" />
            <circle cx="58" cy="45" r="3" fill="black" />
            <circle cx="43" cy="44" r="1" fill="white" />
            <circle cx="59" cy="44" r="1" fill="white" />
            
            {/* Confident smile */}
            <path d="M42 65 Q50 70 58 65" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Tie */}
            <polygon points="50,75 45,85 50,95 55,85" fill="#8B0000" />
            <rect x="47" y="75" width="6" height="4" fill="#A0522D" />
          </>
        )}
        
        {stage === 'old' && (
          <>
            {/* Hat */}
            <ellipse cx="50" cy="20" rx="18" ry="6" fill="#8B4513" />
            <rect x="32" y="14" width="36" height="12" rx="6" fill="#8B4513" />
            
            {/* Beard */}
            <ellipse cx="50" cy="75" rx="12" ry="8" fill="white" />
            <ellipse cx="50" cy="82" rx="10" ry="6" fill="white" />
            
            {/* Wise eyes */}
            <circle cx="42" cy="45" r="4" fill="white" />
            <circle cx="58" cy="45" r="4" fill="white" />
            <circle cx="42" cy="45" r="2" fill="black" />
            <circle cx="58" cy="45" r="2" fill="black" />
            
            {/* Gentle smile */}
            <path d="M43 62 Q50 66 57 62" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            
            {/* Walking cane (beside droplet) */}
            <line x1="85" y1="40" x2="85" y2="90" stroke="#8B4513" strokeWidth="3" />
            <ellipse cx="85" cy="35" rx="3" ry="8" fill="#DAA520" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        animate={isAnimated ? moodAnimations[mood as keyof typeof moodAnimations] || moodAnimations.happy : {}}
        className="cursor-pointer select-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {renderDroplet()}
      </motion.div>
      
      <div className="text-center">
        <div className="text-sm font-medium text-gray-700 capitalize">
          {stage} Droplet
        </div>
        {size !== 'small' && (
          <div className="text-xs text-gray-500 max-w-48 text-center">
            {stageDescriptions[stage]}
          </div>
        )}
      </div>
    </div>
  );
}

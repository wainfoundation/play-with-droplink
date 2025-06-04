
import React from 'react';
import { motion } from 'framer-motion';
import { MascotStage } from '@/hooks/useMascotProgression';

interface MascotRendererProps {
  stage: MascotStage;
  mood?: string;
  size?: 'small' | 'medium' | 'large';
  isAnimated?: boolean;
}

const mascotArt: Record<MascotStage, string> = {
  baby: '👶',     // Replace with /assets/mascot/baby.svg later
  kid: '🧒',      // Replace with /assets/mascot/kid.svg later
  teen: '🧑‍🎧',    // Replace with /assets/mascot/teen.svg later
  adult: '🧔',    // Replace with /assets/mascot/adult.svg later
  old: '👴',      // Replace with /assets/mascot/old.svg later
};

const stageDescriptions: Record<MascotStage, string> = {
  baby: 'Curious and clingy, needs lots of care',
  kid: 'Energetic and playful, loves to explore',
  teen: 'Cool and moody, into music and games',
  adult: 'Ambitious and balanced, focused on work',
  old: 'Wise and nostalgic, loves sharing stories'
};

const sizeClasses = {
  small: 'text-4xl',
  medium: 'text-6xl', 
  large: 'text-8xl'
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

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        animate={isAnimated ? moodAnimations[mood as keyof typeof moodAnimations] || moodAnimations.happy : {}}
        className={`${sizeClasses[size]} drop-shadow-lg cursor-pointer select-none`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {mascotArt[stage]}
      </motion.div>
      
      <div className="text-center">
        <div className="text-sm font-medium text-gray-700 capitalize">
          {stage} Droplet
        </div>
        <div className="text-xs text-gray-500 max-w-48 text-center">
          {stageDescriptions[stage]}
        </div>
      </div>
    </div>
  );
}

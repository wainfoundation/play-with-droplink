
import React from 'react';
import { motion } from 'framer-motion';
import CharacterEyes from './CharacterEyes';
import CharacterMouth from './CharacterMouth';
import CharacterDecorations from './CharacterDecorations';
import { PetMoodState } from '@/hooks/usePetMoodEngine';

interface Character {
  id: string;
  name: string;
  gender: string;
  color: string;
  mood: string;
  personality: string;
}

interface EmotionalCharacterRendererProps {
  character: Character;
  moodState: PetMoodState;
  size?: number;
}

const EmotionalCharacterRenderer: React.FC<EmotionalCharacterRendererProps> = ({ 
  character, 
  moodState, 
  size = 120 
}) => {
  const gradientId = `${character.id}EmotionalGradient`;
  
  // Determine current emotional state based on mood stats
  const getEmotionalMood = () => {
    if (moodState.health < 30) return 'sick';
    if (moodState.hunger < 25) return 'hungry';
    if (moodState.tiredness < 30) return 'sleepy';
    if (moodState.cleanliness < 25) return 'dirty';
    if (moodState.affection < 30) return 'sad';
    if (moodState.happiness > 85) return 'excited';
    if (moodState.happiness > 70) return 'happy';
    if (moodState.energy < 30) return 'tired';
    return 'calm';
  };

  const currentMood = getEmotionalMood();
  
  // Color adjustments based on mood
  const getMoodColor = () => {
    const baseColor = character.color;
    
    switch (currentMood) {
      case 'sick':
        return '#9ca3af'; // Gray when sick
      case 'sad':
        return '#6366f1'; // Darker blue when sad
      case 'hungry':
        return '#f59e0b'; // Orange when hungry
      case 'excited':
        return '#10b981'; // Bright green when excited
      case 'sleepy':
        return '#8b5cf6'; // Purple when sleepy
      case 'dirty':
        return '#92400e'; // Brown when dirty
      default:
        return baseColor;
    }
  };

  // Animation based on mood
  const getMoodAnimation = () => {
    switch (currentMood) {
      case 'excited':
        return {
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
          transition: { duration: 0.8, repeat: Infinity }
        };
      case 'sad':
        return {
          y: [0, 5, 0],
          opacity: [1, 0.7, 1],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'sleepy':
        return {
          y: [0, 3, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      case 'sick':
        return {
          x: [0, -2, 2, 0],
          transition: { duration: 0.5, repeat: Infinity }
        };
      default:
        return {
          scale: [1, 1.02, 1],
          transition: { duration: 2, repeat: Infinity }
        };
    }
  };

  // Get mood-specific visual effects
  const getMoodEffects = () => {
    switch (currentMood) {
      case 'excited':
        return (
          <>
            <circle cx="60" cy="80" r="2" fill="#FFD700" className="animate-ping" />
            <circle cx="140" cy="90" r="1.5" fill="#FFD700" className="animate-ping delay-300" />
            <circle cx="70" cy="50" r="1" fill="#FFD700" className="animate-ping delay-700" />
          </>
        );
      case 'sick':
        return (
          <>
            <circle cx="70" cy="60" r="3" fill="#9ca3af" opacity="0.5" className="animate-pulse" />
            <circle cx="130" cy="70" r="2" fill="#9ca3af" opacity="0.7" className="animate-pulse delay-500" />
          </>
        );
      case 'sleepy':
        return (
          <>
            <text x="140" y="80" fontSize="14" fill="#8b5cf6" className="animate-pulse">💤</text>
            <text x="135" y="70" fontSize="10" fill="#8b5cf6" className="animate-pulse delay-1000">💤</text>
          </>
        );
      case 'hungry':
        return (
          <text x="140" y="80" fontSize="16" fill="#f59e0b" className="animate-bounce">🍎</text>
        );
      case 'dirty':
        return (
          <>
            <circle cx="75" cy="90" r="2" fill="#92400e" opacity="0.6" />
            <circle cx="125" cy="85" r="1.5" fill="#92400e" opacity="0.5" />
            <circle cx="90" cy="105" r="1" fill="#92400e" opacity="0.7" />
          </>
        );
      default:
        return null;
    }
  };

  const moodColor = getMoodColor();

  return (
    <motion.div
      animate={getMoodAnimation()}
      className="relative"
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 200 240">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={moodColor} />
            <stop offset="50%" stopColor={moodColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={moodColor} stopOpacity="0.6" />
          </linearGradient>
          
          {/* Add glow effect for happy moods */}
          {(currentMood === 'excited' || currentMood === 'happy') && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        
        {/* Character shape */}
        <path
          d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
          fill={`url(#${gradientId})`}
          filter={(currentMood === 'excited' || currentMood === 'happy') ? 'url(#glow)' : undefined}
          opacity={currentMood === 'sick' ? 0.7 : 1}
        />
        
        {/* Highlight */}
        <ellipse
          cx="75"
          cy="70"
          rx="12"
          ry="18"
          fill="rgba(255, 255, 255, 0.6)"
          opacity={currentMood === 'sick' ? 0.3 : 0.6}
        />
        
        {/* Eyes based on mood */}
        <CharacterEyes mood={currentMood} />
        
        {/* Mouth based on mood */}
        <CharacterMouth mood={currentMood} />

        {/* Gender indicator and mood icons */}
        <CharacterDecorations gender={character.gender} mood={currentMood} />

        {/* Mood-specific visual effects */}
        {getMoodEffects()}

        {/* Health indicator (red cross when sick) */}
        {moodState.health < 50 && (
          <g>
            <rect x="155" y="45" width="8" height="2" fill="#ef4444" />
            <rect x="156" y="44" width="6" height="4" fill="#ef4444" />
          </g>
        )}
      </svg>

      {/* Floating status indicators */}
      <div className="absolute -top-2 -right-2 flex flex-col gap-1">
        {moodState.hunger < 30 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-orange-100 border border-orange-300 rounded-full p-1"
          >
            <span className="text-xs">🍎</span>
          </motion.div>
        )}
        {moodState.cleanliness < 30 && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-blue-100 border border-blue-300 rounded-full p-1"
          >
            <span className="text-xs">🧼</span>
          </motion.div>
        )}
        {moodState.tiredness < 30 && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-purple-100 border border-purple-300 rounded-full p-1"
          >
            <span className="text-xs">💤</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EmotionalCharacterRenderer;

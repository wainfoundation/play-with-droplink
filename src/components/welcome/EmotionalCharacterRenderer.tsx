
import React from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer from './CharacterRenderer';
import { MoodState } from '@/hooks/usePetMoodEngine';

interface EmotionalCharacterRendererProps {
  character: any;
  moodState?: MoodState;
  size?: number;
  showMoodText?: boolean;
}

const EmotionalCharacterRenderer: React.FC<EmotionalCharacterRendererProps> = ({ 
  character, 
  moodState,
  size = 100,
  showMoodText = false
}) => {
  const getMoodEmoji = () => {
    if (!moodState) return '😊';
    
    const { happiness, health, hunger, energy } = moodState;
    
    if (health < 30) return '🤒';
    if (hunger < 25) return '😋';
    if (energy < 25) return '😴';
    if (happiness > 85) return '😊';
    if (happiness < 30) return '😢';
    return '😐';
  };

  const getMoodText = () => {
    if (!moodState) return 'Happy';
    
    const { happiness, health, hunger, energy } = moodState;
    
    if (health < 30) return 'Sick';
    if (hunger < 25) return 'Hungry';
    if (energy < 25) return 'Tired';
    if (happiness > 85) return 'Very Happy';
    if (happiness < 30) return 'Sad';
    return 'Content';
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ 
          scale: moodState && moodState.happiness > 70 ? [1, 1.05, 1] : [1, 1.02, 1],
          y: moodState && moodState.energy < 30 ? [0, -1, 0] : [0, -3, 0]
        }}
        transition={{ 
          duration: moodState && moodState.energy < 30 ? 2.5 : 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <CharacterRenderer character={character} size={size} />
        
        {/* Mood Indicator */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1 text-lg"
        >
          {getMoodEmoji()}
        </motion.div>
      </motion.div>

      {/* Mood Text */}
      {showMoodText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-700"
        >
          {getMoodText()}
        </motion.div>
      )}
    </div>
  );
};

export default EmotionalCharacterRenderer;

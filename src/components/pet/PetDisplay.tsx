
import React from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer from '../welcome/CharacterRenderer';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface PetDisplayProps {
  characterId: string;
  className?: string;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ characterId, className = "" }) => {
  const { moodState, currentMessage } = usePetMoodEngine(characterId);

  // Destructure after moodState is available
  const { happiness, health, hunger, energy } = moodState;

  const getMoodEmoji = (happiness: number, health: number, hunger: number, energy: number) => {
    if (health < 30) return '🤒';
    if (hunger < 30) return '😋';
    if (energy < 30) return '😴';
    if (happiness > 80) return '😊';
    if (happiness < 30) return '😢';
    return '😐';
  };

  const character = {
    id: characterId,
    name: 'Droplet',
    gender: 'neutral',
    color: characterId.includes('pink') ? '#ff69b4' : characterId.includes('green') ? '#32cd32' : '#00aaff',
    mood: happiness > 70 ? 'happy' : happiness < 40 ? 'sad' : 'neutral',
    personality: 'friendly'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Pet Character - My Boo Style */}
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          y: [0, -2, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative mb-4"
      >
        <CharacterRenderer character={character} size={160} />
        
        {/* Mood Indicator - Top Right like My Boo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1 text-2xl"
        >
          {getMoodEmoji(happiness, health, hunger, energy)}
        </motion.div>

        {/* Sleeping pillow when tired */}
        {energy < 30 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-8 top-12"
          >
            <span className="text-3xl">💤</span>
          </motion.div>
        )}
      </motion.div>

      {/* Pet Message - My Boo Style Speech Bubble */}
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="relative bg-white rounded-2xl px-4 py-2 shadow-lg max-w-xs text-center border-2 border-gray-200"
        >
          <p className="text-sm text-gray-800 font-medium">{currentMessage}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </motion.div>
      )}
    </div>
  );
};

export default PetDisplay;

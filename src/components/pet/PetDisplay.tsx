
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
      {/* Pet Character */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <CharacterRenderer character={character} size={140} />
        
        {/* Mood Indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-lg"
        >
          {getMoodEmoji(happiness, health, hunger, energy)}
        </motion.div>
      </motion.div>

      {/* Pet Message */}
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg max-w-xs text-center"
        >
          <p className="text-sm text-gray-800">{currentMessage}</p>
        </motion.div>
      )}
    </div>
  );
};

export default PetDisplay;

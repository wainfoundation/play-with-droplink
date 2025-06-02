
import React from 'react';
import { motion } from 'framer-motion';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface PetDisplayProps {
  characterId: string;
  className?: string;
  mood?: string;
  isInteracting?: boolean;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ 
  characterId, 
  className = "",
  mood = "idle",
  isInteracting = false 
}) => {
  const { moodState, currentMessage } = usePetMoodEngine(characterId);

  const getMoodEmoji = () => {
    if (mood === "sleeping") return "😴";
    if (mood === "eating") return "😋";
    if (mood === "bathing") return "🛁";
    if (mood === "healing") return "🩹";
    if (mood === "playing") return "😊";
    
    const { happiness, health, hunger, energy } = moodState;
    
    if (health < 30) return "🤒";
    if (hunger < 25) return "😋";
    if (energy < 25) return "😴";
    if (happiness > 85) return "😊";
    if (happiness < 30) return "😢";
    return "😐";
  };

  const getPetAnimation = () => {
    if (mood === "sleeping") {
      return {
        scale: [1, 1.05, 1],
        y: [0, -2, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      };
    }
    
    if (isInteracting) {
      return {
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.6 }
      };
    }

    return {
      scale: [1, 1.05, 1],
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        animate={getPetAnimation()}
        className="relative"
      >
        {/* Main Pet Droplet */}
        <div className="w-32 h-40 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full relative shadow-lg">
          {/* Eyes */}
          <div className="absolute top-12 left-8 w-4 h-4 bg-white rounded-full">
            <div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1"></div>
          </div>
          <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full">
            <div className="w-2 h-2 bg-black rounded-full absolute top-1 right-1"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-3 bg-black rounded-full opacity-80"></div>
          </div>
        </div>
        
        {/* Mood Indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-2 -right-2 text-2xl"
        >
          {getMoodEmoji()}
        </motion.div>

        {/* Sleep Zzz Animation */}
        {mood === "sleeping" && (
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -20, -40],
              x: [0, 5, 10]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-8 left-20 text-xl opacity-70"
          >
            Zzz...
          </motion.div>
        )}
      </motion.div>

      {/* Pet Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 max-w-xs text-center shadow-md"
      >
        <p className="text-sm text-gray-700">{currentMessage}</p>
      </motion.div>
    </div>
  );
};

export default PetDisplay;

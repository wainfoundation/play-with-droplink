
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Moon, Sun, Lightbulb } from 'lucide-react';
import PetDisplay from '../pet/PetDisplay';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface BedroomRoomProps {
  characterId: string;
}

const BedroomRoom: React.FC<BedroomRoomProps> = ({ characterId }) => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [lampOn, setLampOn] = useState(true);
  const { moodState, actions } = usePetMoodEngine(characterId);

  // Auto sleep effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSleeping) {
      interval = setInterval(() => {
        actions.sleepPet();
      }, 10000); // Restore energy every 10 seconds while sleeping
    }
    return () => clearInterval(interval);
  }, [isSleeping, actions]);

  const handleLampToggle = () => {
    setLampOn(!lampOn);
    if (!lampOn) {
      setIsSleeping(false); // Wake up when light turns on
    }
  };

  const handleSleep = () => {
    setIsSleeping(!isSleeping);
    if (!isSleeping) {
      setLampOn(false); // Turn off lamp when going to sleep
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      lampOn ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50' : 
               'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'
    }`}>
      {/* Room Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            🛏️
          </div>
          <div>
            <h2 className={`font-bold ${lampOn ? 'text-gray-800' : 'text-white'}`}>
              Bedroom
            </h2>
            <p className={`text-sm ${lampOn ? 'text-gray-600' : 'text-gray-300'}`}>
              {isSleeping ? 'Sleeping peacefully...' : 'Rest and recover'}
            </p>
          </div>
        </div>

        {/* Lamp Control */}
        <Button
          onClick={handleLampToggle}
          variant={lampOn ? "default" : "secondary"}
          size="sm"
          className="flex items-center gap-2"
        >
          <Lightbulb className={`w-4 h-4 ${lampOn ? 'text-yellow-400' : 'text-gray-600'}`} />
          {lampOn ? 'Dim' : 'Bright'}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* Pet Display */}
        <PetDisplay 
          characterId={characterId} 
          mood={isSleeping ? "sleeping" : "idle"}
          className="mb-8"
        />

        {/* Sleep Stats */}
        <div className="w-full max-w-sm mb-6">
          <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 ${
            !lampOn ? 'bg-gray-800/80 text-white' : ''
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-lg">⚡</div>
              <span className="font-semibold">Energy</span>
              <span className="ml-auto text-sm">{Math.round(moodState.energy)}%</span>
            </div>
            <Progress value={moodState.energy} className="h-3" />
            
            {isSleeping && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs mt-2 text-center text-green-600"
              >
                Restoring energy... (+1 every 10s)
              </motion.p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <Button
            onClick={handleSleep}
            variant={isSleeping ? "secondary" : "default"}
            className="h-16 flex flex-col gap-1"
          >
            {isSleeping ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            {isSleeping ? 'Wake Up' : 'Sleep'}
          </Button>

          <Button
            onClick={actions.petCharacter}
            variant="outline"
            className="h-16 flex flex-col gap-1"
            disabled={isSleeping}
          >
            <div className="text-lg">💝</div>
            Pet
          </Button>
        </div>
      </div>

      {/* Bedroom Decorations */}
      {lampOn && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between opacity-30">
            <div className="text-4xl">🪴</div>
            <div className="text-4xl">🖼️</div>
            <div className="text-4xl">📚</div>
          </div>
        </div>
      )}

      {/* Night mode stars */}
      {!lampOn && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BedroomRoom;

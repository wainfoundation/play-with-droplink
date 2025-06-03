
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PetDisplay from '../pet/PetDisplay';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface GenericRoomProps {
  characterId: string;
  roomType: string;
  roomName: string;
  roomIcon: string;
  roomColor: string;
  actions: Array<{
    name: string;
    icon: string;
    effect: () => void;
    description: string;
  }>;
}

const GenericRoom: React.FC<GenericRoomProps> = ({
  characterId,
  roomType,
  roomName,
  roomIcon,
  roomColor,
  actions
}) => {
  const { moodState, actions: moodActions } = usePetMoodEngine(characterId);

  const getRoomMood = () => {
    switch (roomType) {
      case 'playroom': return 'playing';
      case 'bathroom': return 'bathing';
      case 'kitchen': return 'eating';
      case 'medicine': return 'healing';
      case 'outside': return 'happy';
      default: return 'idle';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${roomColor}`}>
      {/* Room Header */}
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-2xl">
            {roomIcon}
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{roomName}</h2>
            <p className="text-sm text-gray-600">Interact with your pet</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* Pet Display */}
        <PetDisplay 
          characterId={characterId} 
          mood={getRoomMood()}
          className="mb-8"
        />

        {/* Room Actions */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.effect}
              className="h-16 flex flex-col gap-1 bg-white/80 text-gray-700 hover:bg-white"
              variant="outline"
            >
              <div className="text-lg">{action.icon}</div>
              <span className="text-xs">{action.name}</span>
            </Button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-6 grid grid-cols-4 gap-2 w-full max-w-sm">
          {[
            { label: 'Happy', value: moodState.happiness, icon: '💝' },
            { label: 'Health', value: moodState.health, icon: '❤️' },
            { label: 'Energy', value: moodState.energy, icon: '⚡' },
            { label: 'Hunger', value: moodState.hunger, icon: '🍎' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/70 rounded-lg p-2 text-center">
              <div className="text-lg">{stat.icon}</div>
              <div className="text-xs font-bold">{Math.round(stat.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericRoom;

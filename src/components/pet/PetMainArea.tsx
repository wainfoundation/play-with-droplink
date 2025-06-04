
import React from 'react';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { Button } from '@/components/ui/button';
import { Apple, Droplets, Moon, Gamepad2 } from 'lucide-react';

interface PetMainAreaProps {
  currentRoom: string;
  currentCharacter: any;
  petStats: any;
  currentRoomData: any;
  onUpdateStat: (stat: string, value: number) => void;
}

const PetMainArea: React.FC<PetMainAreaProps> = ({
  currentRoom,
  currentCharacter,
  petStats,
  currentRoomData,
  onUpdateStat
}) => {
  const handleFeed = () => {
    onUpdateStat('hunger', (petStats?.hunger || 60) + 20);
    onUpdateStat('happiness', (petStats?.happiness || 80) + 10);
  };

  const handleClean = () => {
    onUpdateStat('cleanliness', (petStats?.cleanliness || 70) + 30);
    onUpdateStat('happiness', (petStats?.happiness || 80) + 5);
  };

  const handleSleep = () => {
    onUpdateStat('energy', (petStats?.energy || 85) + 40);
    onUpdateStat('happiness', (petStats?.happiness || 80) + 5);
  };

  const handlePlay = () => {
    onUpdateStat('happiness', (petStats?.happiness || 80) + 20);
    onUpdateStat('energy', (petStats?.energy || 85) - 10);
  };

  const getRoomActions = () => {
    switch (currentRoom) {
      case 'kitchen':
        return (
          <Button onClick={handleFeed} className="bg-orange-500 hover:bg-orange-600">
            <Apple className="h-4 w-4 mr-2" />
            Feed
          </Button>
        );
      case 'bathroom':
        return (
          <Button onClick={handleClean} className="bg-blue-500 hover:bg-blue-600">
            <Droplets className="h-4 w-4 mr-2" />
            Clean
          </Button>
        );
      case 'bedroom':
        return (
          <Button onClick={handleSleep} className="bg-purple-500 hover:bg-purple-600">
            <Moon className="h-4 w-4 mr-2" />
            Sleep
          </Button>
        );
      case 'playroom':
        return (
          <Button onClick={handlePlay} className="bg-green-500 hover:bg-green-600">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Play
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-24">
      {/* Room Title */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentRoomData?.icon} {currentRoomData?.name}
        </h2>
      </div>

      {/* Character Display */}
      <div className="mb-8">
        <CharacterRenderer character={currentCharacter} size={150} />
      </div>

      {/* Room Actions */}
      <div className="mb-8">
        {getRoomActions()}
      </div>

      {/* Pet Stats Display */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-white text-sm">Happiness</div>
          <div className="text-white font-bold">{petStats?.happiness || 80}%</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-white text-sm">Hunger</div>
          <div className="text-white font-bold">{petStats?.hunger || 60}%</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-white text-sm">Energy</div>
          <div className="text-white font-bold">{petStats?.energy || 85}%</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-white text-sm">Clean</div>
          <div className="text-white font-bold">{petStats?.cleanliness || 70}%</div>
        </div>
      </div>
    </div>
  );
};

export default PetMainArea;

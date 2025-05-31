
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Droplets, Sparkles } from 'lucide-react';

interface MyBooCharacterDisplayProps {
  character: any;
  stats: any;
  onInteraction: (type: string) => void;
  soundEnabled: boolean;
}

const MyBooCharacterDisplay: React.FC<MyBooCharacterDisplayProps> = ({
  character,
  stats,
  onInteraction,
  soundEnabled
}) => {
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [backgroundScene, setBackgroundScene] = useState('bedroom');

  const backgrounds = {
    bedroom: 'bg-gradient-to-b from-purple-300 to-purple-400',
    kitchen: 'bg-gradient-to-b from-yellow-300 to-orange-400', 
    bathroom: 'bg-gradient-to-b from-blue-300 to-cyan-400',
    party: 'bg-gradient-to-b from-pink-300 to-red-400'
  };

  const getCharacterMood = () => {
    const avgStats = (stats.happiness + stats.hunger + stats.cleanliness + stats.energy) / 4;
    if (avgStats >= 80) return '😄';
    if (avgStats >= 60) return '😊';
    if (avgStats >= 40) return '😐';
    if (avgStats >= 20) return '😟';
    return '😢';
  };

  const decorations = {
    bedroom: (
      <>
        <div className="absolute top-4 left-4 text-2xl">🛏️</div>
        <div className="absolute top-4 right-4 text-2xl">🪟</div>
        <div className="absolute bottom-16 left-8 text-xl">🧸</div>
      </>
    ),
    kitchen: (
      <>
        <div className="absolute top-4 right-4 text-2xl">🎂</div>
        <div className="absolute bottom-16 right-8 text-xl">🍞</div>
      </>
    ),
    bathroom: (
      <>
        <div className="absolute top-8 left-4 text-xl">🚿</div>
        <div className="absolute bottom-16 right-4 text-xl">🧼</div>
        <div className="absolute top-4 right-8 text-xl">🛁</div>
      </>
    ),
    party: (
      <>
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="flex text-lg">🎉🎊🎈🎊🎉</div>
        </div>
        <div className="absolute bottom-12 left-4 text-xl">🎁</div>
      </>
    )
  };

  const interactions = [
    { icon: '🍎', action: 'feed', label: 'Feed', color: 'bg-green-500' },
    { icon: '🎮', action: 'play', label: 'Play', color: 'bg-blue-500' },
    { icon: '🛁', action: 'clean', label: 'Wash', color: 'bg-cyan-500' },
    { icon: '😴', action: 'rest', label: 'Sleep', color: 'bg-purple-500' }
  ];

  return (
    <div className="relative w-full h-full">
      {/* Scene Background */}
      <div className={`${backgrounds[backgroundScene as keyof typeof backgrounds]} min-h-[500px] rounded-3xl relative overflow-hidden border-4 border-white shadow-2xl`}>
        
        {/* Scene Decorations */}
        {decorations[backgroundScene as keyof typeof decorations]}
        
        {/* Checkered Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <div className="grid grid-cols-8 h-full opacity-30">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`${(Math.floor(i / 8) + i) % 2 === 0 ? 'bg-white' : 'bg-gray-200'} border-[0.5px] border-gray-300`}
              />
            ))}
          </div>
        </div>

        {/* Character in center */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          {/* Character */}
          <div 
            className={`text-8xl mb-4 transition-transform duration-300 ${
              currentAnimation === 'bounce' ? 'animate-bounce' : 'animate-pulse'
            }`}
            style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))' }}
          >
            {getCharacterMood()}
          </div>
          
          {/* Character Name */}
          <Badge className="bg-white text-gray-800 font-bold text-sm px-3 py-1 rounded-full border-2 border-gray-300">
            {character.name}
          </Badge>
        </div>

        {/* Stats Display */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1">
            <Heart className="w-4 h-4 text-red-500" />
            <div className="w-16 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${stats.happiness}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1">
            <Utensils className="w-4 h-4 text-orange-500" />
            <div className="w-16 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${stats.hunger}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scene Selector */}
        <div className="absolute top-4 right-4 flex gap-1">
          {Object.keys(backgrounds).map((scene) => (
            <Button
              key={scene}
              onClick={() => setBackgroundScene(scene)}
              variant="ghost"
              size="sm"
              className={`w-8 h-8 rounded-full ${
                backgroundScene === scene ? 'bg-white text-gray-800' : 'bg-white/50 text-white'
              }`}
            >
              {scene === 'bedroom' && '🛏️'}
              {scene === 'kitchen' && '🍰'}
              {scene === 'bathroom' && '🛁'}
              {scene === 'party' && '🎉'}
            </Button>
          ))}
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex justify-center gap-3 mt-4">
        {interactions.map((item) => (
          <Button
            key={item.action}
            onClick={() => {
              onInteraction(item.action);
              setCurrentAnimation('bounce');
              setTimeout(() => setCurrentAnimation('idle'), 1000);
            }}
            className={`${item.color} hover:scale-110 transition-transform rounded-2xl p-4 border-2 border-white shadow-lg`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold text-white">{item.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MyBooCharacterDisplay;

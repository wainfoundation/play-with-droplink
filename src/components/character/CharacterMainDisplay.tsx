
import React, { useState } from 'react';
import { CharacterCustomization } from './types';
import { Button } from '@/components/ui/button';

interface CharacterMainDisplayProps {
  character: CharacterCustomization;
  currentRoom: string;
  onRoomChange: (room: string) => void;
  onInteraction: (type: string) => void;
}

const CharacterMainDisplay: React.FC<CharacterMainDisplayProps> = ({
  character,
  currentRoom,
  onRoomChange,
  onInteraction
}) => {
  const rooms = [
    { id: 'bedroom', name: 'Bedroom', bg: 'bg-gradient-to-b from-purple-300 to-purple-400', items: ['🛏️', '🪑', '💡'] },
    { id: 'kitchen', name: 'Kitchen', bg: 'bg-gradient-to-b from-yellow-300 to-orange-400', items: ['🍳', '🥄', '☕'] },
    { id: 'bathroom', name: 'Bathroom', bg: 'bg-gradient-to-b from-blue-300 to-cyan-400', items: ['🚿', '🧼', '🪥'] },
    { id: 'medicine', name: 'Medicine Room', bg: 'bg-gradient-to-b from-green-300 to-green-400', items: ['💊', '🩺', '🌡️'] },
    { id: 'playroom', name: 'Playroom', bg: 'bg-gradient-to-b from-pink-300 to-red-400', items: ['🧸', '🎨', '🎯'] }
  ];

  const currentRoomIndex = rooms.findIndex(room => room.id === currentRoom);
  const currentRoomData = rooms[currentRoomIndex] || rooms[0];

  const handlePreviousRoom = () => {
    const newIndex = currentRoomIndex > 0 ? currentRoomIndex - 1 : rooms.length - 1;
    onRoomChange(rooms[newIndex].id);
  };

  const handleNextRoom = () => {
    const newIndex = currentRoomIndex < rooms.length - 1 ? currentRoomIndex + 1 : 0;
    onRoomChange(rooms[newIndex].id);
  };

  const getCharacterMood = () => {
    const avgStats = (character.stats.happiness + character.stats.hunger + character.stats.cleanliness + character.stats.energy) / 4;
    if (avgStats >= 80) return '😄';
    if (avgStats >= 60) return '😊';
    if (avgStats >= 40) return '😐';
    if (avgStats >= 20) return '😟';
    return '😢';
  };

  return (
    <div className="flex-1 relative">
      {/* Room Background */}
      <div className={`${currentRoomData.bg} min-h-[500px] relative overflow-hidden`}>
        
        {/* Decorative bunting at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="flex">
            {['🟢', '🟡', '🔴', '🔵', '🟣'].map((color, i) => (
              <div key={i} className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[20px] border-l-transparent border-r-transparent" 
                   style={{ borderBottomColor: ['#22c55e', '#eab308', '#ef4444', '#3b82f6', '#a855f7'][i] }} />
            ))}
          </div>
        </div>

        {/* Room Items */}
        <div className="absolute inset-0 p-4">
          {currentRoomData.items.map((item, index) => (
            <div
              key={index}
              className="absolute text-4xl opacity-60"
              style={{
                left: `${20 + (index * 25)}%`,
                top: `${20 + (index % 2) * 40}%`
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={handlePreviousRoom}
          variant="ghost"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12"
        >
          <span className="text-2xl">◀</span>
        </Button>

        <Button
          onClick={handleNextRoom}
          variant="ghost"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12"
        >
          <span className="text-2xl">▶</span>
        </Button>

        {/* Character in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Character */}
            <div className="text-8xl mb-4 animate-bounce" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))' }}>
              {getCharacterMood()}
            </div>
            
            {/* Character Name */}
            <div className="bg-white rounded-full px-4 py-2 border-2 border-gray-300 shadow-lg">
              <span className="font-bold text-gray-800">{character.name}</span>
            </div>
          </div>
        </div>

        {/* Room Name */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 rounded-full px-4 py-2 border-2 border-gray-300">
            <span className="font-bold text-gray-800">{currentRoomData.name}</span>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            <Button
              onClick={() => onInteraction('feed')}
              className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 border-2 border-white"
            >
              <span className="text-2xl">🍎</span>
            </Button>
            <Button
              onClick={() => onInteraction('play')}
              className="bg-green-500 hover:bg-green-600 rounded-full p-3 border-2 border-white"
            >
              <span className="text-2xl">🎾</span>
            </Button>
            <Button
              onClick={() => onInteraction('clean')}
              className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 border-2 border-white"
            >
              <span className="text-2xl">🧼</span>
            </Button>
            <Button
              onClick={() => onInteraction('sleep')}
              className="bg-purple-500 hover:bg-purple-600 rounded-full p-3 border-2 border-white"
            >
              <span className="text-2xl">😴</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterMainDisplay;

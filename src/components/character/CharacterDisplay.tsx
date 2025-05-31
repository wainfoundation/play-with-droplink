
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterCustomization } from './types';

interface CharacterDisplayProps {
  character: CharacterCustomization;
  currentRoom: string;
  onInteraction: (type: string) => void;
  soundEnabled: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  currentRoom,
  onInteraction,
  soundEnabled
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInteraction = (type: string) => {
    setIsAnimating(true);
    onInteraction(type);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getRoomBackground = (room: string) => {
    const backgrounds = {
      bedroom: 'bg-gradient-to-b from-blue-200 to-blue-300',
      kitchen: 'bg-gradient-to-b from-orange-200 to-orange-300',
      bathroom: 'bg-gradient-to-b from-cyan-200 to-cyan-300',
      garden: 'bg-gradient-to-b from-green-200 to-green-300',
      shop: 'bg-gradient-to-b from-purple-200 to-purple-300'
    };
    return backgrounds[room as keyof typeof backgrounds] || backgrounds.bedroom;
  };

  const getRoomItems = (room: string) => {
    const items = {
      bedroom: ['🛏️', '🪑', '🖼️', '💡'],
      kitchen: ['🍳', '🥄', '🍎', '☕'],
      bathroom: ['🚿', '🧼', '🪥', '🧴'],
      garden: ['🌸', '🌳', '🦋', '🌞'],
      shop: ['👕', '👒', '👓', '👜']
    };
    return items[room as keyof typeof items] || items.bedroom;
  };

  return (
    <Card className="min-h-[500px]">
      <CardHeader>
        <CardTitle className="text-center capitalize">
          {character.name} in the {currentRoom}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`relative p-8 rounded-xl ${getRoomBackground(currentRoom)} min-h-[400px]`}>
          {/* Room Items */}
          <div className="absolute inset-0 p-4">
            {getRoomItems(currentRoom).map((item, index) => (
              <div
                key={index}
                className="absolute text-3xl opacity-50"
                style={{
                  left: `${20 + (index * 20)}%`,
                  top: `${10 + (index % 2) * 60}%`
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Character */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transition-transform duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
              <svg
                width="150"
                height="180"
                viewBox="0 0 200 240"
                className="drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="characterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={character.color} />
                    <stop offset="50%" stopColor={character.color} />
                    <stop offset="100%" stopColor="#0077cc" />
                  </linearGradient>
                </defs>
                
                {/* Character Body */}
                <path
                  d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                  fill="url(#characterGradient)"
                  className="transition-all duration-300"
                />
                
                {/* Highlight */}
                <ellipse
                  cx="75"
                  cy="70"
                  rx="12"
                  ry="18"
                  fill="rgba(255, 255, 255, 0.6)"
                />
                
                {/* Eyes */}
                <circle cx="80" cy="110" r="6" fill="#fff" />
                <circle cx="120" cy="110" r="6" fill="#fff" />
                <circle cx="82" cy="112" r="3" fill="#333" />
                <circle cx="122" cy="112" r="3" fill="#333" />
                <circle cx="83" cy="111" r="1" fill="#fff" />
                <circle cx="123" cy="111" r="1" fill="#fff" />
                
                {/* Smile */}
                <path
                  d="M80 140 Q100 155 120 140"
                  stroke="#fff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Accessories */}
                {character.accessories.includes('hat') && (
                  <ellipse cx="100" cy="30" rx="30" ry="10" fill="#8B4513" />
                )}
              </svg>
            </div>
          </div>

          {/* Interaction Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleInteraction('feed')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                🍎 Feed
              </Button>
              <Button
                size="sm"
                onClick={() => handleInteraction('play')}
                className="bg-green-500 hover:bg-green-600"
              >
                🎾 Play
              </Button>
              <Button
                size="sm"
                onClick={() => handleInteraction('clean')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                🧼 Clean
              </Button>
              <Button
                size="sm"
                onClick={() => handleInteraction('sleep')}
                className="bg-purple-500 hover:bg-purple-600"
              >
                😴 Sleep
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterDisplay;

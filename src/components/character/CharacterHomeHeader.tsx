
import React from 'react';
import { CharacterCustomization } from './types';

interface CharacterHomeHeaderProps {
  character: CharacterCustomization;
  level: number;
  coins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const CharacterHomeHeader: React.FC<CharacterHomeHeaderProps> = ({
  character,
  level,
  coins,
  soundEnabled,
  onToggleSound
}) => {
  const stats = character.stats;

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-none">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Left side - Level and Stats */}
        <div className="flex items-center gap-2">
          {/* Level Badge */}
          <div className="bg-gray-700 rounded-lg px-2 py-1 border-2 border-white">
            <span className="text-white font-bold text-sm">{level}</span>
          </div>
          
          {/* Stats Icons */}
          <div className="flex items-center gap-1">
            {/* Energy */}
            <div className="bg-blue-600 rounded-lg px-2 py-1 border-2 border-white flex items-center">
              <span className="text-lg">⚡</span>
            </div>
            
            {/* Food */}
            <div className="bg-orange-500 rounded-lg px-2 py-1 border-2 border-white flex items-center">
              <span className="text-lg">🍎</span>
            </div>
            
            {/* Health */}
            <div className="bg-red-500 rounded-lg px-2 py-1 border-2 border-white flex items-center">
              <span className="text-lg">❤️</span>
            </div>
            
            {/* Water */}
            <div className="bg-cyan-500 rounded-lg px-2 py-1 border-2 border-white flex items-center">
              <span className="text-lg">💧</span>
            </div>
          </div>
        </div>

        {/* Right side - Coins and Settings */}
        <div className="flex items-center gap-2">
          {/* Coins Display */}
          <div className="bg-yellow-500 rounded-full px-3 py-1 border-2 border-white flex items-center gap-1">
            <span className="text-lg">💰</span>
            <span className="text-white font-bold text-sm">{coins}</span>
          </div>
          
          {/* Plus Button for Coin Shop */}
          <div className="bg-purple-500 rounded-full w-8 h-8 border-2 border-white flex items-center justify-center">
            <span className="text-white font-bold text-lg">+</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="bg-gray-600 rounded-full w-8 h-8 border-2 border-white flex items-center justify-center"
          >
            <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterHomeHeader;

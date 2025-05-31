
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
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p className="text-purple-100">Level {level}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-500 px-4 py-2 rounded-full text-white font-bold">
            💰 {coins.toLocaleString()}
          </div>
          <button
            onClick={onToggleSound}
            className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterHomeHeader;

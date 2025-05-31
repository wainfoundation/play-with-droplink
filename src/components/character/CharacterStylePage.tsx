
import React from 'react';
import { CharacterCustomization } from './types';
import { Button } from '@/components/ui/button';

interface CharacterStylePageProps {
  character: CharacterCustomization;
  onStyleChange: (style: any) => void;
}

const CharacterStylePage: React.FC<CharacterStylePageProps> = ({
  character,
  onStyleChange
}) => {
  return (
    <div className="bg-gradient-to-b from-pink-200 to-purple-300 min-h-screen relative">
      {/* Header Banner */}
      <div className="bg-red-500 mx-4 mt-4 rounded-2xl p-4 border-4 border-white shadow-2xl relative">
        <h1 className="text-white font-bold text-2xl text-center tracking-wider">STYLE</h1>
      </div>

      {/* Character Display */}
      <div className="text-center py-8">
        <div className="mb-4">
          <svg
            width="120"
            height="144"
            viewBox="0 0 200 240"
            className="mx-auto"
          >
            <defs>
              <linearGradient id="styleCharacterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={character.color} />
                <stop offset="50%" stopColor={character.color} />
                <stop offset="100%" stopColor="#0077cc" />
              </linearGradient>
            </defs>
            
            {/* Character Body */}
            <path
              d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
              fill="url(#styleCharacterGradient)"
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
        <div className="bg-white rounded-full px-4 py-2 border-2 border-gray-300 inline-block">
          <span className="font-bold text-gray-800">{character.name}</span>
        </div>
      </div>

      {/* Style Categories */}
      <div className="px-4 space-y-4">
        {/* Clothes */}
        <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-6 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center gap-3">
          <span className="text-3xl">👔</span>
          <span className="text-xl">Clothes</span>
        </Button>

        {/* Accessories */}
        <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-6 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center gap-3">
          <span className="text-3xl">🎨</span>
          <span className="text-xl">Decorations</span>
        </Button>

        {/* The Shop */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center gap-3">
          <span className="text-3xl">💎</span>
          <span className="text-xl">The Shop</span>
        </Button>
      </div>

      {/* Daily Sales */}
      <div className="mx-4 mt-6 mb-24">
        <div className="bg-red-500 rounded-t-2xl p-3 border-4 border-b-0 border-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 rounded-full px-2 py-1 text-xs font-bold text-black">50% OFF</div>
            <span className="text-white font-bold">Daily Sales</span>
          </div>
          <div className="text-white text-sm">21:51:18</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-b-2xl border-4 border-t-0 border-white p-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🎩', price: 430, originalPrice: 860 },
              { icon: '👒', price: 415, originalPrice: 830 },
              { icon: '🧢', price: 150, originalPrice: 300 }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border-2 border-gray-300 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="line-through text-xs text-gray-500">{item.originalPrice}</div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm font-bold">{item.price}</span>
                  <span className="text-yellow-500">💰</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStylePage;

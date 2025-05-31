
import React from 'react';

const CharacterGamesPage: React.FC = () => {
  const games = [
    { name: 'BOO CLIMB', icon: '🧗', unlocked: true },
    { name: 'PIANO BOO', icon: '🎹', unlocked: true },
    { name: 'BUBBLE POP', icon: '🫧', unlocked: true },
    { name: 'JUMPING', icon: '🦘', unlocked: true },
    { name: 'SOLITAIRE', icon: '🃏', unlocked: false },
    { name: 'BASKETBOO', icon: '🏀', unlocked: false },
    { name: 'RACING', icon: '🏎️', unlocked: false, premium: true },
    { name: 'BOO SNAKE', icon: '🐍', unlocked: false, premium: true },
    { name: 'BOO HOP', icon: '🐰', unlocked: false, premium: true },
    { name: 'FLAPPY BOO', icon: '🐦', unlocked: false, premium: true },
    { name: 'BOO MIX', icon: '🎭', unlocked: false, premium: true },
    { name: 'MATCHING', icon: '🎯', unlocked: false, premium: true }
  ];

  return (
    <div className="bg-gradient-to-b from-green-300 to-green-500 min-h-screen relative">
      {/* Header Banner */}
      <div className="bg-red-500 mx-4 mt-4 rounded-2xl p-4 border-4 border-white shadow-2xl relative">
        <h1 className="text-white font-bold text-2xl text-center tracking-wider">MINIGAMES</h1>
      </div>

      {/* Unlock All Button */}
      <div className="mx-4 mt-6">
        <div className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl p-4 border-4 border-white shadow-lg flex items-center justify-center gap-3 cursor-pointer">
          <span className="text-2xl">🎮</span>
          <span className="text-white font-bold">UNLOCK ALL MINIGAMES NOW</span>
          <span className="text-2xl">💎</span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-4 mt-6 mb-24">
        <div className="grid grid-cols-3 gap-3">
          {games.map((game, index) => (
            <div 
              key={index}
              className={`
                relative rounded-2xl p-4 border-4 border-white shadow-lg text-center cursor-pointer
                ${game.unlocked 
                  ? 'bg-gradient-to-b from-cyan-400 to-blue-500 hover:scale-105' 
                  : 'bg-gray-400'
                }
                transition-transform duration-200
              `}
            >
              {/* Premium Badge */}
              {game.premium && (
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full border-2 border-white flex items-center justify-center w-8 h-8">
                  <span className="text-yellow-400 text-lg">⭐</span>
                </div>
              )}
              
              {/* Game Icon */}
              <div className="text-4xl mb-2 filter drop-shadow-lg">
                {game.unlocked ? game.icon : '🔒'}
              </div>
              
              {/* Game Name */}
              <h3 className="text-white font-bold text-xs tracking-wide drop-shadow-md">
                {game.name}
              </h3>

              {/* Lock Overlay */}
              {!game.unlocked && (
                <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl">🔒</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterGamesPage;

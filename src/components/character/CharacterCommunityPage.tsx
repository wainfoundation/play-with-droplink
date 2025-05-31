
import React from 'react';

const CharacterCommunityPage: React.FC = () => {
  const friends = [
    { name: 'Gator', icon: '🐊', position: { top: '20%', right: '20%' } },
    { name: 'Ninja', icon: '🥷', position: { bottom: '40%', left: '10%' } },
    { name: 'Rex', icon: '🦖', position: { bottom: '20%', right: '15%' } },
    { name: 'Prof. Boo', icon: '👨‍🏫', position: { bottom: '10%', right: '25%' } }
  ];

  return (
    <div className="bg-gradient-to-b from-green-400 to-green-600 min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-300 to-cyan-300 h-20 border-b-4 border-yellow-400">
        {/* Pillars */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-0 bg-yellow-200 border-2 border-yellow-400"
            style={{
              left: `${i * 16.67}%`,
              width: '60px',
              height: '80px'
            }}
          />
        ))}
      </div>

      {/* Trees */}
      <div className="absolute bottom-32 left-8">
        <div className="text-6xl">🌳</div>
      </div>
      <div className="absolute bottom-32 right-8">
        <div className="text-6xl">🌳</div>
      </div>

      {/* Central Fountain */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-b from-blue-300 to-blue-500 rounded-full w-32 h-32 border-4 border-white shadow-2xl flex items-center justify-center">
          <div className="text-4xl">⛲</div>
        </div>
      </div>

      {/* Main Character (Boo) */}
      <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-6xl mb-2">😊</div>
          <div className="bg-white rounded-full px-3 py-1 border-2 border-gray-300">
            <span className="font-bold text-gray-800 text-sm">BOO</span>
          </div>
        </div>
      </div>

      {/* Friends */}
      {friends.map((friend, index) => (
        <div 
          key={index}
          className="absolute"
          style={friend.position}
        >
          <div className="text-center">
            <div className="text-4xl mb-1">{friend.icon}</div>
            <div className="bg-white rounded-full px-2 py-1 border-2 border-gray-300">
              <span className="font-bold text-gray-800 text-xs">{friend.name}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative flowers */}
      <div className="absolute bottom-36 left-16 text-2xl">🌸</div>
      <div className="absolute bottom-44 right-20 text-2xl">🌺</div>
      <div className="absolute bottom-28 left-32 text-2xl">🌼</div>

      {/* Speech bubble */}
      <div className="absolute top-32 right-8 bg-white rounded-2xl p-3 border-2 border-gray-300 shadow-lg">
        <span className="text-sm font-bold text-gray-800">I loved your...</span>
        <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
      </div>

      {/* Path */}
      <div className="absolute bottom-20 left-0 right-0">
        <div className="bg-gray-300 h-8 mx-8 rounded-full border-2 border-gray-400 opacity-50"></div>
      </div>
    </div>
  );
};

export default CharacterCommunityPage;


import React from 'react';

interface RoomBackgroundProps {
  roomId: string;
  children: React.ReactNode;
}

const RoomBackground: React.FC<RoomBackgroundProps> = ({ roomId, children }) => {
  const getRoomStyle = (room: string) => {
    switch (room) {
      case 'kitchen':
        return 'bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50';
      case 'bathroom':
        return 'bg-gradient-to-br from-cyan-100 via-cyan-50 to-blue-50';
      case 'playroom':
        return 'bg-gradient-to-br from-green-100 via-green-50 to-emerald-50';
      case 'garden':
        return 'bg-gradient-to-br from-emerald-100 via-green-50 to-lime-50';
      case 'bedroom':
      default:
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50';
    }
  };

  const getRoomDecorations = (room: string) => {
    switch (room) {
      case 'kitchen':
        return (
          <>
            <div className="absolute top-10 left-10 text-4xl opacity-20">🍳</div>
            <div className="absolute top-20 right-16 text-3xl opacity-20">🥘</div>
            <div className="absolute bottom-32 left-20 text-5xl opacity-15">🍽️</div>
          </>
        );
      case 'bathroom':
        return (
          <>
            <div className="absolute top-16 left-12 text-4xl opacity-20">🚿</div>
            <div className="absolute top-24 right-20 text-3xl opacity-20">🧼</div>
            <div className="absolute bottom-40 right-16 text-5xl opacity-15">🛁</div>
          </>
        );
      case 'playroom':
        return (
          <>
            <div className="absolute top-12 left-16 text-4xl opacity-20">🎮</div>
            <div className="absolute top-32 right-12 text-3xl opacity-20">🧸</div>
            <div className="absolute bottom-36 left-12 text-5xl opacity-15">⚽</div>
          </>
        );
      case 'garden':
        return (
          <>
            <div className="absolute top-14 left-14 text-4xl opacity-20">🌸</div>
            <div className="absolute top-28 right-18 text-3xl opacity-20">🦋</div>
            <div className="absolute bottom-44 right-14 text-5xl opacity-15">🌳</div>
          </>
        );
      case 'bedroom':
      default:
        return (
          <>
            <div className="absolute top-16 left-16 text-4xl opacity-20">🛏️</div>
            <div className="absolute top-32 right-20 text-3xl opacity-20">🌙</div>
            <div className="absolute bottom-40 left-24 text-5xl opacity-15">💤</div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${getRoomStyle(roomId)} relative overflow-hidden transition-all duration-500`}>
      {getRoomDecorations(roomId)}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default RoomBackground;

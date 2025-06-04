
import React from 'react';

interface RoomBackgroundProps {
  roomId: string;
  children: React.ReactNode;
}

const RoomBackground: React.FC<RoomBackgroundProps> = ({ roomId, children }) => {
  const getRoomStyles = (room: string) => {
    switch (room) {
      case 'bedroom':
        return 'bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100';
      case 'kitchen':
        return 'bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100';
      case 'bathroom':
        return 'bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100';
      case 'playroom':
        return 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100';
      case 'nature':
        return 'bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100';
      case 'health':
        return 'bg-gradient-to-br from-green-100 via-white to-blue-100';
      default:
        return 'bg-gradient-to-br from-blue-50 via-white to-purple-50';
    }
  };

  const getRoomDecorations = (room: string) => {
    switch (room) {
      case 'bedroom':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">🛏️</div>
            <div className="absolute top-20 right-20 text-3xl">🌙</div>
            <div className="absolute bottom-20 right-15 text-2xl">⭐</div>
          </>
        );
      case 'kitchen':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">🍳</div>
            <div className="absolute top-20 right-20 text-3xl">🥘</div>
            <div className="absolute bottom-20 right-15 text-2xl">🍎</div>
          </>
        );
      case 'bathroom':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">🛁</div>
            <div className="absolute top-20 right-20 text-3xl">🚿</div>
            <div className="absolute bottom-20 right-15 text-2xl">🧼</div>
          </>
        );
      case 'playroom':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">🎾</div>
            <div className="absolute top-20 right-20 text-3xl">🧸</div>
            <div className="absolute bottom-20 right-15 text-2xl">🎮</div>
          </>
        );
      case 'nature':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">🌳</div>
            <div className="absolute top-20 right-20 text-3xl">🌸</div>
            <div className="absolute bottom-20 right-15 text-2xl">🦋</div>
          </>
        );
      case 'health':
        return (
          <>
            <div className="absolute bottom-10 left-10 text-4xl">💊</div>
            <div className="absolute top-20 right-20 text-3xl">🏥</div>
            <div className="absolute bottom-20 right-15 text-2xl">💉</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen relative ${getRoomStyles(roomId)}`}>
      {getRoomDecorations(roomId)}
      {children}
    </div>
  );
};

export default RoomBackground;

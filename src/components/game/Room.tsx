
import React from 'react';
import { motion } from 'framer-motion';

export interface RoomData {
  id: string;
  name: string;
  bgColor: string;
  bgGradient: string;
  icon: string;
  description: string;
}

export const rooms: RoomData[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    bgColor: 'bg-purple-100',
    bgGradient: 'from-purple-200 to-blue-200',
    icon: '🛏️',
    description: 'A cozy place to rest and sleep'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    bgColor: 'bg-orange-100',
    bgGradient: 'from-orange-200 to-yellow-200',
    icon: '🍳',
    description: 'Where delicious meals are prepared'
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    bgColor: 'bg-cyan-100',
    bgGradient: 'from-cyan-200 to-blue-200',
    icon: '🛁',
    description: 'Keep clean and fresh here'
  },
  {
    id: 'playroom',
    name: 'Playroom',
    bgColor: 'bg-pink-100',
    bgGradient: 'from-pink-200 to-purple-200',
    icon: '🎮',
    description: 'Fun and games await'
  },
  {
    id: 'health',
    name: 'Health Center',
    bgColor: 'bg-green-100',
    bgGradient: 'from-green-200 to-emerald-200',
    icon: '🏥',
    description: 'Medical care and wellness'
  },
  {
    id: 'nature',
    name: 'Garden',
    bgColor: 'bg-emerald-100',
    bgGradient: 'from-emerald-200 to-green-200',
    icon: '🌿',
    description: 'Fresh air and nature'
  }
];

interface RoomProps {
  room: RoomData;
  isActive: boolean;
  isDimmed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Room: React.FC<RoomProps> = ({
  room,
  isActive,
  isDimmed = false,
  children,
  className = ""
}) => {
  return (
    <motion.div
      className={`
        relative w-full h-full rounded-2xl overflow-hidden
        ${isDimmed ? 'bg-gray-900' : `bg-gradient-to-br ${room.bgGradient}`}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        filter: isDimmed ? 'brightness(0.3)' : 'brightness(1)'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Room decoration based on type */}
      {room.id === 'bedroom' && !isDimmed && (
        <>
          <div className="absolute top-4 right-4 text-4xl">🛏️</div>
          <div className="absolute bottom-4 left-4 text-2xl">🧸</div>
        </>
      )}
      
      {room.id === 'kitchen' && (
        <>
          <div className="absolute top-4 left-4 text-3xl">🍳</div>
          <div className="absolute top-4 right-4 text-3xl">🥘</div>
          <div className="absolute bottom-4 right-4 text-2xl">🍎</div>
        </>
      )}
      
      {room.id === 'bathroom' && (
        <>
          <div className="absolute top-4 right-4 text-4xl">🛁</div>
          <div className="absolute bottom-4 left-4 text-2xl">🧼</div>
          <div className="absolute bottom-4 right-4 text-2xl">🚿</div>
        </>
      )}
      
      {room.id === 'playroom' && (
        <>
          <div className="absolute top-4 left-4 text-3xl">🎮</div>
          <div className="absolute top-4 right-4 text-3xl">🎯</div>
          <div className="absolute bottom-4 left-4 text-2xl">⚽</div>
          <div className="absolute bottom-4 right-4 text-2xl">🧩</div>
        </>
      )}
      
      {room.id === 'health' && (
        <>
          <div className="absolute top-4 right-4 text-4xl">🏥</div>
          <div className="absolute bottom-4 left-4 text-2xl">💊</div>
          <div className="absolute bottom-4 right-4 text-2xl">🩺</div>
        </>
      )}
      
      {room.id === 'nature' && (
        <>
          <div className="absolute top-4 left-4 text-3xl">🌳</div>
          <div className="absolute top-4 right-4 text-3xl">🌸</div>
          <div className="absolute bottom-4 left-4 text-2xl">🦋</div>
          <div className="absolute bottom-4 right-4 text-2xl">🌻</div>
        </>
      )}
      
      {/* Night overlay for bedroom when dimmed */}
      {isDimmed && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-6xl">🌙</div>
        </div>
      )}
      
      {children}
    </motion.div>
  );
};

export default Room;

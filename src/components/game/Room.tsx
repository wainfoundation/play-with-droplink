
import React from 'react';
import { cn } from '@/lib/utils';

export interface RoomData {
  id: string;
  name: string;
  icon: string;
  backgroundColor: string;
  description?: string;
}

export const rooms: RoomData[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    backgroundColor: 'bg-gradient-to-br from-purple-100 to-blue-100',
    description: 'A cozy place for your pet to rest'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    backgroundColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    description: 'Feed your hungry pet here'
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: '🛁',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    description: 'Keep your pet clean and fresh'
  },
  {
    id: 'playroom',
    name: 'Playroom',
    icon: '🧸',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-purple-100',
    description: 'Fun activities and games'
  },
  {
    id: 'nature',
    name: 'Garden',
    icon: '🌳',
    backgroundColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    description: 'Fresh air and nature'
  },
  {
    id: 'clinic',
    name: 'Clinic',
    icon: '🏥',
    backgroundColor: 'bg-gradient-to-br from-red-100 to-pink-100',
    description: 'Health care for your pet'
  }
];

interface RoomProps {
  room: RoomData;
  isActive?: boolean;
  isDimmed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Room: React.FC<RoomProps> = ({
  room,
  isActive = false,
  isDimmed = false,
  children,
  className
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-full transition-all duration-500',
        room.backgroundColor,
        isDimmed && 'brightness-50',
        isActive && 'shadow-inner',
        className
      )}
    >
      {/* Room content */}
      <div className="absolute inset-0">
        {children}
      </div>
      
      {/* Dimmed overlay for sleep mode */}
      {isDimmed && (
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-500" />
      )}
    </div>
  );
};

export default Room;


import React from 'react';
import { Button } from '@/components/ui/button';

export type Room = 'bedroom' | 'kitchen' | 'bathroom' | 'playroom' | 'nature' | 'health';

export const rooms = [
  { id: 'bedroom' as Room, name: 'Bedroom', icon: '🛏️', bgColor: 'from-blue-400 to-purple-500' },
  { id: 'kitchen' as Room, name: 'Kitchen', icon: '🍳', bgColor: 'from-orange-400 to-red-500' },
  { id: 'bathroom' as Room, name: 'Bathroom', icon: '🛁', bgColor: 'from-cyan-400 to-blue-500' },
  { id: 'playroom' as Room, name: 'Playroom', icon: '🎮', bgColor: 'from-green-400 to-teal-500' },
  { id: 'nature' as Room, name: 'Nature', icon: '🌿', bgColor: 'from-green-500 to-emerald-600' },
  { id: 'health' as Room, name: 'Health', icon: '🏥', bgColor: 'from-pink-400 to-rose-500' }
];

interface PetGameRoomsProps {
  currentRoom: Room;
  onRoomChange: (room: Room) => void;
}

const PetGameRooms: React.FC<PetGameRoomsProps> = ({ currentRoom, onRoomChange }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
      <div className="flex justify-center">
        <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
          {rooms.map((room) => (
            <Button
              key={room.id}
              variant={currentRoom === room.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onRoomChange(room.id)}
              className={`text-xs ${currentRoom === room.id ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
            >
              <span className="mr-1">{room.icon}</span>
              {room.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetGameRooms;

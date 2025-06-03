
import React from 'react';
import { Button } from '@/components/ui/button';

type Room = 'bedroom' | 'kitchen' | 'bathroom' | 'playroom' | 'nature' | 'health';

interface PetGameRoomsProps {
  currentRoom: Room;
  onRoomChange: (room: Room) => void;
}

const rooms: { id: Room; name: string; emoji: string; bgColor: string }[] = [
  { id: 'bedroom', name: 'Bedroom', emoji: '🛏️', bgColor: 'from-purple-100 to-blue-100' },
  { id: 'kitchen', name: 'Kitchen', emoji: '🍳', bgColor: 'from-orange-100 to-yellow-100' },
  { id: 'bathroom', name: 'Bathroom', emoji: '🛁', bgColor: 'from-blue-100 to-cyan-100' },
  { id: 'playroom', name: 'Playroom', emoji: '🧸', bgColor: 'from-pink-100 to-purple-100' },
  { id: 'nature', name: 'Nature', emoji: '🌳', bgColor: 'from-green-100 to-emerald-100' },
  { id: 'health', name: 'Health', emoji: '🏥', bgColor: 'from-red-100 to-pink-100' }
];

const PetGameRooms: React.FC<PetGameRoomsProps> = ({
  currentRoom,
  onRoomChange
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
      <div className="flex justify-center gap-2 overflow-x-auto">
        {rooms.map(room => (
          <Button
            key={room.id}
            variant={currentRoom === room.id ? "default" : "outline"}
            size="sm"
            onClick={() => onRoomChange(room.id)}
            className="min-w-fit bg-white/80 backdrop-blur-sm"
          >
            <span className="mr-1">{room.emoji}</span>
            {room.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PetGameRooms;
export { rooms };
export type { Room };

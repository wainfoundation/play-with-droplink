
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRooms, Room } from '@/hooks/useRooms';

interface RoomSelectorProps {
  onSelectRoom: (room: Room) => void;
  onBack: () => void;
}

const getRoomIcon = (roomType: string) => {
  switch (roomType) {
    case 'kitchen': return '🍽️';
    case 'bath': return '🛁';
    case 'play': return '🎮';
    case 'medicine': return '💊';
    case 'outside': return '🌳';
    default: return '🏠';
  }
};

const RoomSelector: React.FC<RoomSelectorProps> = ({ onSelectRoom, onBack }) => {
  const { rooms, loading } = useRooms();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose a Room</h1>
          <p className="text-gray-600">Select where you'd like to spend time with your pet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className="cursor-pointer border-4 border-transparent hover:border-primary/50 transition-all duration-200"
                onClick={() => onSelectRoom(room)}
                style={{ backgroundColor: room.background_color }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">
                    {getRoomIcon(room.room_type)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-gray-600 text-sm">{room.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;

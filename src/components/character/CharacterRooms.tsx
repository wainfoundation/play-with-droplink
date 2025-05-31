
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { CharacterCustomization } from './types';

interface CharacterRoomsProps {
  character: CharacterCustomization;
  currentRoom: string;
  onRoomChange: (room: string) => void;
  onUnlockRoom: (room: string) => void;
  userCoins: number;
}

const CharacterRooms: React.FC<CharacterRoomsProps> = ({
  character,
  currentRoom,
  onRoomChange,
  onUnlockRoom,
  userCoins
}) => {
  const rooms = [
    { 
      id: 'bedroom', 
      name: 'Bedroom', 
      icon: '🛏️', 
      description: 'A cozy place to rest',
      unlockCost: 0,
      color: 'from-blue-200 to-blue-300'
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      icon: '🍳', 
      description: 'Cook delicious meals',
      unlockCost: 100,
      color: 'from-orange-200 to-orange-300'
    },
    { 
      id: 'bathroom', 
      name: 'Bathroom', 
      icon: '🛁', 
      description: 'Stay clean and fresh',
      unlockCost: 150,
      color: 'from-cyan-200 to-cyan-300'
    },
    { 
      id: 'garden', 
      name: 'Garden', 
      icon: '🌸', 
      description: 'Enjoy nature and play',
      unlockCost: 200,
      color: 'from-green-200 to-green-300'
    },
    { 
      id: 'shop', 
      name: 'Shop', 
      icon: '🛍️', 
      description: 'Buy items and accessories',
      unlockCost: 300,
      color: 'from-purple-200 to-purple-300'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Room Explorer</CardTitle>
          <p className="text-sm text-gray-600">
            Explore different rooms with your character!
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => {
              const isUnlocked = character.unlocked_rooms.includes(room.id);
              const isActive = currentRoom === room.id;
              const canAfford = userCoins >= room.unlockCost;

              return (
                <Card 
                  key={room.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isActive ? 'ring-2 ring-primary' : ''
                  } ${!isUnlocked ? 'opacity-75' : ''}`}
                  onClick={() => isUnlocked && onRoomChange(room.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${room.color} flex items-center justify-center mb-3`}>
                      <div className="text-6xl">{room.icon}</div>
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{room.name}</h3>
                        {isActive && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600">{room.description}</p>
                      
                      {!isUnlocked && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-yellow-600">
                            💰 {room.unlockCost} coins
                          </span>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (canAfford) {
                                onUnlockRoom(room.id);
                              }
                            }}
                            disabled={!canAfford}
                            className="text-xs"
                          >
                            {canAfford ? 'Unlock' : 'Need more coins'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterRooms;

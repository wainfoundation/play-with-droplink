
import React, { useState } from 'react';
import { ArrowLeft, Store, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CharacterShop from '@/components/shop/CharacterShop';
import RoomSelector from '@/components/rooms/RoomSelector';
import RoomActivity from '@/components/rooms/RoomActivity';
import RealTimePetCare from '@/components/games/RealTimePetCare';
import { useCharacterShop } from '@/hooks/useCharacterShop';
import { useAuth } from '@/hooks/useAuth';
import { Room } from '@/hooks/useRooms';

interface NewPetCareGameProps {
  onBack: () => void;
}

type GameScreen = 'main' | 'shop' | 'rooms' | 'room-activity' | 'legacy-care';

const NewPetCareGame: React.FC<NewPetCareGameProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('main');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const { 
    characters, 
    selectedCharacterId, 
    wallet, 
    loading 
  } = useCharacterShop();

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setCurrentScreen('room-activity');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedRoom(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Character Shop Screen
  if (currentScreen === 'shop') {
    return <CharacterShop onBack={handleBackToMain} />;
  }

  // Room Selector Screen
  if (currentScreen === 'rooms') {
    return <RoomSelector onSelectRoom={handleRoomSelect} onBack={handleBackToMain} />;
  }

  // Room Activity Screen
  if (currentScreen === 'room-activity' && selectedRoom) {
    return <RoomActivity room={selectedRoom} onBack={() => setCurrentScreen('rooms')} />;
  }

  // Legacy Pet Care Screen
  if (currentScreen === 'legacy-care' && selectedCharacter) {
    return <RealTimePetCare character={selectedCharacter} />;
  }

  // Main Game Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
          
          {user && wallet && (
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
              <span className="text-yellow-600">💰</span>
              <span className="font-bold text-yellow-800">{wallet.droplet_coins}</span>
            </div>
          )}
        </div>

        {/* Welcome Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              🏠 Pet Care Center
            </CardTitle>
            <p className="text-center text-gray-600">
              Take care of your virtual pet in different rooms and environments
            </p>
          </CardHeader>
        </Card>

        {/* Character Status */}
        {selectedCharacter ? (
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedCharacter.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCharacter.description}</p>
                </div>
                <Badge className="bg-green-500 text-white">Active Character</Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">No Character Selected</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please choose a character from the shop to start caring for your pet
              </p>
              <Button onClick={() => setCurrentScreen('shop')}>
                Go to Character Shop
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('shop')}>
            <CardContent className="p-6 text-center">
              <Store className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Character Shop</h3>
              <p className="text-sm text-gray-600">Buy new characters and earn coins</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              !selectedCharacter ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => selectedCharacter && setCurrentScreen('rooms')}
          >
            <CardContent className="p-6 text-center">
              <Home className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Choose Room</h3>
              <p className="text-sm text-gray-600">Visit different rooms for activities</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              !selectedCharacter ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => selectedCharacter && setCurrentScreen('legacy-care')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-green-500 text-2xl">🎮</div>
              <h3 className="text-xl font-semibold mb-2">Quick Care</h3>
              <p className="text-sm text-gray-600">Direct pet care and interaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Prompt for non-authenticated users */}
        {!user && (
          <Card className="mt-6 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">🔐 Enhanced Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                Log in to save your progress, buy characters, and access all premium features
              </p>
              <Button variant="outline">Login / Sign Up</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewPetCareGame;

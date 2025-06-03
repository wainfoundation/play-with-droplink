
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Home, 
  Menu, 
  X, 
  Lightbulb, 
  LightbulbOff,
  Settings,
  ShoppingBag,
  Package,
  BarChart3,
  Wallet
} from 'lucide-react';
import { useGameData } from '@/hooks/useGameData';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import PetCharacter from '@/components/game/PetCharacter';
import Room, { rooms } from '@/components/game/Room';
import StatsDisplay from '@/components/game/StatsDisplay';
import InventoryDragDrop from '@/components/game/InventoryDragDrop';
import { toast } from '@/hooks/use-toast';

const PlayWithMascot: React.FC = () => {
  const { user } = useAuthSystem();
  const { petStats, userProfile, inventory, loading, useItem, changeRoom } = useGameData();
  const [showMenu, setShowMenu] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('bedroom');

  const currentRoom = rooms.find(r => r.id === selectedRoom) || rooms[0];
  const isAsleep = selectedRoom === 'bedroom' && !isLampOn;

  // Handle item drop on pet
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      const success = await useItem(itemId);
      if (success) {
        toast({
          title: "Item used!",
          description: "Your pet feels better!",
          className: "bg-green-50 border-green-200"
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle room change
  const handleRoomChange = async (roomId: string) => {
    setSelectedRoom(roomId);
    await changeRoom(roomId);
    
    // Room-specific effects
    if (roomId === 'nature' && petStats) {
      toast({
        title: "Fresh air!",
        description: "Your pet feels happier in nature",
        className: "bg-green-50 border-green-200"
      });
    }
    
    if (roomId === 'bedroom') {
      setIsLampOn(true); // Reset lamp when entering bedroom
    }
  };

  // Handle lamp toggle in bedroom
  const handleLampToggle = () => {
    if (selectedRoom === 'bedroom') {
      setIsLampOn(!isLampOn);
      if (!isLampOn) {
        toast({
          title: "Good night!",
          description: "Your pet is sleeping peacefully",
          className: "bg-purple-50 border-purple-200"
        });
      }
    }
  };

  // Auto-decay stats every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (petStats && !isAsleep) {
        // Stats naturally decay over time (handled by database function)
        console.log('Stats decay check...');
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [petStats, isAsleep]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading your pet...</p>
        </div>
      </div>
    );
  }

  if (!user || !petStats || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Welcome to Droplet Pet!</h2>
            <p className="text-gray-600 mb-4">Please log in to start playing with your pet.</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Play with {userProfile.display_name || 'Your'} Pet - Droplet Pet</title>
        <meta name="description" content="Take care of your virtual pet droplet" />
      </Helmet>
      
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="bg-white/80 backdrop-blur-sm"
              >
                {showMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                💰 {userProfile.droplet_coins} Coins
              </Badge>
            </div>
            
            {selectedRoom === 'bedroom' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLampToggle}
                className="bg-white/80 backdrop-blur-sm"
              >
                {isLampOn ? <Lightbulb className="h-4 w-4" /> : <LightbulbOff className="h-4 w-4" />}
                {isLampOn ? 'Lights On' : 'Lights Off'}
              </Button>
            )}
          </div>
        </div>

        {/* Side Menu */}
        {showMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute top-0 left-0 bottom-0 z-30 w-64 bg-white shadow-lg"
          >
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">Game Menu</h2>
            </div>
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/'}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/shop'}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/inventory'}
              >
                <Package className="h-4 w-4 mr-2" />
                Inventory
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/stats'}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Stats
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/wallet'}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => window.location.href = '/settings'}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>
        )}

        {/* Main Game Area */}
        <div className="flex h-full pt-16">
          {/* Room Display */}
          <div className="flex-1 relative">
            <Room
              room={currentRoom}
              isActive={true}
              isDimmed={isAsleep}
              className="h-full"
            >
              {/* Pet Character */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <PetCharacter
                  characterId={petStats.character_id}
                  mood={petStats.mood}
                  isAsleep={isAsleep}
                  size="large"
                />
              </div>
              
              {/* Room name */}
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                  {currentRoom.icon} {currentRoom.name}
                </Badge>
              </div>
            </Room>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 p-4 space-y-4 overflow-y-auto">
            {/* Pet Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Pet Stats</h3>
                <StatsDisplay stats={petStats} />
              </CardContent>
            </Card>

            {/* Room Navigation */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Rooms</h3>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.map((room) => (
                    <Button
                      key={room.id}
                      variant={selectedRoom === room.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoomChange(room.id)}
                      className="flex flex-col p-3 h-auto"
                    >
                      <span className="text-lg mb-1">{room.icon}</span>
                      <span className="text-xs">{room.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <InventoryDragDrop
              inventory={inventory}
              onUseItem={useItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayWithMascot;

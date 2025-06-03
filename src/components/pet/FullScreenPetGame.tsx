
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, Home, ShoppingBag, Package, Wallet, 
  Trophy, Gift, Settings, User, Heart,
  Gamepad2, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { useWallet } from '@/hooks/useWallet';
import { usePetStats } from '@/hooks/usePetStats';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import PetShop from '@/components/economy/PetShop';
import PetInventory from '@/components/pet/PetInventory';
import WalletDisplay from '@/components/economy/WalletDisplay';
import MiniGameHub from '@/components/games/MiniGameHub';
import DailyRewards from '@/components/rewards/DailyRewards';

type GameView = 'home' | 'shop' | 'inventory' | 'wallet' | 'games' | 'rewards' | 'profile';
type Room = 'bedroom' | 'kitchen' | 'bathroom' | 'playroom' | 'nature' | 'health';

const rooms: { id: Room; name: string; emoji: string; bgColor: string }[] = [
  { id: 'bedroom', name: 'Bedroom', emoji: '🛏️', bgColor: 'from-purple-100 to-blue-100' },
  { id: 'kitchen', name: 'Kitchen', emoji: '🍳', bgColor: 'from-orange-100 to-yellow-100' },
  { id: 'bathroom', name: 'Bathroom', emoji: '🛁', bgColor: 'from-blue-100 to-cyan-100' },
  { id: 'playroom', name: 'Playroom', emoji: '🧸', bgColor: 'from-pink-100 to-purple-100' },
  { id: 'nature', name: 'Nature', emoji: '🌳', bgColor: 'from-green-100 to-emerald-100' },
  { id: 'health', name: 'Health', emoji: '🏥', bgColor: 'from-red-100 to-pink-100' }
];

const FullScreenPetGame: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>('home');
  const [currentRoom, setCurrentRoom] = useState<Room>('bedroom');
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuthSystem();
  const { wallet } = useWallet();
  const { petStats, updateStat } = usePetStats();

  // Get selected character or default
  const selectedCharacter = characters.find(c => c.id === 'droplet-blue') || characters[0];
  
  // Create character with current pet mood
  const currentCharacter = {
    ...selectedCharacter,
    mood: petStats?.mood || 'happy'
  };

  const currentRoomData = rooms.find(r => r.id === currentRoom) || rooms[0];

  const menuItems = [
    { id: 'home' as GameView, label: 'Home', icon: Home },
    { id: 'shop' as GameView, label: 'Shop', icon: ShoppingBag },
    { id: 'inventory' as GameView, label: 'Inventory', icon: Package },
    { id: 'wallet' as GameView, label: 'Wallet', icon: Wallet },
    { id: 'games' as GameView, label: 'Games', icon: Gamepad2 },
    { id: 'rewards' as GameView, label: 'Rewards', icon: Gift },
    { id: 'profile' as GameView, label: 'Profile', icon: User },
  ];

  const handleItemPurchased = () => {
    // Refresh pet stats or handle post-purchase logic
    console.log('Item purchased');
  };

  if (currentView === 'shop') {
    return <PetShop onBack={() => setCurrentView('home')} onItemPurchased={handleItemPurchased} />;
  }

  if (currentView === 'inventory') {
    return <PetInventory onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'games') {
    return <MiniGameHub onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'rewards') {
    return <DailyRewards onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'wallet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentView('home')}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">My Wallet</h1>
            <div></div>
          </div>
          <WalletDisplay dropletCoins={wallet.dropletCoins} />
        </div>
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentView('home')}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Profile</h1>
            <div></div>
          </div>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <CharacterRenderer character={currentCharacter} size={100} />
              </div>
              <h2 className="text-xl font-bold mb-2">{user?.username || 'Player'}</h2>
              <div className="space-y-2">
                <Badge variant="outline">Level 1</Badge>
                <Badge variant="outline">{wallet.dropletCoins} Coins</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br overflow-hidden" style={{
      background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
    }} className={`min-h-screen bg-gradient-to-br ${currentRoomData.bgColor}`}>
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/80 backdrop-blur-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Heart className="h-3 w-3 mr-1 text-red-500" />
              {petStats?.happiness || 80}
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              💰 {wallet.dropletCoins}
            </Badge>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute top-0 left-0 z-30 h-full w-64 bg-white/95 backdrop-blur-lg shadow-xl"
          >
            <div className="p-4 space-y-2">
              <div className="text-lg font-bold mb-4">Menu</div>
              {menuItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView(item.id);
                    setShowMenu(false);
                  }}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Selector */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="flex justify-center gap-2 overflow-x-auto">
          {rooms.map(room => (
            <Button
              key={room.id}
              variant={currentRoom === room.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentRoom(room.id)}
              className="min-w-fit bg-white/80 backdrop-blur-sm"
            >
              <span className="mr-1">{room.emoji}</span>
              {room.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Pet Area */}
      <div className="flex items-center justify-center h-full p-20">
        <motion.div
          key={currentRoom}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-4">
            <CharacterRenderer character={currentCharacter} size={200} />
          </div>
          <div className="text-2xl font-bold mb-2">
            Welcome to the {currentRoomData.name}!
          </div>
          <p className="text-gray-600 mb-4">
            Your droplet is feeling {petStats?.mood || 'happy'} today
          </p>
          
          {/* Pet Stats */}
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="outline">😋 Hunger: {petStats?.hunger || 60}</Badge>
            <Badge variant="outline">⚡ Energy: {petStats?.energy || 85}</Badge>
            <Badge variant="outline">🧼 Clean: {petStats?.cleanliness || 70}</Badge>
          </div>
          
          {/* Room-specific actions */}
          <div className="flex justify-center gap-2">
            {currentRoom === 'kitchen' && (
              <Button onClick={() => updateStat('hunger', 10)}>
                🍎 Feed Pet
              </Button>
            )}
            {currentRoom === 'bathroom' && (
              <Button onClick={() => updateStat('cleanliness', 15)}>
                🛁 Clean Pet
              </Button>
            )}
            {currentRoom === 'bedroom' && (
              <Button onClick={() => updateStat('energy', 20)}>
                😴 Rest
              </Button>
            )}
            {currentRoom === 'playroom' && (
              <Button onClick={() => updateStat('happiness', 10)}>
                🎾 Play
              </Button>
            )}
            {currentRoom === 'nature' && (
              <Button onClick={() => updateStat('happiness', 5)}>
                🌳 Explore
              </Button>
            )}
            {currentRoom === 'health' && (
              <Button onClick={() => updateStat('health', 10)}>
                💊 Heal
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Background overlay for menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-25"
            onClick={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullScreenPetGame;

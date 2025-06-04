
import React, { useState } from 'react';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { useWallet } from '@/hooks/useWallet';
import { usePetStats } from '@/hooks/usePetStats';
import { characters } from '@/components/welcome/characterData';
import PetShop from '@/components/economy/PetShop';
import PetInventory from '@/components/pet/PetInventory';
import MiniGameHub from '@/components/games/MiniGameHub';
import DailyRewards from '@/components/rewards/DailyRewards';
import PetGameHeader from './PetGameHeader';
import PetGameMenu from './PetGameMenu';
import PetGameRooms, { Room, rooms } from './PetGameRooms';
import PetGameViews from './PetGameViews';
import PetMainArea from './PetMainArea';

type GameView = 'home' | 'shop' | 'inventory' | 'wallet' | 'games' | 'rewards' | 'profile';

const FullScreenPetGame: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>('home');
  const [currentRoom, setCurrentRoom] = useState<Room>('bedroom');
  const [showMenu, setShowMenu] = useState(false);
  const { user, profile } = useAuthSystem();
  const { balance } = useWallet();
  const { petStats, updateStat } = usePetStats();

  // Get selected character or default
  const selectedCharacter = characters.find(c => c.id === 'droplet-blue') || characters[0];
  
  // Create character with current pet mood
  const currentCharacter = {
    ...selectedCharacter,
    mood: petStats?.mood || 'happy'
  };

  const currentRoomData = rooms.find(r => r.id === currentRoom) || rooms[0];

  const handleItemPurchased = () => {
    console.log('Item purchased');
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleViewChange = (view: GameView) => {
    setCurrentView(view);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  // Handle different views
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

  if (currentView === 'wallet' || currentView === 'profile') {
    return (
      <PetGameViews
        currentView={currentView}
        onBack={() => setCurrentView('home')}
        wallet={{ dropletCoins: balance }}
        user={user}
        profile={profile}
        selectedCharacter={currentCharacter}
      />
    );
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br overflow-hidden min-h-screen ${currentRoomData.bgColor}`}>
      <PetGameHeader
        showMenu={showMenu}
        onToggleMenu={handleMenuToggle}
        happiness={petStats?.happiness || 80}
        dropletCoins={balance}
      />

      <PetGameMenu
        showMenu={showMenu}
        currentView={currentView}
        onViewChange={handleViewChange}
        onClose={handleMenuClose}
      />

      <PetGameRooms
        currentRoom={currentRoom}
        onRoomChange={setCurrentRoom}
      />

      <PetMainArea
        currentRoom={currentRoom}
        currentCharacter={currentCharacter}
        petStats={petStats}
        currentRoomData={currentRoomData}
        onUpdateStat={updateStat}
      />
    </div>
  );
};

export default FullScreenPetGame;

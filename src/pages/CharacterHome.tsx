
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useCharacter } from '@/hooks/useCharacter';
import Navbar from '@/components/Navbar';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import CharacterHomeHeader from '@/components/character/CharacterHomeHeader';
import CharacterTabContent from '@/components/character/CharacterTabContent';
import CharacterNavigation from '@/components/character/CharacterNavigation';
import CharacterStats from '@/components/character/CharacterStats';
import { useCharacterInteractionHandler } from '@/components/character/CharacterInteractionHandler';

const CharacterHome = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { character, loading: characterLoading, updateStats, unlockRoom } = useCharacter();
  
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [activeTab, setActiveTab] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [coins, setCoins] = useState(1125);
  const [level, setLevel] = useState(2);

  const { handleCharacterInteraction } = useCharacterInteractionHandler({
    character,
    soundEnabled,
    updateStats,
    setCoins
  });

  // Background music control
  useEffect(() => {
    if (soundEnabled) {
      musicController.start();
    } else {
      musicController.stop();
    }

    return () => {
      musicController.stop();
    };
  }, [soundEnabled, musicController]);

  // Redirect to welcome if no character
  useEffect(() => {
    if (isLoggedIn && !characterLoading && !character) {
      window.location.href = '/welcome';
    }
  }, [isLoggedIn, character, characterLoading]);

  const handleRoomChange = (room: string) => {
    if (character?.unlocked_rooms.includes(room)) {
      setCurrentRoom(room);
      if (soundEnabled) sounds.click();
    } else {
      toast({
        title: "Room Locked!",
        description: "Complete more activities to unlock this room!",
        variant: "destructive"
      });
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      sounds.click();
    }
  };

  const handlePurchase = (item: any) => {
    if (coins >= item.price) {
      setCoins(prev => prev - item.price);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${item.name}!`,
      });
    } else {
      toast({
        title: "Not enough coins!",
        description: "Complete more activities to earn coins!",
        variant: "destructive"
      });
    }
  };

  const handleGameComplete = (score: number) => {
    setCoins(prev => prev + score);
    toast({
      title: "Great Job!",
      description: `You earned ${score} coins!`,
    });
  };

  if (characterLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your character...</p>
          </div>
        </div>
      </>
    );
  }

  if (!character) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Character Found</h1>
            <p className="text-gray-600 mb-4">Please create a character first.</p>
            <a href="/welcome" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
              Create Character
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Character - {character.name}</title>
        <meta name="description" content={`Take care of your virtual character ${character.name} and explore different rooms!`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100">
        <Navbar />
        
        <CharacterHomeHeader
          character={character}
          level={level}
          coins={coins}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Character Display */}
            <div className="lg:col-span-2">
              <CharacterTabContent
                activeTab={activeTab}
                character={character}
                currentRoom={currentRoom}
                coins={coins}
                soundEnabled={soundEnabled}
                onInteraction={handleCharacterInteraction}
                onRoomChange={handleRoomChange}
                onUnlockRoom={unlockRoom}
                onPurchase={handlePurchase}
                onGameComplete={handleGameComplete}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CharacterStats
                character={character}
                onStatsUpdate={updateStats}
              />
              
              <CharacterNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                unlockedTabs={character.tutorial_completed ? ['home', 'rooms', 'shop', 'games'] : ['home']}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterHome;

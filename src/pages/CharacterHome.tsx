
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useCharacter } from '@/hooks/useCharacter';
import Navbar from '@/components/Navbar';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import CharacterDisplay from '@/components/character/CharacterDisplay';
import CharacterNavigation from '@/components/character/CharacterNavigation';
import CharacterRooms from '@/components/character/CharacterRooms';
import CharacterShop from '@/components/character/CharacterShop';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterMiniGames from '@/components/character/CharacterMiniGames';

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

  const handleCharacterInteraction = async (type: string) => {
    if (!character) return;

    let newStats = { ...character.stats };
    let coinsEarned = 0;

    // Update stats based on interaction
    if (type === 'feed') {
      newStats.hunger = Math.min(100, newStats.hunger + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 10);
      coinsEarned = 10;
    } else if (type === 'play') {
      newStats.happiness = Math.min(100, newStats.happiness + 20);
      newStats.energy = Math.max(0, newStats.energy - 10);
      coinsEarned = 15;
    } else if (type === 'clean') {
      newStats.cleanliness = Math.min(100, newStats.cleanliness + 30);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 8;
    } else if (type === 'sleep') {
      newStats.energy = Math.min(100, newStats.energy + 25);
      newStats.happiness = Math.min(100, newStats.happiness + 5);
      coinsEarned = 5;
    }

    await updateStats(newStats);
    setCoins(prev => prev + coinsEarned);

    if (soundEnabled) sounds.powerup();
    
    toast({
      title: "Great!",
      description: `Your ${character.name} enjoyed ${type}ing! +${coinsEarned} coins`,
    });
  };

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
        
        {/* Character Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-white">
                <h1 className="text-2xl font-bold">{character.name}</h1>
                <p className="text-purple-100">Level {level}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 px-4 py-2 rounded-full text-white font-bold">
                💰 {coins.toLocaleString()}
              </div>
              <button
                onClick={toggleSound}
                className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Character Display */}
            <div className="lg:col-span-2">
              {activeTab === 'home' && (
                <CharacterDisplay
                  character={character}
                  currentRoom={currentRoom}
                  onInteraction={handleCharacterInteraction}
                  soundEnabled={soundEnabled}
                />
              )}
              
              {activeTab === 'rooms' && (
                <CharacterRooms
                  character={character}
                  currentRoom={currentRoom}
                  onRoomChange={handleRoomChange}
                  onUnlockRoom={unlockRoom}
                  userCoins={coins}
                />
              )}
              
              {activeTab === 'shop' && (
                <CharacterShop
                  character={character}
                  userCoins={coins}
                  onPurchase={(item) => {
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
                  }}
                />
              )}
              
              {activeTab === 'games' && (
                <CharacterMiniGames
                  character={character}
                  onGameComplete={(score) => {
                    setCoins(prev => prev + score);
                    toast({
                      title: "Great Job!",
                      description: `You earned ${score} coins!`,
                    });
                  }}
                />
              )}
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

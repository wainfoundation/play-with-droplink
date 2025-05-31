
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import CharacterHomeHeader from '@/components/character/CharacterHomeHeader';
import CharacterBottomNavigation from '@/components/character/CharacterBottomNavigation';
import CharacterMainDisplay from '@/components/character/CharacterMainDisplay';
import CharacterStylePage from '@/components/character/CharacterStylePage';
import CharacterGamesPage from '@/components/character/CharacterGamesPage';
import CharacterCommunityPage from '@/components/character/CharacterCommunityPage';

// Mock character data for now
const mockCharacter = {
  id: 'mock-1',
  name: 'Boo',
  color: '#FFE4B5',
  background: 'bedroom',
  accessories: [],
  stats: {
    happiness: 90,
    energy: 85,
    cleanliness: 70,
    hunger: 60
  },
  tutorial_completed: true,
  unlocked_rooms: ['bedroom'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const CharacterHome = () => {
  const { toast } = useToast();
  
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [activeTab, setActiveTab] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicController] = useState(() => createBackgroundMusicController());
  const [coins, setCoins] = useState(1125);
  const [level, setLevel] = useState(2);
  const [character] = useState(mockCharacter);

  const handleCharacterInteraction = (interaction: string) => {
    // Mock interaction handler
    console.log('Character interaction:', interaction);
    
    if (soundEnabled) {
      sounds.click();
    }
    
    // Mock stat updates
    const messages = {
      feed: "Boo enjoyed the meal! +10 Food",
      play: "Boo had fun playing! +15 Energy", 
      sleep: "Boo took a nice nap! +20 Energy",
      drink: "Boo quenched their thirst! +10 Water"
    };
    
    const message = messages[interaction as keyof typeof messages] || "Boo enjoyed that!";
    
    toast({
      title: "Character Interaction",
      description: message,
    });
    
    // Mock coin reward
    setCoins(prev => prev + 5);
  };

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

  const handleRoomChange = (room: string) => {
    setCurrentRoom(room);
    if (soundEnabled) sounds.click();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      sounds.click();
    }
  };

  const handleStyleChange = (style: any) => {
    // Handle style changes here
    console.log('Style changed:', style);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <CharacterMainDisplay
            character={character}
            currentRoom={currentRoom}
            onRoomChange={handleRoomChange}
            onInteraction={handleCharacterInteraction}
          />
        );
      case 'style':
        return (
          <CharacterStylePage
            character={character}
            onStyleChange={handleStyleChange}
          />
        );
      case 'games':
        return <CharacterGamesPage />;
      case 'community':
        return <CharacterCommunityPage />;
      default:
        return (
          <CharacterMainDisplay
            character={character}
            currentRoom={currentRoom}
            onRoomChange={handleRoomChange}
            onInteraction={handleCharacterInteraction}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>My Character - {character.name}</title>
        <meta name="description" content={`Take care of your virtual character ${character.name} and explore different rooms!`} />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <CharacterHomeHeader
          character={character}
          level={level}
          coins={coins}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        <div className="pb-24">
          {renderContent()}
        </div>

        <CharacterBottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </>
  );
};

export default CharacterHome;

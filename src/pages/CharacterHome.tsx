
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { useCharacter } from '@/hooks/useCharacter';
import { sounds, createBackgroundMusicController } from '@/utils/sounds';
import CharacterHomeHeader from '@/components/character/CharacterHomeHeader';
import CharacterBottomNavigation from '@/components/character/CharacterBottomNavigation';
import CharacterMainDisplay from '@/components/character/CharacterMainDisplay';
import CharacterStylePage from '@/components/character/CharacterStylePage';
import CharacterGamesPage from '@/components/character/CharacterGamesPage';
import CharacterCommunityPage from '@/components/character/CharacterCommunityPage';
import { useCharacterInteractionHandler } from '@/components/character/CharacterInteractionHandler';

const CharacterHome = () => {
  const { user, isLoggedIn } = useUser();
  const { toast } = useToast();
  const { character, loading: characterLoading, updateStats } = useCharacter();
  
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

  if (characterLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your character...</p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Character Found</h1>
          <p className="text-gray-600 mb-4">Please create a character first.</p>
          <a href="/welcome" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
            Create Character
          </a>
        </div>
      </div>
    );
  }

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

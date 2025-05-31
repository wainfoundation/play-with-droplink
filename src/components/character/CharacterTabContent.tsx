
import React from 'react';
import CharacterDisplay from './CharacterDisplay';
import CharacterRooms from './CharacterRooms';
import CharacterShop from './CharacterShop';
import CharacterMiniGames from './CharacterMiniGames';
import { CharacterCustomization } from './types';

interface CharacterTabContentProps {
  activeTab: string;
  character: CharacterCustomization;
  currentRoom: string;
  coins: number;
  soundEnabled: boolean;
  onInteraction: (type: string) => void;
  onRoomChange: (room: string) => void;
  onUnlockRoom: (room: string) => Promise<boolean>;
  onPurchase: (item: any) => void;
  onGameComplete: (score: number) => void;
}

const CharacterTabContent: React.FC<CharacterTabContentProps> = ({
  activeTab,
  character,
  currentRoom,
  coins,
  soundEnabled,
  onInteraction,
  onRoomChange,
  onUnlockRoom,
  onPurchase,
  onGameComplete
}) => {
  switch (activeTab) {
    case 'home':
      return (
        <CharacterDisplay
          character={character}
          currentRoom={currentRoom}
          onInteraction={onInteraction}
          soundEnabled={soundEnabled}
        />
      );
      
    case 'rooms':
      return (
        <CharacterRooms
          character={character}
          currentRoom={currentRoom}
          onRoomChange={onRoomChange}
          onUnlockRoom={onUnlockRoom}
          userCoins={coins}
        />
      );
      
    case 'shop':
      return (
        <CharacterShop
          character={character}
          userCoins={coins}
          onPurchase={onPurchase}
        />
      );
      
    case 'games':
      return (
        <CharacterMiniGames
          character={character}
          onGameComplete={onGameComplete}
        />
      );
      
    default:
      return null;
  }
};

export default CharacterTabContent;

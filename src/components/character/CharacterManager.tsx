
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Settings } from 'lucide-react';
import CharacterCustomizer from './CharacterCustomizer';
import CharacterPet from './CharacterPet';
import PiAdsNetwork from '@/components/PiAdsNetwork';
import { CharacterCustomization, CharacterStats, ShopItem, PetInteraction } from './types';

interface CharacterManagerProps {
  character: CharacterCustomization;
  characterStats: CharacterStats;
  activeTab: string;
  soundEnabled: boolean;
  onCharacterUpdate: (character: CharacterCustomization) => void;
  onStatsUpdate: (stats: CharacterStats) => void;
  onPurchaseItem: (item: ShopItem) => void;
  onPetInteraction: (interaction: PetInteraction) => void;
}

const CharacterManager: React.FC<CharacterManagerProps> = ({
  character,
  characterStats,
  activeTab,
  soundEnabled,
  onCharacterUpdate,
  onStatsUpdate,
  onPurchaseItem,
  onPetInteraction
}) => {
  if (activeTab === 'character') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CharacterPet
          stats={characterStats}
          onStatsUpdate={onStatsUpdate}
          onInteraction={onPetInteraction}
          soundEnabled={soundEnabled}
        />
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Character Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div 
                  className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg mb-4"
                  style={{ backgroundColor: character.color }}
                >
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    😊
                  </div>
                </div>
                <h3 className="text-xl font-bold">{character.name}</h3>
                <p className="text-gray-600">Created {new Date(character.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
          <PiAdsNetwork placementId="character-sidebar" />
        </div>
      </div>
    );
  }

  if (activeTab === 'customize') {
    return (
      <CharacterCustomizer
        character={character}
        onCharacterUpdate={onCharacterUpdate}
        onPurchaseItem={onPurchaseItem}
        soundEnabled={soundEnabled}
      />
    );
  }

  return null;
};

export default CharacterManager;

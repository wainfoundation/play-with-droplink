
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Star, ShoppingBag } from 'lucide-react';
import { useCharacterShop, Character } from '@/hooks/useCharacterShop';
import { useAuth } from '@/hooks/useAuth';
import EmotionalCharacterRenderer from '@/components/welcome/EmotionalCharacterRenderer';
import { usePetMoodEngine } from '@/hooks/usePetMoodEngine';

interface CharacterShopProps {
  onBack: () => void;
}

const CharacterShop: React.FC<CharacterShopProps> = ({ onBack }) => {
  const { user } = useAuth();
  const {
    characters,
    ownedCharacters,
    wallet,
    selectedCharacterId,
    loading,
    buyCharacter,
    selectCharacter,
    addCoins
  } = useCharacterShop();

  const { moodState } = usePetMoodEngine('temp-character');

  const handleBuyCharacter = async (character: Character) => {
    const success = await buyCharacter(character.id, character.base_price_coins);
    if (success && character.is_starter) {
      // Auto-select starter characters
      await selectCharacter(character.id);
    }
  };

  const handleSelectCharacter = async (characterId: string) => {
    await selectCharacter(characterId);
  };

  const handleWatchAd = async () => {
    // Simulate watching an ad
    const success = await addCoins(3);
    if (success) {
      // You can integrate with Pi Ad network here
      console.log('Ad watched, coins added');
    }
  };

  const isOwned = (characterId: string) => ownedCharacters.includes(characterId);
  const isSelected = (characterId: string) => selectedCharacterId === characterId;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the character shop</p>
          <Button onClick={onBack}>Back to Game</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">{wallet?.droplet_coins || 0}</span>
            </div>
            
            <Button onClick={handleWatchAd} className="bg-green-500 hover:bg-green-600">
              Watch Ad (+3 coins)
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
              Character Shop
            </CardTitle>
            <p className="text-gray-600">Choose your perfect companion!</p>
          </CardHeader>
        </Card>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => {
            const owned = isOwned(character.id);
            const selected = isSelected(character.id);

            return (
              <motion.div
                key={character.id}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card className={`border-4 ${
                  selected ? 'border-green-400 bg-green-50' : 
                  owned ? 'border-blue-300 bg-blue-50' : 
                  'border-gray-200'
                }`}>
                  <CardContent className="p-6">
                    {/* Character Preview */}
                    <div className="flex justify-center mb-4">
                      <EmotionalCharacterRenderer
                        character={{
                          id: character.id,
                          name: character.name,
                          gender: character.gender,
                          color: character.color,
                          mood: 'happy',
                          personality: 'friendly'
                        }}
                        moodState={moodState}
                        size={100}
                        showMoodText={false}
                      />
                    </div>

                    {/* Character Info */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold">{character.name}</h3>
                      <p className="text-sm text-gray-600">{character.description}</p>
                      
                      {/* Badges */}
                      <div className="flex gap-2 justify-center">
                        {character.is_starter && (
                          <Badge className="bg-green-100 text-green-700">
                            <Star className="w-3 h-3 mr-1" />
                            Starter
                          </Badge>
                        )}
                        {selected && (
                          <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                        )}
                        {owned && !selected && (
                          <Badge variant="outline">Owned</Badge>
                        )}
                      </div>

                      {/* Price */}
                      {!owned && (
                        <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                          <Coins className="w-4 h-4 text-yellow-600" />
                          <span>{character.base_price_coins}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 space-y-2">
                      {!owned ? (
                        <Button
                          onClick={() => handleBuyCharacter(character)}
                          disabled={!wallet || wallet.droplet_coins < character.base_price_coins}
                          className="w-full"
                        >
                          {character.base_price_coins === 0 ? 'Get Free' : 'Buy Character'}
                        </Button>
                      ) : selected ? (
                        <Button variant="outline" className="w-full" disabled>
                          Currently Active
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleSelectCharacter(character.id)}
                          variant="outline"
                          className="w-full"
                        >
                          Select Character
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Coin Purchase Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-yellow-500" />
              Get More Coins
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleWatchAd} className="bg-green-500 hover:bg-green-600 h-16">
              <div className="text-center">
                <div>Watch Pi Ad</div>
                <div className="text-sm opacity-80">+3 coins</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16" disabled>
              <div className="text-center">
                <div>Buy with Pi</div>
                <div className="text-sm opacity-60">Coming Soon</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16" disabled>
              <div className="text-center">
                <div>Daily Bonus</div>
                <div className="text-sm opacity-60">24h cooldown</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CharacterShop;

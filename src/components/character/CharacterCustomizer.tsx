
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Shirt, Crown, Glasses, Home, Sparkles } from 'lucide-react';
import { CharacterCustomization, ShopItem } from './types';
import { sounds } from '@/utils/sounds';

interface CharacterCustomizerProps {
  character: CharacterCustomization;
  onCharacterUpdate: (character: CharacterCustomization) => void;
  onPurchaseItem: (item: ShopItem) => void;
  soundEnabled: boolean;
}

const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({
  character,
  onCharacterUpdate,
  onPurchaseItem,
  soundEnabled
}) => {
  const [characterName, setCharacterName] = useState(character.name);

  // Sample shop items
  const shopItems: ShopItem[] = [
    { id: '1', name: 'Red Color', type: 'color', price: 1, currency: 'pi', rarity: 'common' },
    { id: '2', name: 'Blue Color', type: 'color', price: 1, currency: 'pi', rarity: 'common' },
    { id: '3', name: 'Green Color', type: 'color', price: 1, currency: 'pi', rarity: 'common' },
    { id: '4', name: 'Cool Sunglasses', type: 'eyewear', price: 1, currency: 'pi', rarity: 'rare' },
    { id: '5', name: 'Reading Glasses', type: 'eyewear', price: 1, currency: 'pi', rarity: 'common' },
    { id: '6', name: 'T-Shirt', type: 'clothes', price: 2, currency: 'pi', rarity: 'common' },
    { id: '7', name: 'Hoodie', type: 'clothes', price: 3, currency: 'pi', rarity: 'rare' },
    { id: '8', name: 'Baseball Cap', type: 'hat', price: 1, currency: 'pi', rarity: 'common' },
    { id: '9', name: 'Beach Background', type: 'background', price: 5, currency: 'pi', rarity: 'epic' },
    { id: '10', name: 'Modern Room', type: 'room', price: 10, currency: 'pi', rarity: 'legendary' },
    { id: '11', name: 'Purple Color', type: 'color', price: 0, currency: 'ad', rarity: 'common' },
    { id: '12', name: 'Yellow Color', type: 'color', price: 0, currency: 'ad', rarity: 'common' },
  ];

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];

  const handleNameUpdate = () => {
    if (soundEnabled) sounds.click();
    onCharacterUpdate({
      ...character,
      name: characterName,
      updated_at: new Date().toISOString()
    });
  };

  const handleColorChange = (color: string) => {
    if (soundEnabled) sounds.powerup();
    onCharacterUpdate({
      ...character,
      color,
      updated_at: new Date().toISOString()
    });
  };

  const handlePurchase = (item: ShopItem) => {
    if (soundEnabled) sounds.coin();
    onPurchaseItem(item);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedItems = shopItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ShopItem[]>);

  return (
    <div className="space-y-6">
      {/* Character Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Your Character
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <div 
              className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: character.color }}
            >
              <div className="w-full h-full flex items-center justify-center text-4xl">
                😊
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Input
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Character Name"
              className="text-center"
            />
            <Button onClick={handleNameUpdate} size="sm">
              Update Name
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Quick Colors (Free)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${
                  character.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shop */}
      <Card>
        <CardHeader>
          <CardTitle>Character Shop</CardTitle>
          <CardDescription>Customize your character with Pi or watch ads</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="color" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="color">
                <Palette className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="clothes">
                <Shirt className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="eyewear">
                <Glasses className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="hat">
                <Crown className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="background">
                <Home className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="room">
                <Sparkles className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>

            {Object.entries(groupedItems).map(([type, items]) => (
              <TabsContent key={type} value={type}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className={getRarityColor(item.rarity)}>
                            {item.rarity}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {item.currency === 'pi' ? `${item.price} Pi` : 'Watch Ad'}
                          </span>
                          <Button 
                            size="sm" 
                            onClick={() => handlePurchase(item)}
                            variant={item.currency === 'ad' ? 'secondary' : 'default'}
                          >
                            {item.currency === 'pi' ? 'Buy' : 'Watch Ad'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCustomizer;

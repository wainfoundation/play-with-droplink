
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Heart, 
  Utensils, 
  Sparkles, 
  Moon, 
  ShoppingBag, 
  Coins,
  Droplets,
  Zap,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterRenderer from '@/components/welcome/CharacterRenderer';
import { characters } from '@/components/welcome/characterData';
import { usePetSystem } from '@/hooks/usePetSystem';
import { useAuthSystem } from '@/hooks/useAuthSystem';

interface CompletePetGameProps {
  onBack: () => void;
}

const CompletePetGame: React.FC<CompletePetGameProps> = ({ onBack }) => {
  const { user } = useAuthSystem();
  const { 
    pet, 
    inventory, 
    shopItems, 
    loading, 
    feedPet, 
    cleanPet, 
    playWithPet, 
    restPet, 
    buyItem 
  } = usePetSystem();
  
  const [currentTab, setCurrentTab] = useState('care');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const showFloatingHearts = () => {
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 200
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.find(h => h.id === heart.id)));
    }, 2000);
  };

  const handleAction = async (action: () => Promise<boolean>) => {
    const success = await action();
    if (success) {
      showFloatingHearts();
    }
  };

  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to take care of your pet droplet!
          </p>
          <Button onClick={onBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-4">Loading your pet...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  if (!pet) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">Pet not found</h2>
          <p className="text-gray-600 mb-6">
            Unable to load your pet data. Please try again.
          </p>
          <Button onClick={onBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const selectedCharacter = characters.find(c => c.id === pet.character_id) || characters[0];
  const characterWithMood = {
    ...selectedCharacter,
    mood: pet.current_mood
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    if (value >= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'hunger': return <Utensils className="w-4 h-4" />;
      case 'happiness': return <Heart className="w-4 h-4" />;
      case 'energy': return <Zap className="w-4 h-4" />;
      case 'cleanliness': return <Droplets className="w-4 h-4" />;
      case 'health': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="bg-white/50 backdrop-blur-sm rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-2 bg-yellow-300/80 backdrop-blur-sm rounded-full px-4 py-2">
          <Coins className="w-5 h-5 text-yellow-700" />
          <span className="font-bold text-yellow-800">{pet.pi_coins}π</span>
        </div>
      </div>

      {/* Pet Info Card */}
      <Card className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{pet.pet_name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline">Level {pet.level}</Badge>
                <Badge variant="secondary" className="capitalize">{pet.current_mood}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">XP Progress</p>
              <Progress 
                value={(pet.experience / pet.experience_to_next) * 100} 
                className="w-32 h-2 mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {pet.experience}/{pet.experience_to_next}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Pet Display */}
          <div className="relative flex items-center justify-center h-48 mb-6 bg-gradient-to-b from-sky-200 to-green-200 rounded-3xl">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <CharacterRenderer character={characterWithMood} size={120} />
            </motion.div>

            {/* Floating Hearts */}
            <AnimatePresence>
              {hearts.map(heart => (
                <motion.div
                  key={heart.id}
                  className="absolute text-red-500 text-xl pointer-events-none"
                  style={{ left: heart.x, top: heart.y }}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -50, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { key: 'hunger', label: 'Hunger', value: pet.hunger },
              { key: 'happiness', label: 'Happiness', value: pet.happiness },
              { key: 'energy', label: 'Energy', value: pet.energy },
              { key: 'cleanliness', label: 'Clean', value: pet.cleanliness }
            ].map(stat => (
              <div key={stat.key} className="bg-white/60 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {getStatIcon(stat.key)}
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <Progress value={stat.value} className="h-2 mb-1" />
                <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>
                  {stat.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different actions */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="care">Pet Care</TabsTrigger>
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="care" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Pet Care Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAction(feedPet)}
                  className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto flex-col gap-2"
                  disabled={pet.hunger >= 95}
                >
                  <Utensils className="w-8 h-8" />
                  <span>Feed Pet</span>
                  <span className="text-xs">5π or use food</span>
                </Button>

                <Button
                  onClick={() => handleAction(cleanPet)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-6 h-auto flex-col gap-2"
                  disabled={pet.cleanliness >= 95}
                >
                  <Sparkles className="w-8 h-8" />
                  <span>Clean Pet</span>
                  <span className="text-xs">3π or use soap</span>
                </Button>

                <Button
                  onClick={() => handleAction(playWithPet)}
                  className="bg-green-500 hover:bg-green-600 text-white p-6 h-auto flex-col gap-2"
                  disabled={pet.energy <= 10}
                >
                  <Heart className="w-8 h-8" />
                  <span>Play</span>
                  <span className="text-xs">Free (costs energy)</span>
                </Button>

                <Button
                  onClick={() => handleAction(restPet)}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-6 h-auto flex-col gap-2"
                  disabled={pet.energy >= 95}
                >
                  <Moon className="w-8 h-8" />
                  <span>Rest</span>
                  <span className="text-xs">Free</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Pet Shop
              </CardTitle>
            </CardHeader>
            <CardContent>
              {shopItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Shop items coming soon!
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {shopItems.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">
                          {item.category === 'food' && '🍎'}
                          {item.category === 'hygiene' && '🧼'}
                          {item.category === 'toy' && '🎾'}
                          {item.category === 'medicine' && '💊'}
                        </div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                        <Badge variant="outline" className="mb-2">{item.rarity}</Badge>
                        <div className="flex items-center justify-center gap-1 mb-3">
                          <Coins className="w-4 h-4 text-yellow-600" />
                          <span className="font-bold">{item.price_coins}π</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => buyItem(item.id)}
                          disabled={pet.pi_coins < item.price_coins}
                          className="w-full"
                        >
                          Buy
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              {inventory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Your inventory is empty. Buy some items from the shop!
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {inventory.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">
                          {item.shop_item?.category === 'food' && '🍎'}
                          {item.shop_item?.category === 'hygiene' && '🧼'}
                          {item.shop_item?.category === 'toy' && '🎾'}
                          {item.shop_item?.category === 'medicine' && '💊'}
                        </div>
                        <h3 className="font-bold">{item.shop_item?.name}</h3>
                        <Badge variant="outline" className="mb-2">x{item.quantity}</Badge>
                        <div className="space-y-2">
                          {item.shop_item?.category === 'food' && (
                            <Button
                              size="sm"
                              onClick={() => handleAction(() => feedPet(item.item_id))}
                              className="w-full"
                            >
                              Use to Feed
                            </Button>
                          )}
                          {item.shop_item?.category === 'hygiene' && (
                            <Button
                              size="sm"
                              onClick={() => handleAction(() => cleanPet(item.item_id))}
                              className="w-full"
                            >
                              Use to Clean
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompletePetGame;

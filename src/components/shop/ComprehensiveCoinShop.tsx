import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Zap, Star, Crown, Gift, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePetEconomy } from '@/hooks/usePetEconomy';

interface CoinPack {
  id: string;
  coins: number;
  piCost: number;
  bonus: number;
  savings: number;
  popular?: boolean;
  bestValue?: boolean;
  description: string;
}

interface ComprehensiveCoinShopProps {
  onBack: () => void;
}

const ComprehensiveCoinShop: React.FC<ComprehensiveCoinShopProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { wallet, addCoins } = usePetEconomy('droplet-blue');

  const coinPacks: CoinPack[] = [
    {
      id: 'starter',
      coins: 10,
      piCost: 1,
      bonus: 0,
      savings: 0,
      description: 'Perfect for beginners'
    },
    {
      id: 'small',
      coins: 50,
      piCost: 5,
      bonus: 0,
      savings: 0,
      description: 'Great for daily needs'
    },
    {
      id: 'medium',
      coins: 100,
      piCost: 10,
      bonus: 10,
      savings: 0,
      popular: true,
      description: 'Most popular choice'
    },
    {
      id: 'large',
      coins: 150,
      piCost: 12,
      bonus: 30,
      savings: 20,
      description: 'Great value pack'
    },
    {
      id: 'mega',
      coins: 300,
      piCost: 24,
      bonus: 50,
      savings: 20,
      description: 'For serious players'
    },
    {
      id: 'ultimate',
      coins: 650,
      piCost: 48,
      bonus: 150,
      savings: 30,
      bestValue: true,
      description: 'Ultimate coin bundle'
    }
  ];

  const getPackIcon = (pack: CoinPack) => {
    if (pack.bestValue) return <Crown className="w-8 h-8 text-orange-500" />;
    if (pack.popular) return <Star className="w-8 h-8 text-purple-500" />;
    if (pack.coins >= 300) return <Sparkles className="w-8 h-8 text-blue-500" />;
    if (pack.coins >= 100) return <Zap className="w-8 h-8 text-green-500" />;
    return <Coins className="w-8 h-8 text-yellow-500" />;
  };

  const getPackColor = (pack: CoinPack) => {
    if (pack.bestValue) return 'border-orange-300 bg-orange-50';
    if (pack.popular) return 'border-purple-300 bg-purple-50';
    if (pack.coins >= 300) return 'border-blue-300 bg-blue-50';
    if (pack.coins >= 100) return 'border-green-300 bg-green-50';
    return 'border-yellow-300 bg-yellow-50';
  };

  const handlePurchase = async (pack: CoinPack) => {
    try {
      // Simulate Pi payment for now
      // In real implementation, integrate with Pi Network SDK
      console.log(`Purchasing ${pack.coins} coins for ${pack.piCost}π`);
      
      // Add coins to wallet (simulate successful payment)
      const totalCoins = pack.coins + pack.bonus;
      addCoins(totalCoins);
      
      // Show success message
      console.log(`Successfully purchased ${totalCoins} coins!`);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const watchAdForCoins = () => {
    // Simulate watching an ad for 1 coin
    addCoins(1);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
        <Card className="max-w-md mx-auto mt-20">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-4">Please log in to purchase coins</p>
            <Button onClick={onBack}>Back to Game</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-lg">{wallet?.dropletCoins || 0}</span>
            <span className="text-sm text-gray-600">coins</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center">
              <Coins className="w-6 h-6 text-yellow-500" />
              Coin Shop - Buy with Pi Network
            </CardTitle>
            <p className="text-gray-600 text-center">Purchase Droplet Coins to care for your pet and buy items</p>
          </CardHeader>
        </Card>

        {/* Free Coins Section */}
        <Card className="mb-6 border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Gift className="w-6 h-6" />
              Free Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="text-center">
                <p className="text-sm text-green-600 mb-2">Watch an ad to earn coins!</p>
                <Button 
                  onClick={watchAdForCoins}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Watch Ad (+1 coin)
                </Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600 mb-2">Daily login bonus!</p>
                <Button 
                  onClick={() => addCoins(5, 'Daily login bonus')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Claim Daily (+5 coins)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coin Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coinPacks.map((pack) => (
            <motion.div
              key={pack.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`border-4 ${getPackColor(pack)} hover:shadow-lg transition-all relative`}>
                {pack.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    Most Popular
                  </Badge>
                )}
                {pack.bestValue && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                    Best Value
                  </Badge>
                )}
                
                <CardContent className="p-6 text-center">
                  {/* Pack Icon */}
                  <div className="flex justify-center mb-4">
                    {getPackIcon(pack)}
                  </div>

                  {/* Pack Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">{pack.description}</h3>
                    
                    <div className="flex items-center justify-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-700">
                        {pack.coins}
                      </span>
                      {pack.bonus > 0 && (
                        <span className="text-lg text-green-600 font-semibold">
                          +{pack.bonus}
                        </span>
                      )}
                      <span className="text-sm text-gray-600">coins</span>
                    </div>

                    {pack.bonus > 0 && (
                      <Badge className="bg-green-100 text-green-700">
                        +{pack.bonus} Bonus Coins!
                      </Badge>
                    )}

                    {pack.savings > 0 && (
                      <Badge className="bg-red-100 text-red-700">
                        Save {pack.savings}%!
                      </Badge>
                    )}

                    <div className="text-lg font-semibold">
                      {pack.piCost} π
                    </div>

                    <div className="text-xs text-gray-500">
                      {((pack.coins + pack.bonus) / pack.piCost).toFixed(1)} coins per π
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => handlePurchase(pack)}
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    Buy with Pi Network
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Why Buy Coins?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🍎</div>
                <h4 className="font-semibold mb-2">Feed Your Pet</h4>
                <p className="text-sm text-gray-600">
                  Buy food items to keep your pet happy and healthy
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎾</div>
                <h4 className="font-semibold mb-2">Buy Toys</h4>
                <p className="text-sm text-gray-600">
                  Purchase toys and accessories for entertainment
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold mb-2">Customize</h4>
                <p className="text-sm text-gray-600">
                  Unlock themes and customization options
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💊</div>
                <h4 className="font-semibold mb-2">Pet Care</h4>
                <p className="text-sm text-gray-600">
                  Buy medicine and care items for your pet's health
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveCoinShop;

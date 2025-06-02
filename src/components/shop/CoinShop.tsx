
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Zap, Star, Crown, Play } from 'lucide-react';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import { toast } from '@/hooks/use-toast';

interface CoinShopProps {
  onBack: () => void;
}

interface CoinPack {
  id: string;
  label: string;
  coins: number;
  pricePi: number;
  bonus?: number;
  popular?: boolean;
}

const coinPacks: CoinPack[] = [
  { id: 'basic', label: 'Basic Pack', coins: 10, pricePi: 1 },
  { id: 'standard', label: 'Standard Pack', coins: 100, pricePi: 10 },
  { id: 'saver', label: 'Saver Pack', coins: 150, pricePi: 12, bonus: 25, popular: true },
  { id: 'big', label: 'Big Pack', coins: 300, pricePi: 25, bonus: 50 },
  { id: 'mega', label: 'Mega Bundle', coins: 650, pricePi: 50, bonus: 150 }
];

const CoinShop: React.FC<CoinShopProps> = ({ onBack }) => {
  const { wallet, addCoins } = usePetEconomy('droplet-blue');

  const getPackIcon = (packId: string) => {
    switch (packId) {
      case 'basic': return <Coins className="w-8 h-8 text-yellow-500" />;
      case 'standard': return <Zap className="w-8 h-8 text-blue-500" />;
      case 'saver': return <Star className="w-8 h-8 text-purple-500" />;
      case 'big': return <Crown className="w-8 h-8 text-orange-500" />;
      case 'mega': return <Crown className="w-8 h-8 text-pink-500" />;
      default: return <Coins className="w-8 h-8 text-gray-500" />;
    }
  };

  const getPackColor = (packId: string, popular?: boolean) => {
    if (popular) return 'border-purple-300 bg-purple-50 ring-2 ring-purple-200';
    
    switch (packId) {
      case 'basic': return 'border-yellow-200 bg-yellow-50';
      case 'standard': return 'border-blue-200 bg-blue-50';
      case 'saver': return 'border-purple-200 bg-purple-50';
      case 'big': return 'border-orange-200 bg-orange-50';
      case 'mega': return 'border-pink-200 bg-pink-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const handleBuyCoins = async (pack: CoinPack) => {
    try {
      // Simulate Pi payment for demo
      // In real implementation, integrate with Pi SDK
      const totalCoins = pack.coins + (pack.bonus || 0);
      
      addCoins(totalCoins, `Purchased ${pack.label}`);
      
      toast({
        title: "Purchase Successful! 🎉",
        description: `You received ${totalCoins} coins for ${pack.pricePi} Pi`,
        className: "bg-green-50 border-green-200"
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleWatchAd = async () => {
    try {
      // Simulate ad watching for demo
      // In real implementation, integrate with Pi Ad SDK
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addCoins(1, "Watched Pi Ad");
      
      toast({
        title: "Ad Reward! 📺",
        description: "You earned 1 coin for watching an ad",
        className: "bg-blue-50 border-blue-200"
      });
    } catch (error) {
      toast({
        title: "Ad Failed",
        description: "Unable to load ad. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">{wallet?.dropletCoins?.toLocaleString() || 0}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center">
              <Coins className="w-6 h-6 text-yellow-500" />
              Coin Shop - Buy with Pi
            </CardTitle>
            <p className="text-gray-600 text-center">Purchase Droplet Coins using Pi Network</p>
          </CardHeader>
        </Card>

        {/* Watch Ad Section */}
        <Card className="mb-6 border-2 border-dashed border-green-300 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl">📺</div>
              <div>
                <h3 className="text-lg font-bold text-green-700">Watch Pi Ads</h3>
                <p className="text-green-600">Earn 1 coin per ad watched</p>
              </div>
              <Button
                onClick={handleWatchAd}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Watch Ad (+1 Coin)
              </Button>
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
              <Card className={`border-4 ${getPackColor(pack.id, pack.popular)} hover:shadow-lg transition-all relative`}>
                {pack.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    POPULAR
                  </Badge>
                )}
                
                <CardContent className="p-6 text-center">
                  {/* Pack Icon */}
                  <div className="flex justify-center mb-4">
                    {getPackIcon(pack.id)}
                  </div>

                  {/* Pack Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">{pack.label}</h3>
                    
                    <div className="flex items-center justify-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-700">
                        {pack.coins}
                      </span>
                      <span className="text-sm text-gray-600">coins</span>
                    </div>

                    {pack.bonus && (
                      <div className="space-y-1">
                        <Badge className="bg-green-100 text-green-700">
                          +{pack.bonus} Bonus!
                        </Badge>
                        <div className="text-xs text-gray-500">
                          Total: {pack.coins + pack.bonus} coins
                        </div>
                      </div>
                    )}

                    <div className="text-lg font-semibold">
                      {pack.pricePi} π
                    </div>

                    <div className="text-xs text-gray-500">
                      {(pack.coins / pack.pricePi).toFixed(1)} coins per π
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => handleBuyCoins(pack)}
                    className={`w-full mt-4 ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                    } text-white`}
                  >
                    Buy with Pi
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">About Pi Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔒 Secure Payments</h4>
                <p className="text-sm text-gray-600">
                  All payments are processed securely through Pi Network's official payment system.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚡ Instant Delivery</h4>
                <p className="text-sm text-gray-600">
                  Coins are added to your wallet immediately after successful payment.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💎 Best Value</h4>
                <p className="text-sm text-gray-600">
                  Larger packs offer better value with bonus coins included.
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎮 Use Everywhere</h4>
                <p className="text-sm text-gray-600">
                  Spend coins on food, toys, medicine, and room decorations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoinShop;

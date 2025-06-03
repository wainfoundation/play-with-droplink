
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Zap, Star, Crown } from 'lucide-react';
import { useShopItems, CoinPack } from '@/hooks/useShopItems';
import { useAuth } from '@/hooks/useAuth';

interface CoinShopProps {
  onBack: () => void;
}

const CoinShop: React.FC<CoinShopProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { coinPacks, buyCoinPack, loading } = useShopItems();

  const getPackIcon = (packId: string) => {
    switch (packId) {
      case 'cp_small': return <Coins className="w-8 h-8 text-yellow-500" />;
      case 'cp_medium': return <Zap className="w-8 h-8 text-blue-500" />;
      case 'cp_large': return <Star className="w-8 h-8 text-purple-500" />;
      case 'cp_premium': return <Crown className="w-8 h-8 text-orange-500" />;
      default: return <Coins className="w-8 h-8 text-gray-500" />;
    }
  };

  const getPackColor = (packId: string) => {
    switch (packId) {
      case 'cp_small': return 'border-yellow-200 bg-yellow-50';
      case 'cp_medium': return 'border-blue-200 bg-blue-50';
      case 'cp_large': return 'border-purple-200 bg-purple-50';
      case 'cp_premium': return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const handlePurchase = async (pack: CoinPack) => {
    await buyCoinPack(pack);
  };

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
          <p className="text-gray-600 mb-4">Please log in to purchase coins</p>
          <Button onClick={onBack}>Back to Game</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center">
              <Coins className="w-6 h-6 text-yellow-500" />
              Coin Shop - Buy with Pi
            </CardTitle>
            <p className="text-gray-600 text-center">Purchase Droplet Coins using Pi Network payments</p>
          </CardHeader>
        </Card>

        {/* Coin Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coinPacks.map((pack) => (
            <motion.div
              key={pack.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className={`border-4 ${getPackColor(pack.id)} hover:shadow-lg transition-all`}>
                <CardContent className="p-6 text-center">
                  {/* Pack Icon */}
                  <div className="flex justify-center mb-4">
                    {getPackIcon(pack.id)}
                  </div>

                  {/* Pack Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold">{pack.description}</h3>
                    
                    <div className="flex items-center justify-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-700">
                        {pack.coins_given}
                      </span>
                      <span className="text-sm text-gray-600">coins</span>
                    </div>

                    {pack.bonus_percentage > 0 && (
                      <Badge className="bg-green-100 text-green-700">
                        +{pack.bonus_percentage}% Bonus!
                      </Badge>
                    )}

                    <div className="text-lg font-semibold">
                      {pack.pi_cost} π
                    </div>

                    <div className="text-xs text-gray-500">
                      {(pack.coins_given / pack.pi_cost).toFixed(1)} coins per π
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => handlePurchase(pack)}
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    disabled={loading}
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
                  Spend coins on character upgrades, food, toys, and accessories.
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


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Coins, Zap, Star, Crown, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useShopItems } from '@/hooks/useShopItems';
import { usePetEconomy } from '@/hooks/usePetEconomy';
import RewardedAdButton from '@/components/RewardedAdButton';
import { isRunningInPiBrowser } from '@/utils/pi-utils';
import { AdReward } from '@/services/piAdService';

const CoinStore: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { coinPacks, buyCoinPack, loading } = useShopItems();
  const { wallet, claimDailyCoins, refreshWallet } = usePetEconomy();
  const isPiBrowser = isRunningInPiBrowser();

  const getPackIcon = (packId: string) => {
    if (packId.includes('ultimate')) return <Crown className="w-8 h-8 text-orange-500" />;
    if (packId.includes('mega')) return <Star className="w-8 h-8 text-purple-500" />;
    if (packId.includes('medium')) return <Zap className="w-8 h-8 text-blue-500" />;
    return <Coins className="w-8 h-8 text-yellow-500" />;
  };

  const getPackColor = (packId: string) => {
    if (packId.includes('ultimate')) return 'border-orange-300 bg-orange-50';
    if (packId.includes('mega')) return 'border-blue-300 bg-blue-50';
    if (packId.includes('medium')) return 'border-green-300 bg-green-50';
    return 'border-yellow-300 bg-yellow-50';
  };

  const handleAdComplete = (reward: AdReward) => {
    // The reward is handled by the RewardedAdButton component
    // We just need to refresh the wallet
    setTimeout(() => refreshWallet(), 1500);
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
        <Card className="max-w-md mx-auto mt-20">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-4">Please log in to purchase coins</p>
            <Button onClick={() => navigate('/auth')}>Log In</Button>
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
          <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-lg">{wallet?.droplet_coins || 0}</span>
            <span className="text-sm text-gray-600">coins</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Coins className="w-6 h-6 text-yellow-500" />
              Droplet Coin Shop
            </CardTitle>
            <p className="text-gray-600 text-center">Purchase coins to care for your pet and unlock special items</p>
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
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-green-600 mb-2">Watch an ad to earn coins!</p>
                <RewardedAdButton 
                  reward={{ type: 'coins', amount: 1, description: 'Ad reward' }}
                  onAdComplete={handleAdComplete} 
                  buttonText="Watch Ad (+1 coin)"
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-green-600 mb-2">Daily login bonus!</p>
                <Button 
                  onClick={claimDailyCoins}
                  className="bg-green-500 hover:bg-green-600 text-white w-full flex items-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Claim Daily Reward
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
              <Card className={`border-4 ${getPackColor(pack.id)} hover:shadow-lg transition-all relative`}>
                {pack.is_popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    Most Popular
                  </Badge>
                )}
                {pack.is_best_value && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                    Best Value
                  </Badge>
                )}
                
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
                      {pack.bonus_percentage > 0 && (
                        <span className="text-lg text-green-600 font-semibold">
                          +{Math.floor(pack.coins_given * pack.bonus_percentage / 100)}
                        </span>
                      )}
                      <span className="text-sm text-gray-600">coins</span>
                    </div>

                    {pack.bonus_percentage > 0 && (
                      <Badge className="bg-green-100 text-green-700">
                        +{pack.bonus_percentage}% Bonus!
                      </Badge>
                    )}

                    {pack.savings_percentage > 0 && (
                      <Badge className="bg-red-100 text-red-700">
                        Save {pack.savings_percentage}%!
                      </Badge>
                    )}

                    <div className="text-lg font-semibold">
                      {pack.pi_cost} π
                    </div>

                    <div className="text-xs text-gray-500">
                      {((pack.coins_given + (pack.coins_given * pack.bonus_percentage / 100)) / pack.pi_cost).toFixed(1)} coins per π
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => buyCoinPack(pack)}
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    disabled={!isPiBrowser || loading}
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

        {!isPiBrowser && (
          <Card className="mt-6 border-2 border-orange-300 bg-orange-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Pi Browser Required</h3>
                <p className="text-sm text-gray-700 mb-4">
                  To purchase coins with Pi, please open this app in the Pi Browser.
                </p>
                <Button 
                  onClick={() => window.open('https://minepi.com/download', '_blank')}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Get Pi Browser
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoinStore;

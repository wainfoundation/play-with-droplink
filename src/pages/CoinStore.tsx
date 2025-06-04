
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Coins, Zap, Crown, Gift, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const CoinStore: React.FC = () => {
  const navigate = useNavigate();

  const coinPacks = [
    {
      id: 'small',
      name: 'Small Pack',
      coins: 100,
      price: '0.5 π',
      bonus: 0,
      popular: false,
      icon: '💰',
      color: 'border-gray-300'
    },
    {
      id: 'medium',
      name: 'Medium Pack',
      coins: 250,
      price: '1.0 π',
      bonus: 25,
      popular: true,
      icon: '💎',
      color: 'border-blue-500 bg-blue-50'
    },
    {
      id: 'large',
      name: 'Large Pack',
      coins: 600,
      price: '2.0 π',
      bonus: 100,
      popular: false,
      icon: '👑',
      color: 'border-purple-500 bg-purple-50'
    },
    {
      id: 'mega',
      name: 'Mega Pack',
      coins: 1500,
      price: '4.0 π',
      bonus: 300,
      popular: false,
      icon: '⭐',
      color: 'border-yellow-500 bg-yellow-50'
    }
  ];

  const handlePurchase = (packId: string) => {
    console.log(`Purchasing pack: ${packId}`);
    // Implement Pi Network payment logic here
  };

  return (
    <>
      <Helmet>
        <title>Coin Store - Buy Coins with Pi</title>
        <meta name="description" content="Purchase coins using Pi Network to enhance your pet care experience" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <IconButton
              icon={ArrowLeft}
              label="Back"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600"
            />
            <div className="text-center flex-1 mx-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
                💰 Coin Store
              </h1>
              <p className="text-lg text-gray-600">
                Purchase coins with Pi Network
              </p>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Current Balance */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-5xl mb-2">🪙</div>
                <h3 className="text-2xl font-bold mb-1">Current Balance</h3>
                <div className="text-4xl font-bold">1,240 Coins</div>
              </div>
            </CardContent>
          </Card>

          {/* Pi Network Info */}
          <Card className="mb-8 border-2 border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">π</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">Pay with Pi Network</h3>
                  <p className="text-purple-700">
                    Use your Pi coins to purchase game currency. All transactions are secure and processed through the Pi Network.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coin Packs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {coinPacks.map((pack) => (
              <Card key={pack.id} className={`relative border-2 ${pack.color} hover:shadow-lg transition-all`}>
                {pack.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-2">{pack.icon}</div>
                  <CardTitle className="text-2xl">{pack.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">
                      {pack.coins.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Droplet Coins</div>
                  </div>

                  {pack.bonus > 0 && (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      +{pack.bonus} Bonus Coins!
                    </div>
                  )}

                  <div className="text-2xl font-bold text-purple-600">
                    {pack.price}
                  </div>

                  <Button
                    onClick={() => handlePurchase(pack.id)}
                    className={`w-full text-lg py-6 ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                        : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Buy with Pi
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Offers */}
          <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Gift className="h-6 w-6 text-pink-500" />
                Special Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-pink-300">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎁</div>
                    <h4 className="font-bold mb-1">Daily Bonus</h4>
                    <p className="text-sm text-gray-600 mb-3">Get +10% coins on your first purchase today!</p>
                    <Badge className="bg-pink-100 text-pink-700">Limited Time</Badge>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-bold mb-1">VIP Rewards</h4>
                    <p className="text-sm text-gray-600 mb-3">Spend 10π total to unlock exclusive items!</p>
                    <Badge className="bg-purple-100 text-purple-700">Premium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CoinStore;

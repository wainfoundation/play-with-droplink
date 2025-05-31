
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createPiPayment } from '@/utils/pi-sdk';
import { 
  Crown, 
  Unlock, 
  Star, 
  Zap, 
  Check,
  X,
  Coins
} from 'lucide-react';

const Monetization = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [subscriptionStatus] = useState<'free' | 'premium' | 'expired'>('free');

  const handlePremiumSubscription = async () => {
    setLoading('premium');
    try {
      await createPiPayment({
        amount: 10,
        memo: "Droplink Premium Game Pass",
        metadata: { type: "subscription" }
      }, {
        onReadyForServerApproval: (paymentId) => {
          console.log('Payment ready for approval:', paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log('Payment completed:', paymentId, txid);
          setLoading(null);
        },
        onCancel: (paymentId) => {
          console.log('Payment cancelled:', paymentId);
          setLoading(null);
        },
        onError: (error) => {
          console.error('Payment error:', error);
          setLoading(null);
        }
      });
    } catch (error) {
      console.error('Failed to create payment:', error);
      setLoading(null);
    }
  };

  const handleGamePurchase = async (gameId: string, price: number, gameName: string) => {
    setLoading(gameId);
    try {
      await createPiPayment({
        amount: price,
        memo: `Unlock: ${gameName}`,
        metadata: { type: "game_purchase", gameId }
      }, {
        onReadyForServerApproval: (paymentId) => {
          console.log('Game purchase ready for approval:', paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log('Game purchase completed:', paymentId, txid);
          setLoading(null);
        },
        onCancel: (paymentId) => {
          console.log('Game purchase cancelled:', paymentId);
          setLoading(null);
        },
        onError: (error) => {
          console.error('Game purchase error:', error);
          setLoading(null);
        }
      });
    } catch (error) {
      console.error('Failed to purchase game:', error);
      setLoading(null);
    }
  };

  const paidGames = [
    {
      id: 'puzzle_builder',
      name: 'Puzzle Builder Pro',
      price: 0.75,
      description: 'Advanced puzzle creation tools and exclusive levels',
      thumbnail: '🧩'
    },
    {
      id: 'space_adventure',
      name: 'Space Adventure DX',
      price: 1.5,
      description: 'Epic space exploration with premium ships and weapons',
      thumbnail: '🚀'
    },
    {
      id: 'brain_master',
      name: 'Brain Master Elite',
      price: 1.0,
      description: 'Ultimate brain training with advanced algorithms',
      thumbnail: '🧠'
    },
    {
      id: 'creative_studio',
      name: 'Creative Studio',
      price: 2.0,
      description: 'Professional-grade creative tools and assets',
      thumbnail: '🎨'
    }
  ];

  const premiumFeatures = [
    'Unlock all games and levels',
    'Ad-free gaming experience',
    'Premium badge and profile',
    'Exclusive leaderboards',
    '2x Pi rewards',
    'Priority customer support',
    'Early access to new games',
    'Custom avatars and themes'
  ];

  const freeFeatures = [
    'Access to basic games',
    'Limited levels',
    'Ads between gameplay',
    'Standard leaderboards',
    'Basic profile',
    'Community support'
  ];

  return (
    <>
      <Helmet>
        <title>💳 Monetization & Payments - Play with Droplink</title>
        <meta name="description" content="Upgrade to Premium or purchase exclusive games on Play with Droplink" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                💳 Monetization & Payments
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Upgrade your gaming experience with Pi Network payments
            </p>
          </div>

          {/* Current Status */}
          <div className="text-center mb-8">
            {subscriptionStatus === 'free' && (
              <Badge className="bg-gray-600 text-lg py-2 px-4">🆓 Free User</Badge>
            )}
            {subscriptionStatus === 'premium' && (
              <Badge className="bg-purple-600 text-lg py-2 px-4">👑 Premium Active</Badge>
            )}
            {subscriptionStatus === 'expired' && (
              <Badge className="bg-red-600 text-lg py-2 px-4">⚠️ Premium Expired</Badge>
            )}
          </div>

          {/* Premium Subscription */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl mb-3">🆓</div>
                  <CardTitle className="text-2xl text-white">Free Plan</CardTitle>
                  <CardDescription className="text-gray-400">
                    Basic gaming experience
                  </CardDescription>
                  <div className="text-3xl font-bold text-white mt-4">0 Pi</div>
                  <div className="text-gray-400">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6" 
                  variant="outline" 
                  disabled
                >
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50 backdrop-blur-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-600 text-black font-bold">⭐ MOST POPULAR</Badge>
              </div>
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl mb-3">👑</div>
                  <CardTitle className="text-2xl text-white">Premium Subscription</CardTitle>
                  <CardDescription className="text-purple-200">
                    Ultimate gaming experience
                  </CardDescription>
                  <div className="text-3xl font-bold text-white mt-4">10 Pi</div>
                  <div className="text-purple-200">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handlePremiumSubscription}
                  disabled={loading === 'premium'}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
                >
                  {loading === 'premium' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Paid Games */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">💰 Premium Games</h2>
              <p className="text-gray-300">
                One-time purchases for exclusive gaming experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paidGames.map((game) => (
                <Card key={game.id} className="bg-gray-900/50 border-orange-500/30 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-3">{game.thumbnail}</div>
                    <CardTitle className="text-white text-lg">{game.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {game.description}
                    </CardDescription>
                    <div className="text-2xl font-bold text-orange-400 mt-3">
                      {game.price} Pi
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => handleGamePurchase(game.id, game.price, game.name)}
                      disabled={loading === game.id}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      {loading === game.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Purchasing...
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Unlock Game
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Coins className="w-6 h-6" />
                Pi Network Payment System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Secure & Fast</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Powered by Pi Network blockchain</li>
                    <li>• Instant payment confirmation</li>
                    <li>• Low transaction fees</li>
                    <li>• Secure wallet integration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Cancel Anytime</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• No long-term commitments</li>
                    <li>• Cancel subscription anytime</li>
                    <li>• Paid games are yours forever</li>
                    <li>• Full refund within 7 days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Monetization;

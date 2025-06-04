
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CoinPackCard from '@/components/store/CoinPackCard';
import RewardAdButton from '@/components/store/RewardAdButton';
import { useAuth } from '@/hooks/useAuth';

export interface CoinPack {
  id: number;
  coins: number;
  pi: number;
  bonus?: boolean;
  promo?: boolean;
  premium?: boolean;
  title: string;
}

const CoinStore: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const coinPacks: CoinPack[] = [
    { id: 1, coins: 10, pi: 1, title: 'Starter Pack' },
    { id: 2, coins: 100, pi: 10, title: 'Regular Pack' },
    { id: 3, coins: 150, pi: 12, bonus: true, title: 'Bonus Pack' },
    { id: 4, coins: 300, pi: 20, promo: true, title: 'Special Deal' },
    { id: 5, coins: 1000, pi: 50, premium: true, title: 'Premium Tier' },
  ];

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Coin Store - Droplet Pet</title>
          <meta name="description" content="Purchase Droplet Coins with Pi Network" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">🪙 Buy Droplet Coins</h1>
            <p className="text-gray-600 mb-8">Please sign in to purchase coins</p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Coin Store - Droplet Pet</title>
        <meta name="description" content="Purchase Droplet Coins with Pi Network" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">🪙 Buy Droplet Coins</h1>
          <p className="text-gray-600 text-center mb-8">
            Purchase coins with Pi Network to care for your pet and buy items
          </p>

          {/* Coin Packs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {coinPacks.map(pack => (
              <CoinPackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {/* Free Coins Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🎁 Free Coins</h2>
            <p className="text-gray-600 mb-6">Earn coins by watching ads</p>
            <RewardAdButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinStore;

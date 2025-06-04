
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePiPayment } from '@/hooks/usePiPayment';
import { CoinPack } from '@/pages/CoinStore';

interface CoinPackCardProps {
  pack: CoinPack;
}

const CoinPackCard: React.FC<CoinPackCardProps> = ({ pack }) => {
  const { createPayment, loading } = usePiPayment();

  const handlePurchase = async () => {
    try {
      await createPayment({
        amount: pack.pi,
        memo: `Buy ${pack.coins} Droplet Coins`,
        metadata: { coins: pack.coins, packId: pack.id }
      });
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">{pack.title}</h2>
        <div className="text-3xl font-bold text-yellow-600 mb-2">{pack.coins}</div>
        <div className="text-sm text-gray-600 mb-4">Droplet Coins</div>
        
        <div className="text-lg font-semibold mb-4">{pack.pi} π</div>

        {pack.bonus && (
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mb-3">
            + Bonus
          </span>
        )}
        
        {pack.promo && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-3">
            🔥 Promo
          </span>
        )}
        
        {pack.premium && (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded mb-3">
            💎 Premium
          </span>
        )}

        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoinPackCard;

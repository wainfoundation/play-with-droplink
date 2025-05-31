
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CrownIcon, CoinsIcon } from 'lucide-react';

interface PremiumCTAProps {
  userPlan: string;
  gamesCount: number;
  paymentLoading: boolean;
  onUpgradeToPremium: () => void;
}

const PremiumCTA: React.FC<PremiumCTAProps> = ({
  userPlan,
  gamesCount,
  paymentLoading,
  onUpgradeToPremium
}) => {
  if (userPlan !== 'free') return null;

  return (
    <Card className="max-w-md mx-auto mb-6 border-yellow-200 bg-yellow-50">
      <CardContent className="p-4 text-center">
        <CrownIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <h3 className="font-semibold text-yellow-800 mb-2">Upgrade to Premium</h3>
        <p className="text-sm text-yellow-700 mb-3">
          Unlock all {gamesCount}+ games, remove ads, and get exclusive features!
        </p>
        <button 
          onClick={onUpgradeToPremium} 
          disabled={paymentLoading}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <CoinsIcon className="w-4 h-4 mr-2 inline" />
          {paymentLoading ? 'Processing...' : 'Upgrade for 10 Pi'}
        </button>
      </CardContent>
    </Card>
  );
};

export default PremiumCTA;

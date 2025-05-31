
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CrownIcon, CoinsIcon, Zap, Shield, Gamepad2 } from 'lucide-react';

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
    <Card className="max-w-md mx-auto mb-6 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardContent className="p-6 text-center">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CrownIcon className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-xl text-gray-800 mb-2">Upgrade to Premium</h3>
        <p className="text-sm text-gray-600 mb-4">
          Only <span className="font-bold text-orange-600">10π per month</span> for the ultimate gaming experience!
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Gamepad2 className="w-4 h-4 text-green-600" />
            <span>Unlock all {gamesCount}+ premium games</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Completely ad-free gaming experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Zap className="w-4 h-4 text-green-600" />
            <span>Instant hints & skips without watching ads</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CrownIcon className="w-4 h-4 text-green-600" />
            <span>Premium badge & exclusive features</span>
          </div>
        </div>
        
        <button 
          onClick={onUpgradeToPremium} 
          disabled={paymentLoading}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <CoinsIcon className="w-5 h-5" />
          {paymentLoading ? 'Processing...' : 'Subscribe for 10π/month'}
        </button>
        
        <p className="text-xs text-gray-500 mt-3">
          Cancel anytime • Auto-renews monthly • Pi Browser required
        </p>
      </CardContent>
    </Card>
  );
};

export default PremiumCTA;

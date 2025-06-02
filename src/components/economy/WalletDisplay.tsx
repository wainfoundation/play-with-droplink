
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface WalletDisplayProps {
  dropletCoins: number;
  onBuyCoins?: () => void;
  onWatchAd?: () => void;
  className?: string;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ 
  dropletCoins, 
  onBuyCoins, 
  onWatchAd,
  className = "" 
}) => {
  return (
    <Card className={`bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 rounded-full p-2">
              <Coins className="h-6 w-6 text-yellow-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <motion.span 
                  key={dropletCoins}
                  initial={{ scale: 1.2, color: '#f59e0b' }}
                  animate={{ scale: 1, color: '#92400e' }}
                  className="text-2xl font-bold text-yellow-800"
                >
                  {dropletCoins}
                </motion.span>
                <span className="text-lg font-semibold text-yellow-700">Droplet Coins</span>
              </div>
              <p className="text-sm text-yellow-600">Your in-game currency</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {onWatchAd && (
              <Button 
                size="sm" 
                onClick={onWatchAd}
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
              >
                <span className="mr-1">📺</span>
                Watch Ad +1
              </Button>
            )}
            {onBuyCoins && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onBuyCoins}
                className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Buy More
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletDisplay;

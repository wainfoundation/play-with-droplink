
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RotateCcw, Trophy } from 'lucide-react';
import { UserStats } from '@/types/trivia';

interface TriviaModalsProps {
  showGameOverModal: boolean;
  showShop: boolean;
  showLeaderboard: boolean;
  userStats: UserStats;
  paymentLoading: boolean;
  onSetShowGameOverModal: (show: boolean) => void;
  onSetShowShop: (show: boolean) => void;
  onSetShowLeaderboard: (show: boolean) => void;
  onWatchAd: () => Promise<void>;
  onPayPi: () => Promise<void>;
  onPayCoins: (amount: number) => void;
  onRestartGame: () => void;
  onBuyCoins: (coins: number, price: number) => Promise<void>;
}

const TriviaModals: React.FC<TriviaModalsProps> = ({
  showGameOverModal,
  showShop,
  showLeaderboard,
  userStats,
  paymentLoading,
  onSetShowGameOverModal,
  onSetShowShop,
  onSetShowLeaderboard,
  onWatchAd,
  onPayPi,
  onPayCoins,
  onRestartGame,
  onBuyCoins
}) => {
  return (
    <>
      {/* Game Over Modal */}
      <Dialog open={showGameOverModal} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">❌ Out of Lives!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Choose how to continue:</p>
            </div>

            <Button
              onClick={onWatchAd}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              📺 Watch Pi Ad (+1 Life)
            </Button>

            <Button
              onClick={onPayPi}
              disabled={paymentLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            >
              💎 Pay 1 Pi (Refill Lives)
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onPayCoins(10)}
                disabled={userStats.coins < 10}
                variant="outline"
                className="h-12"
              >
                🪙 10 Coins<br />
                <span className="text-xs">(Refill Lives)</span>
              </Button>

              <Button
                onClick={() => onPayCoins(1)}
                disabled={userStats.coins < 1}
                variant="outline"
                className="h-12"
              >
                🪙 1 Coin<br />
                <span className="text-xs">(+1 Life)</span>
              </Button>
            </div>

            <Button
              onClick={onRestartGame}
              variant="outline"
              className="w-full h-12"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart from Level 1
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shop Modal */}
      <Dialog open={showShop} onOpenChange={onSetShowShop}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>🛒 Coin Shop</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">10 Coins</span>
                <Badge>1 Pi</Badge>
              </div>
              <Button
                onClick={() => onBuyCoins(10, 1)}
                disabled={paymentLoading}
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">50 Coins</span>
                <Badge>4 Pi</Badge>
              </div>
              <Button
                onClick={() => onBuyCoins(50, 4)}
                disabled={paymentLoading}
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leaderboard Modal */}
      <Dialog open={showLeaderboard} onOpenChange={onSetShowLeaderboard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🏆 Leaderboard</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <p className="text-gray-600">Leaderboard coming soon!</p>
            <p className="text-sm text-gray-500 mt-2">
              Connect with other Pi Network trivia players
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TriviaModals;

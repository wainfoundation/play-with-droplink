
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Eye, Zap, Star, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { showRewardedAd, AdReward } from '@/services/piAdService';
import { usePiPayment } from '@/hooks/usePiPayment';
import { playSound, sounds } from '@/utils/sounds';

interface GameUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  upgradeType: 'skill' | 'powerup' | 'unlock' | 'boost';
  upgradeName: string;
  piCost: number;
  onUpgradeComplete: (method: 'pi' | 'ad') => void;
}

const GameUpgradeModal: React.FC<GameUpgradeModalProps> = ({
  isOpen,
  onClose,
  upgradeType,
  upgradeName,
  piCost,
  onUpgradeComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const { createPayment, loading: piLoading } = usePiPayment();
  const isPiBrowser = isRunningInPiBrowser();

  const upgradeIcons = {
    skill: Star,
    powerup: Zap,
    unlock: Crown,
    boost: Star
  };

  const UpgradeIcon = upgradeIcons[upgradeType];

  const handlePiPayment = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please use Pi Browser to make Pi payments.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await createPayment({
        amount: piCost,
        memo: `${upgradeName} upgrade`,
        metadata: { 
          type: 'game_upgrade', 
          upgradeType, 
          upgradeName 
        }
      });

      playSound(sounds.setupComplete, 0.6);
      onUpgradeComplete('pi');
      onClose();
      
      toast({
        title: "Upgrade Purchased!",
        description: `You've successfully purchased ${upgradeName}!`,
      });
    } catch (error) {
      console.error('Pi payment failed:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to process Pi payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWatchAd = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please use Pi Browser to watch ads.",
        variant: "destructive",
      });
      return;
    }

    setAdLoading(true);
    try {
      const adReward: AdReward = {
        type: 'credits',
        amount: 100,
        description: `${upgradeName} unlock`
      };

      const success = await showRewardedAd(adReward);
      
      if (success) {
        playSound(sounds.loadingComplete, 0.6);
        onUpgradeComplete('ad');
        onClose();
        
        toast({
          title: "Upgrade Earned!",
          description: `You've earned ${upgradeName} by watching an ad!`,
        });
      }
    } catch (error) {
      console.error('Ad viewing failed:', error);
      toast({
        title: "Ad Failed",
        description: "Failed to show ad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAdLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <UpgradeIcon className="w-6 h-6 text-primary" />
            Unlock {upgradeName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Upgrade Preview */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">
                {upgradeType === 'skill' && '⭐'}
                {upgradeType === 'powerup' && '⚡'}
                {upgradeType === 'unlock' && '👑'}
                {upgradeType === 'boost' && '🚀'}
              </div>
              <h3 className="font-bold text-lg">{upgradeName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {upgradeType === 'skill' && 'Improve your gaming abilities'}
                {upgradeType === 'powerup' && 'Gain temporary advantages'}
                {upgradeType === 'unlock' && 'Access premium content'}
                {upgradeType === 'boost' && 'Speed up your progress'}
              </p>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <div className="space-y-3">
            <h4 className="font-semibold text-center">Choose your payment method:</h4>
            
            {/* Pi Payment Option */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">Pay with Pi</h5>
                      <p className="text-sm text-gray-600">Instant unlock</p>
                    </div>
                  </div>
                  <Badge className="bg-primary text-white">
                    {piCost} π
                  </Badge>
                </div>
                <Button 
                  onClick={handlePiPayment}
                  disabled={loading || piLoading || !isPiBrowser}
                  className="w-full mt-3"
                >
                  {loading || piLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4 mr-2" />
                      Pay {piCost} Pi
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Watch Ad Option */}
            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Watch Ad</h5>
                      <p className="text-sm text-gray-600">Free unlock</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    FREE
                  </Badge>
                </div>
                <Button 
                  onClick={handleWatchAd}
                  disabled={adLoading || !isPiBrowser}
                  variant="outline"
                  className="w-full mt-3 border-green-600 text-green-600 hover:bg-green-50"
                >
                  {adLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2" />
                      Loading Ad...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Watch 30s Ad
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Browser Notice */}
          {!isPiBrowser && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 text-center">
                💡 Use Pi Browser for full functionality
              </p>
            </div>
          )}

          {/* Cancel Button */}
          <Button variant="ghost" onClick={onClose} className="w-full">
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameUpgradeModal;

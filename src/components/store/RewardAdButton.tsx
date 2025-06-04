
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { toast } from '@/hooks/use-toast';

const RewardAdButton: React.FC = () => {
  const { addCoins } = useWallet();

  const watchAd = async () => {
    try {
      // Simulate watching an ad
      // In a real implementation, integrate with an ad provider like Google AdMob
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addCoins(1, 'Watched Ad');
      
      toast({
        title: "Ad Watched! 🎥",
        description: "You earned 1 Droplet Coin!",
        className: "bg-green-50 border-green-200"
      });
    } catch (error) {
      console.error('Ad watch failed:', error);
      toast({
        title: "Ad Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 text-lg"
      onClick={watchAd}
    >
      🎥 Watch Ad to Earn 1 Coin
    </Button>
  );
};

export default RewardAdButton;

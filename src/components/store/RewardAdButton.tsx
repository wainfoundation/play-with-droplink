
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Clock, Download } from 'lucide-react';
import { isRunningInPiBrowser, showRewardedAdAdvanced } from '@/utils/pi-sdk';

const RewardAdButton: React.FC = () => {
  const { refreshWallet } = useWallet();
  const { user } = useAuthSystem();
  const [loading, setLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<Date | null>(null);
  
  const isPiBrowser = isRunningInPiBrowser();

  const watchAd = async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to watch ads and earn coins",
        variant: "destructive"
      });
      return;
    }

    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please open this app in Pi Browser to watch ads",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // First, try to show the Pi ad
      const adResult = await showRewardedAdAdvanced();
      
      if (!adResult.success) {
        toast({
          title: "Ad Not Available",
          description: "No ads are currently available. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      // If ad was successful, call our backend to process the reward
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error('No valid session');
      }

      const { data: rewardData, error: functionError } = await supabase.functions.invoke(
        'reward-coin',
        {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        }
      );

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error('Failed to process reward');
      }

      if (rewardData.success) {
        toast({
          title: "Ad Watched! 🎥",
          description: `You earned ${rewardData.coins_earned} Droplet Coin!`,
          className: "bg-green-50 border-green-200"
        });
        
        // Refresh wallet to show new balance
        await refreshWallet();
      } else {
        if (rewardData.error === 'Cooldown active') {
          setCooldownTime(new Date(rewardData.next_available));
          toast({
            title: "Cooldown Active ⏰",
            description: "Please wait 5 minutes between ads",
            variant: "destructive"
          });
        } else {
          throw new Error(rewardData.error || 'Unknown error');
        }
      }

    } catch (error) {
      console.error('Ad watch failed:', error);
      toast({
        title: "Ad Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if still in cooldown
  const isInCooldown = cooldownTime && new Date() < cooldownTime;

  if (!isPiBrowser) {
    return (
      <Button
        variant="outline"
        className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
        onClick={() => window.open('https://minepi.com/download', '_blank')}
      >
        <Download className="h-4 w-4 mr-2" />
        Get Pi Browser to Watch Ads
      </Button>
    );
  }

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 text-lg"
      onClick={watchAd}
      disabled={loading || isInCooldown}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Loading Ad...
        </>
      ) : isInCooldown ? (
        <>
          <Clock className="h-4 w-4 mr-2" />
          Cooldown Active
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 mr-2" />
          🎥 Watch Ad to Earn 1 Coin
        </>
      )}
    </Button>
  );
};

export default RewardAdButton;

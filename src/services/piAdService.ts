
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { showRewardedAdAdvanced, isAdReady } from "@/utils/pi-ads";
import { isAdNetworkSupported } from "@/utils/pi-utils";

export interface AdReward {
  type: 'pi' | 'coins';
  amount: number;
  description: string;
}

export interface PiAdConfig {
  onReward?: (reward: AdReward) => void;
  onAdError?: (error: string) => void;
  onAdNotSupported?: () => void;
}

let adServiceInitialized = false;

export const isAdServiceReady = () => adServiceInitialized;

export const initializePiAds = async (config: PiAdConfig = {}): Promise<boolean> => {
  try {
    const isSupported = await isAdNetworkSupported();
    
    if (!isSupported) {
      console.warn('Pi Ad Network not supported in this environment');
      config.onAdNotSupported?.();
      return false;
    }
    
    adServiceInitialized = true;
    return true;
  } catch (error) {
    console.error('Error initializing Pi Ad Service:', error);
    return false;
  }
};

export const showRewardedAd = async (
  reward: AdReward = { 
    type: 'coins', 
    amount: 1, 
    description: 'Watch ad reward' 
  }
): Promise<boolean> => {
  if (!adServiceInitialized) {
    console.warn('Pi Ad Service not initialized');
    return false;
  }
  
  try {
    const ready = await isAdReady();
    if (!ready) {
      toast({
        title: "Ad Not Ready",
        description: "Please wait a moment and try again.",
        variant: "destructive",
      });
      return false;
    }
    
    let rewardGranted = false;
    
    const result = await showRewardedAdAdvanced({
      onAdLoaded: () => {
        console.log('Ad loaded');
      },
      onRewarded: () => {
        console.log('User earned reward');
        rewardGranted = true;
        
        // Grant the reward via backend
        const user = supabase.auth.getUser();
        user.then(({ data }) => {
          if (data.user) {
            supabase.functions.invoke('watch-ad-reward', {
              body: { user: data.user }
            }).then(({ data, error }) => {
              if (error) {
                console.error('Error granting reward:', error);
                toast({
                  title: "Reward Error",
                  description: "There was an error granting your reward.",
                  variant: "destructive",
                });
              } else if (data?.success) {
                toast({
                  title: "Reward Earned!",
                  description: `You earned +${data.coins_earned} coins.`,
                });
              }
            });
          }
        });
      },
      onAdClosed: () => {
        console.log('Ad closed, rewarded:', rewardGranted);
        if (!rewardGranted) {
          toast({
            title: "Ad Closed",
            description: "You need to finish watching the ad to earn the reward.",
          });
        }
      },
      onAdError: (error) => {
        console.error('Ad error:', error);
        toast({
          title: "Ad Error",
          description: "There was an error showing the ad.",
          variant: "destructive",
        });
      }
    });
    
    return result.success;
  } catch (error) {
    console.error('Error showing rewarded ad:', error);
    return false;
  }
};

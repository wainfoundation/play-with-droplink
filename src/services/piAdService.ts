
import { toast } from "@/hooks/use-toast";
import { 
  isRunningInPiBrowser, 
  initPiNetwork, 
  isAdNetworkSupported,
  showInterstitialAdAdvanced,
  showRewardedAdAdvanced,
  AdType,
  ShowAdResponse
} from "@/utils/pi-sdk";

export interface AdReward {
  type: "pi" | "credits" | "bonus";
  amount: number;
  description: string;
}

export interface AdServiceConfig {
  onReward?: (reward: AdReward) => void;
  onAdError?: (error: string) => void;
  onAdNotSupported?: () => void;
}

class PiAdService {
  private initialized = false;
  private adNetworkSupported = false;
  private config: AdServiceConfig = {};

  async initialize(config: AdServiceConfig = {}): Promise<boolean> {
    this.config = config;
    
    if (!isRunningInPiBrowser()) {
      console.warn("Pi Ads Service: Not running in Pi Browser");
      return false;
    }

    // Initialize Pi SDK
    const sdkInitialized = initPiNetwork();
    if (!sdkInitialized) {
      console.error("Pi Ads Service: Failed to initialize Pi SDK");
      return false;
    }

    // Check ad network support
    this.adNetworkSupported = await isAdNetworkSupported();
    if (!this.adNetworkSupported) {
      console.warn("Pi Ads Service: Ad network not supported on this Pi Browser version");
      this.config.onAdNotSupported?.();
      return false;
    }

    this.initialized = true;
    console.log("Pi Ads Service: Successfully initialized");
    return true;
  }

  isInitialized(): boolean {
    return this.initialized && this.adNetworkSupported;
  }

  async showInterstitialAd(): Promise<boolean> {
    if (!this.isInitialized()) {
      this.handleAdError("Ad service not initialized or not supported");
      return false;
    }

    try {
      const success = await showInterstitialAdAdvanced();
      
      if (success) {
        toast({
          title: "Ad Completed",
          description: "Thank you for watching the ad!",
        });
      } else {
        this.handleAdError("Failed to show interstitial ad");
      }
      
      return success;
    } catch (error) {
      this.handleAdError(`Interstitial ad error: ${error}`);
      return false;
    }
  }

  async showRewardedAd(reward: AdReward): Promise<boolean> {
    if (!this.isInitialized()) {
      this.handleAdError("Ad service not initialized or not supported");
      return false;
    }

    try {
      const result = await showRewardedAdAdvanced();
      
      if (result.success && result.adId) {
        // In a real app, you would verify the adId with Pi Platform API
        // For now, we'll simulate successful verification
        this.handleReward(reward, result.adId);
        return true;
      } else {
        this.handleAdError(result.error || "Failed to show rewarded ad");
        return false;
      }
    } catch (error) {
      this.handleAdError(`Rewarded ad error: ${error}`);
      return false;
    }
  }

  private handleReward(reward: AdReward, adId: string): void {
    console.log("Ad reward granted:", { reward, adId });
    
    toast({
      title: "Reward Earned!",
      description: `You've earned ${reward.amount} ${reward.type} for watching the ad!`,
    });
    
    this.config.onReward?.(reward);
  }

  private handleAdError(error: string): void {
    console.error("Pi Ads Service Error:", error);
    
    if (error.includes("ADS_NOT_SUPPORTED")) {
      toast({
        title: "Update Required",
        description: "Please update your Pi Browser to view ads.",
        variant: "destructive",
      });
      this.config.onAdNotSupported?.();
    } else {
      toast({
        title: "Ad Error",
        description: "Unable to show ad. Please try again later.",
        variant: "destructive",
      });
      this.config.onAdError?.(error);
    }
  }

  // Convenience method to show ads based on level progression (game example)
  async showAdForLevelCompletion(currentLevel: number, levelsPerAd: number = 3): Promise<void> {
    if (currentLevel % levelsPerAd === 0) {
      await this.showInterstitialAd();
    }
  }

  // Method to offer rewarded ad for extra lives/credits
  async offerRewardedAdForBonus(reward: AdReward): Promise<boolean> {
    return await this.showRewardedAd(reward);
  }
}

// Export singleton instance
export const piAdService = new PiAdService();

// Export helper functions for common use cases
export const initializePiAds = async (config?: AdServiceConfig): Promise<boolean> => {
  return await piAdService.initialize(config);
};

export const showInterstitialAd = async (): Promise<boolean> => {
  return await piAdService.showInterstitialAd();
};

export const showRewardedAd = async (reward: AdReward): Promise<boolean> => {
  return await piAdService.showRewardedAd(reward);
};

export const isAdServiceReady = (): boolean => {
  return piAdService.isInitialized();
};

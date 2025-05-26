
import { showRewardedAdAdvanced, showInterstitialAdAdvanced, isAdReady, requestAd } from "@/utils/pi-sdk";
import { toast } from "@/hooks/use-toast";

export interface AdReward {
  type: "pi" | "points" | "credits";
  amount: number;
  description: string;
}

interface AdServiceConfig {
  onReward?: (reward: AdReward) => void;
  onAdError?: (error: string) => void;
  onAdNotSupported?: () => void;
}

class PiAdService {
  private config: AdServiceConfig = {};
  private isInitialized = false;

  async initialize(config: AdServiceConfig): Promise<boolean> {
    this.config = config;
    
    try {
      if (!window.Pi?.Ads) {
        this.config.onAdNotSupported?.();
        return false;
      }
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error("Failed to initialize Pi Ad Service:", error);
      this.config.onAdError?.("Failed to initialize ad service");
      return false;
    }
  }

  async showRewardedAd(reward: AdReward): Promise<boolean> {
    if (!this.isInitialized) {
      this.config.onAdError?.("Ad service not initialized");
      return false;
    }

    try {
      const result = await showRewardedAdAdvanced();
      
      if (result.success) {
        this.config.onReward?.(reward);
        toast({
          title: "Reward Earned!",
          description: `You earned ${reward.amount} ${reward.type} for watching the ad.`,
        });
        return true;
      } else {
        this.config.onAdError?.(result.error || "Ad failed to show");
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown ad error";
      this.config.onAdError?.(errorMessage);
      return false;
    }
  }

  async showInterstitialAd(): Promise<boolean> {
    if (!this.isInitialized) {
      this.config.onAdError?.("Ad service not initialized");
      return false;
    }

    try {
      return await showInterstitialAdAdvanced();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown ad error";
      this.config.onAdError?.(errorMessage);
      return false;
    }
  }

  async isAdAvailable(adType: "interstitial" | "rewarded"): Promise<boolean> {
    if (!this.isInitialized) {
      return false;
    }

    try {
      return await isAdReady(adType);
    } catch (error) {
      console.error("Error checking ad availability:", error);
      return false;
    }
  }

  async preloadAd(adType: "interstitial" | "rewarded"): Promise<boolean> {
    if (!this.isInitialized) {
      return false;
    }

    try {
      const response = await requestAd(adType);
      return response.result === "AD_LOADED";
    } catch (error) {
      console.error("Error preloading ad:", error);
      return false;
    }
  }
}

// Export singleton instance
export const piAdService = new PiAdService();

// Export convenience functions
export const initializePiAds = (config: AdServiceConfig) => piAdService.initialize(config);
export const showRewardedAd = (reward: AdReward) => piAdService.showRewardedAd(reward);
export const showInterstitialAd = () => piAdService.showInterstitialAd();
export const isAdServiceReady = () => piAdService['isInitialized'];

export default piAdService;

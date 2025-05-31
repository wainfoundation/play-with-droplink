
import { showRewardedAdAdvanced, showInterstitialAdAdvanced, isAdReady, requestAd, isAdNetworkSupported, initPiNetwork } from "@/utils/pi-sdk";
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
  private adNetworkSupported = false;

  async initialize(config: AdServiceConfig): Promise<boolean> {
    this.config = config;
    
    try {
      // First initialize Pi Network
      const piInitialized = initPiNetwork();
      if (!piInitialized) {
        this.config.onAdNotSupported?.();
        return false;
      }

      // Check if ad network is supported
      this.adNetworkSupported = await isAdNetworkSupported();
      
      if (!this.adNetworkSupported) {
        console.log("Ad network not supported in this Pi Browser version");
        this.config.onAdNotSupported?.();
        return false;
      }

      // Cache the status
      localStorage.setItem("pi_ads_enabled", "true");
      
      this.isInitialized = true;
      console.log("Pi Ad Service initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize Pi Ad Service:", error);
      this.config.onAdError?.("Failed to initialize ad service");
      return false;
    }
  }

  async showRewardedAd(reward: AdReward): Promise<boolean> {
    if (!this.isInitialized || !this.adNetworkSupported) {
      this.config.onAdError?.("Ad service not ready");
      return false;
    }

    try {
      // Check if ad is ready
      const ready = await isAdReady("rewarded");
      
      if (!ready) {
        console.log("Requesting rewarded ad...");
        const requestResult = await requestAd("rewarded");
        
        if (requestResult.result === "ADS_NOT_SUPPORTED") {
          this.config.onAdNotSupported?.();
          return false;
        }
        
        if (requestResult.result !== "AD_LOADED") {
          this.config.onAdError?.("Ad not available");
          return false;
        }
      }

      const result = await showRewardedAdAdvanced();
      
      if (result.success) {
        this.config.onReward?.(reward);
        toast({
          title: "Reward Earned! 🎉",
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
    if (!this.isInitialized || !this.adNetworkSupported) {
      this.config.onAdError?.("Ad service not ready");
      return false;
    }

    try {
      const ready = await isAdReady("interstitial");
      
      if (!ready) {
        console.log("Requesting interstitial ad...");
        const requestResult = await requestAd("interstitial");
        
        if (requestResult.result !== "AD_LOADED") {
          return false;
        }
      }

      return await showInterstitialAdAdvanced();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown ad error";
      this.config.onAdError?.(errorMessage);
      return false;
    }
  }

  async isAdAvailable(adType: "interstitial" | "rewarded"): Promise<boolean> {
    if (!this.isInitialized || !this.adNetworkSupported) {
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
    if (!this.isInitialized || !this.adNetworkSupported) {
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

  getAdNetworkStatus(): boolean {
    return this.adNetworkSupported;
  }

  isServiceReady(): boolean {
    return this.isInitialized && this.adNetworkSupported;
  }
}

// Export singleton instance
export const piAdService = new PiAdService();

// Export convenience functions
export const initializePiAds = (config: AdServiceConfig) => piAdService.initialize(config);
export const showRewardedAd = (reward: AdReward) => piAdService.showRewardedAd(reward);
export const showInterstitialAd = () => piAdService.showInterstitialAd();
export const isAdServiceReady = () => piAdService.isServiceReady();

export default piAdService;

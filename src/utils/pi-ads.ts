
/**
 * Pi Network Ads Module
 */
import PiLogger from './pi-logger';
import { AdType, ShowAdResponse, IsAdReadyResponse, RequestAdResponse } from './pi-types';

// Basic ad methods
export const isAdReady = async (adType: AdType): Promise<boolean> => {
  try {
    if (!window.Pi?.Ads) {
      PiLogger.warn('ad_not_available', { adType });
      return false;
    }
    
    const response = await window.Pi.Ads.isAdReady(adType);
    return response.ready;
  } catch (error) {
    PiLogger.error('ad_check_error', error);
    return false;
  }
};

export const requestAd = async (adType: AdType): Promise<RequestAdResponse> => {
  try {
    if (!window.Pi?.Ads) {
      throw new Error("Pi Ads not available");
    }
    
    const response = await window.Pi.Ads.requestAd(adType);
    console.log("Request ad response:", response);
    return response;
  } catch (error) {
    console.error("Error requesting ad:", error);
    throw error;
  }
};

export const showAd = async (adType: AdType): Promise<ShowAdResponse> => {
  try {
    if (!window.Pi?.Ads) {
      throw new Error("Pi Ads not available");
    }
    
    const response = await window.Pi.Ads.showAd(adType);
    console.log("Show ad response:", response);
    return response;
  } catch (error) {
    console.error("Error showing ad:", error);
    throw error;
  }
};

// Advanced ad methods with full error handling
export const showInterstitialAdAdvanced = async (): Promise<boolean> => {
  try {
    PiLogger.info('ad_interstitial_start');
    const isReady = await isAdReady("interstitial");
    
    if (!isReady) {
      PiLogger.info('ad_interstitial_request');
      const requestResponse = await requestAd("interstitial");
      
      if (requestResponse.result === "ADS_NOT_SUPPORTED") {
        PiLogger.warn('ad_interstitial_not_supported');
        return false;
      }
      
      if (requestResponse.result !== "AD_LOADED") {
        PiLogger.warn('ad_interstitial_load_failed', { result: requestResponse.result });
        return false;
      }
    }
    
    const showResponse = await showAd("interstitial");
    const success = showResponse.result === "AD_CLOSED";
    
    PiLogger.info('ad_interstitial_complete', { 
      success, 
      result: showResponse.result 
    });
    
    return success;
  } catch (error) {
    PiLogger.error('ad_interstitial_error', error);
    return false;
  }
};

export const showRewardedAdAdvanced = async (): Promise<{ success: boolean; adId?: string; error?: string }> => {
  try {
    PiLogger.info('ad_rewarded_start');
    const isReady = await isAdReady("rewarded");
    
    if (!isReady) {
      PiLogger.info('ad_rewarded_request');
      const requestResponse = await requestAd("rewarded");
      
      if (requestResponse.result === "ADS_NOT_SUPPORTED") {
        PiLogger.warn('ad_rewarded_not_supported');
        return { success: false, error: "ADS_NOT_SUPPORTED" };
      }
      
      if (requestResponse.result !== "AD_LOADED") {
        PiLogger.warn('ad_rewarded_load_failed', { result: requestResponse.result });
        return { success: false, error: "AD_NOT_AVAILABLE" };
      }
    }
    
    const showResponse = await showAd("rewarded");
    
    if (showResponse.result === "AD_REWARDED") {
      PiLogger.info('ad_rewarded_success', { adId: showResponse.adId });
      return { success: true, adId: showResponse.adId };
    } else {
      PiLogger.warn('ad_rewarded_failed', { result: showResponse.result });
      return { success: false, error: showResponse.result };
    }
  } catch (error) {
    PiLogger.error('ad_rewarded_error', error);
    return { success: false, error: "UNEXPECTED_ERROR" };
  }
};

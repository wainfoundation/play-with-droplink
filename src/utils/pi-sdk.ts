
/**
 * Pi Network SDK utility functions
 */

// Types from Pi SDK documentation
export interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

export interface PiPaymentData {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

// Internal Pi payment interface that includes identifier
interface PiPayment {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
  identifier: string;
}

export interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

// Ad related types
export type AdType = "interstitial" | "rewarded";
export type NativeFeature = "inline_media" | "request_permission" | "ad_network";

export type ShowAdResponse =
  | {
      type: "interstitial";
      result: "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE";
    }
  | {
      type: "rewarded";
      result: "AD_REWARDED" | "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED" | "USER_UNAUTHENTICATED";
      adId?: string;
    };

export type IsAdReadyResponse = {
  type: "interstitial" | "rewarded";
  ready: boolean;
};

export type RequestAdResponse = {
  type: "interstitial" | "rewarded";
  result: "AD_LOADED" | "AD_FAILED_TO_LOAD" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED";
};

// Updated global window type to include all Pi SDK features
declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound?: (payment: any) => void
      ) => Promise<PiAuthResult>;
      createPayment: (
        payment: PiPayment,
        callbacks: PaymentCallbacks
      ) => Promise<any>;
      nativeFeaturesList: () => Promise<Array<NativeFeature>>;
      openShareDialog: (title: string, message: string) => void;
      openUrlInSystemBrowser: (url: string) => Promise<void>;
      Ads?: {
        showAd: (adType: AdType) => Promise<ShowAdResponse>;
        isAdReady: (adType: AdType) => Promise<IsAdReadyResponse>;
        requestAd: (adType: AdType) => Promise<RequestAdResponse>;
      };
    };
  }
}

// Check if running in Pi Browser
export const isRunningInPiBrowser = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.Pi) {
      console.log("Pi SDK detected - running in Pi Browser");
      return true;
    }
    
    // Check for Pi Browser specific user agent strings
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('pibrowser') || userAgent.includes('pi network') || userAgent.includes('pi-browser')) {
      console.log("Pi Browser detected via user agent");
      return true;
    }
    
    console.log("Not running in Pi Browser");
    return false;
  } catch (error) {
    console.error("Error checking Pi Browser environment:", error);
    return false;
  }
};

// Initialize Pi SDK according to documentation
export const initPiNetwork = (): boolean => {
  try {
    if (!window.Pi) {
      console.warn("Pi SDK not available. This app works best in Pi Browser.");
      return false;
    }

    // Check if we're in development or production
    const isSandbox = import.meta.env.DEV || 
                     window.location.hostname.includes('localhost') || 
                     window.location.hostname.includes('lovableproject.com') ||
                     import.meta.env.VITE_PI_SANDBOX === 'true';
    
    window.Pi.init({ version: "2.0", sandbox: isSandbox });
    console.log("Pi SDK initialized with sandbox mode:", isSandbox);
    return true;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Check native features list
export const getNativeFeatures = async (): Promise<Array<NativeFeature>> => {
  try {
    if (!window.Pi) {
      console.warn("Pi SDK not available");
      return [];
    }

    const features = await window.Pi.nativeFeaturesList();
    console.log("Available native features:", features);
    return features;
  } catch (error) {
    console.error("Error getting native features:", error);
    return [];
  }
};

// Check if ad network is supported
export const isAdNetworkSupported = async (): Promise<boolean> => {
  try {
    const features = await getNativeFeatures();
    const supported = features.includes("ad_network");
    console.log("Ad network supported:", supported);
    return supported;
  } catch (error) {
    console.error("Error checking ad network support:", error);
    return false;
  }
};

// Authenticate user with Pi Network according to documentation
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    if (!window.Pi) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    // Handle any incomplete payments as per documentation
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      // This should be handled by sending to server for completion
      return null;
    };

    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Pi authentication successful:", authResult);
    return authResult as PiAuthResult;
  } catch (error) {
    console.error("Pi authentication failed:", error);
    return null;
  }
};

// Create payment using Pi SDK according to documentation
export const createPiPayment = async (
  paymentData: PiPaymentData,
  callbacks: PaymentCallbacks
): Promise<void> => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not initialized or not available");
    }

    // Ensure SDK is initialized
    initPiNetwork();

    // Create the payment object with required identifier
    const piPayment: PiPayment = {
      ...paymentData,
      identifier: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    await window.Pi.createPayment(piPayment, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
    throw error;
  }
};

// Basic ad methods
export const isAdReady = async (adType: AdType): Promise<boolean> => {
  try {
    if (!window.Pi?.Ads) {
      console.warn("Pi Ads not available");
      return false;
    }
    
    const response = await window.Pi.Ads.isAdReady(adType);
    return response.ready;
  } catch (error) {
    console.error("Error checking ad readiness:", error);
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
    const isReady = await isAdReady("interstitial");
    
    if (!isReady) {
      const requestResponse = await requestAd("interstitial");
      
      if (requestResponse.result === "ADS_NOT_SUPPORTED") {
        console.warn("Ads not supported - Pi Browser needs update");
        return false;
      }
      
      if (requestResponse.result !== "AD_LOADED") {
        console.warn("Ad could not be loaded:", requestResponse.result);
        return false;
      }
    }
    
    const showResponse = await showAd("interstitial");
    return showResponse.result === "AD_CLOSED";
  } catch (error) {
    console.error("Error in advanced interstitial ad flow:", error);
    return false;
  }
};

export const showRewardedAdAdvanced = async (): Promise<{ success: boolean; adId?: string; error?: string }> => {
  try {
    const isReady = await isAdReady("rewarded");
    
    if (!isReady) {
      const requestResponse = await requestAd("rewarded");
      
      if (requestResponse.result === "ADS_NOT_SUPPORTED") {
        return { success: false, error: "ADS_NOT_SUPPORTED" };
      }
      
      if (requestResponse.result !== "AD_LOADED") {
        return { success: false, error: "AD_NOT_AVAILABLE" };
      }
    }
    
    const showResponse = await showAd("rewarded");
    
    if (showResponse.result === "AD_REWARDED") {
      return { success: true, adId: showResponse.adId };
    } else {
      return { success: false, error: showResponse.result };
    }
  } catch (error) {
    console.error("Error in advanced rewarded ad flow:", error);
    return { success: false, error: "UNEXPECTED_ERROR" };
  }
};

// Share dialog
export const openShareDialog = (title: string, message: string): void => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }
    
    window.Pi.openShareDialog(title, message);
  } catch (error) {
    console.error("Error opening share dialog:", error);
    throw error;
  }
};

// Open URL in system browser
export const openUrlInSystemBrowser = async (url: string): Promise<void> => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }
    
    await window.Pi.openUrlInSystemBrowser(url);
  } catch (error) {
    console.error("Error opening URL in system browser:", error);
    throw error;
  }
};

export default {
  isRunningInPiBrowser,
  initPiNetwork,
  getNativeFeatures,
  isAdNetworkSupported,
  authenticateWithPi,
  createPiPayment,
  isAdReady,
  requestAd,
  showAd,
  showInterstitialAdAdvanced,
  showRewardedAdAdvanced,
  openShareDialog,
  openUrlInSystemBrowser,
};

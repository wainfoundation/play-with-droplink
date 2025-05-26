
/**
 * Pi Network SDK utility functions
 */
import PiLogger from './pi-logger';

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
    // In development, we'll simulate Pi browser for testing
    if (import.meta.env.DEV) {
      console.log("Development mode: simulating Pi Browser");
      return true;
    }
    
    if (typeof window !== 'undefined' && window.Pi) {
      PiLogger.info('browser_check', { result: 'pi_browser_detected' });
      return true;
    }
    
    // Check for Pi Browser specific user agent strings
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('pibrowser') || userAgent.includes('pi network') || userAgent.includes('pi-browser')) {
      PiLogger.info('browser_check', { result: 'pi_browser_via_useragent' });
      return true;
    }
    
    PiLogger.info('browser_check', { result: 'not_pi_browser' });
    return false;
  } catch (error) {
    PiLogger.error('browser_check_error', error);
    return false;
  }
};

// Initialize Pi SDK according to documentation
export const initPiNetwork = (): boolean => {
  try {
    // In development, simulate successful initialization
    if (import.meta.env.DEV) {
      console.log("Development mode: simulating Pi SDK initialization");
      
      // Create a mock Pi object for development
      if (!window.Pi) {
        (window as any).Pi = {
          init: (config: any) => {
            console.log("Mock Pi.init called with:", config);
          },
          authenticate: async (scopes: string[]) => {
            console.log("Mock Pi.authenticate called with scopes:", scopes);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            return {
              accessToken: 'dev-mock-token-' + Date.now(),
              user: {
                uid: 'dev-user-' + Math.random().toString(36).substr(2, 9),
                username: 'DevUser' + Math.floor(Math.random() * 1000)
              }
            };
          }
        };
      }
      
      window.Pi.init({ version: "2.0", sandbox: true });
      return true;
    }

    if (!window.Pi) {
      PiLogger.warn('init_failed', { reason: 'pi_sdk_not_available' });
      return false;
    }

    // Check if we're in development or production
    const isSandbox = import.meta.env.DEV || 
                     window.location.hostname.includes('localhost') || 
                     window.location.hostname.includes('lovableproject.com') ||
                     import.meta.env.VITE_PI_SANDBOX === 'true';
    
    window.Pi.init({ version: "2.0", sandbox: isSandbox });
    PiLogger.info('init_success', { 
      sandboxMode: isSandbox,
      version: '2.0',
      hostname: window.location.hostname
    });
    return true;
  } catch (error) {
    PiLogger.error('init_error', error);
    return false;
  }
};

// Check native features list
export const getNativeFeatures = async (): Promise<Array<NativeFeature>> => {
  try {
    if (!window.Pi) {
      PiLogger.warn('features_check_failed', { reason: 'pi_sdk_not_available' });
      return [];
    }

    const features = await window.Pi.nativeFeaturesList();
    PiLogger.info('features_retrieved', { features, count: features.length });
    return features;
  } catch (error) {
    PiLogger.error('features_error', error);
    return [];
  }
};

// Check if ad network is supported
export const isAdNetworkSupported = async (): Promise<boolean> => {
  try {
    const features = await getNativeFeatures();
    const supported = features.includes("ad_network");
    PiLogger.info('ad_network_check', { supported, features });
    return supported;
  } catch (error) {
    PiLogger.error('ad_network_check_error', error);
    return false;
  }
};

// Authenticate user with Pi Network according to documentation
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    if (!window.Pi) {
      PiLogger.error('auth_error', 'Pi SDK not initialized or not available');
      return null;
    }

    // Handle any incomplete payments as per documentation
    const onIncompletePaymentFound = (payment: any) => {
      PiLogger.warn('incomplete_payment_found', { paymentId: payment?.identifier });
      return null;
    };

    PiLogger.info('auth_start', { scopes });
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    PiLogger.auth('success', authResult, { scopes });
    return authResult as PiAuthResult;
  } catch (error) {
    PiLogger.error('auth_error', error, { scopes });
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

    PiLogger.payment('create_start', piPayment);

    // Wrap callbacks with logging
    const wrappedCallbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        PiLogger.payment('server_approval_ready', { paymentId });
        callbacks.onReadyForServerApproval(paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        PiLogger.payment('server_completion_ready', { paymentId, txid });
        callbacks.onReadyForServerCompletion(paymentId, txid);
      },
      onCancel: (paymentId: string) => {
        PiLogger.payment('cancelled', { paymentId });
        callbacks.onCancel(paymentId);
      },
      onError: (error: Error, payment?: any) => {
        PiLogger.error('payment_error', error, { 
          paymentId: payment?.identifier,
          amount: piPayment.amount 
        });
        callbacks.onError(error, payment);
      },
    };

    await window.Pi.createPayment(piPayment, wrappedCallbacks);
    PiLogger.payment('create_success', piPayment);
  } catch (error) {
    PiLogger.error('payment_create_error', error, { 
      amount: paymentData.amount,
      memo: paymentData.memo 
    });
    throw error;
  }
};

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

// Share dialog
export const openShareDialog = (title: string, message: string): void => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }
    
    PiLogger.info('share_dialog_open', { title, message: message.substring(0, 50) + '...' });
    window.Pi.openShareDialog(title, message);
  } catch (error) {
    PiLogger.error('share_dialog_error', error);
    throw error;
  }
};

// Open URL in system browser
export const openUrlInSystemBrowser = async (url: string): Promise<void> => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }
    
    PiLogger.info('system_browser_open', { url });
    await window.Pi.openUrlInSystemBrowser(url);
  } catch (error) {
    PiLogger.error('system_browser_error', error, { url });
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

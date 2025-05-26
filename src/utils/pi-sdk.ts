
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

// Updated global window type to include Ads
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
      Ads?: {
        showAd: (adType: "interstitial" | "rewarded") => Promise<any>;
        isAdReady: (adType: "interstitial" | "rewarded") => Promise<{ ready: boolean; type: string }>;
        requestAd: (adType: "interstitial" | "rewarded") => Promise<any>;
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

// Check if ads are ready
export const isAdReady = async (adType: "interstitial" | "rewarded"): Promise<boolean> => {
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

// Show ads according to documentation
export const showAd = async (adType: "interstitial" | "rewarded") => {
  try {
    if (!window.Pi?.Ads) {
      throw new Error("Pi Ads not available");
    }
    
    const response = await window.Pi.Ads.showAd(adType);
    return response;
  } catch (error) {
    console.error("Error showing ad:", error);
    throw error;
  }
};

export default {
  isRunningInPiBrowser,
  initPiNetwork,
  authenticateWithPi,
  createPiPayment,
  isAdReady,
  showAd,
};

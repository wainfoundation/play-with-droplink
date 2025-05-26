
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

export interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
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

    await window.Pi.createPayment(paymentData, callbacks);
  } catch (error) {
    console.error("Payment creation failed:", error);
    throw error;
  }
};

// Check if ads are ready
export const isAdReady = async (adType: "interstitial" | "rewarded"): Promise<boolean> => {
  try {
    if (!window.Pi?.Ads) {
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

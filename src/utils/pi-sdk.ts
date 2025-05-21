
/**
 * Pi Network SDK utility functions
 */

// Types
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

// Check if running in Pi Browser
export const isRunningInPiBrowser = (): boolean => {
  try {
    // Check if Pi SDK is available
    if (typeof window !== 'undefined' && window.Pi) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking Pi Browser environment:", error);
    return false;
  }
};

// Initialize Pi SDK with environment detection
export const initPiNetwork = (): boolean => {
  try {
    if (isRunningInPiBrowser()) {
      // Check if we're in development or production
      const isSandbox = import.meta.env.DEV || 
                         window.location.hostname.includes('localhost') || 
                         window.location.hostname.includes('lovableproject.com');
      
      window.Pi.init({ version: "2.0", sandbox: isSandbox });
      console.log("Pi SDK initialized with sandbox mode:", isSandbox);
      return true;
    }
    console.warn("Pi SDK not available. This app works best in Pi Browser.");
    return false;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    if (!isRunningInPiBrowser()) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      // Handle incomplete payment
      return null;
    };

    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Authentication successful:", auth);
    return auth;
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};

export default {
  isRunningInPiBrowser,
  initPiNetwork,
  authenticateWithPi,
};

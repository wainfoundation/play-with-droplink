
// Define interfaces for Pi Network authentication
interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username?: string;
  };
}

interface PiPayment {
  amount: number;
  identifier: string;
  memo?: string;
  metadata?: Record<string, any>;
}

interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

// Type declaration for the global Pi object
declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound?: (payment: any) => void
      ) => Promise<PiAuthResult>;
      createPayment: (
        payment: PiPayment,
        callbacks: PiPaymentCallbacks
      ) => Promise<any>;
    };
  }
}

// Initialize Pi SDK
export const initPiNetwork = (sandbox: boolean = true): boolean => {
  try {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox });
      return true;
    }
    console.error("Pi SDK not found. Make sure to include the Pi SDK script.");
    return false;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async (
  scopes: string[] = ["username"]
): Promise<PiAuthResult | null> => {
  try {
    if (!window.Pi) {
      console.error("Pi SDK not initialized");
      return null;
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      // Here you would typically handle the incomplete payment
    };

    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    console.log("Authentication successful:", auth);
    return auth;
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};

// Create a payment with Pi
export const createPiPayment = async (
  amount: number,
  memo: string = "Payment for services",
  metadata: Record<string, any> = {}
): Promise<any> => {
  try {
    if (!window.Pi) {
      console.error("Pi SDK not initialized");
      return null;
    }

    const paymentData: PiPayment = {
      amount,
      identifier: `payment-${Date.now()}`, // Generate a unique identifier
      memo,
      metadata,
    };

    const paymentCallbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        // Here you would call your server to approve the payment
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        console.log("Payment completed:", paymentId, "Transaction ID:", txid);
        // Here you would call your server to complete the payment
      },
      onCancel: (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
      },
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
      },
    };

    const payment = await window.Pi.createPayment(paymentData, paymentCallbacks);
    return payment;
  } catch (error) {
    console.error("Payment creation failed:", error);
    return null;
  }
};

export default {
  initPiNetwork,
  authenticateWithPi,
  createPiPayment,
};


import { 
  PiAuthResult, 
  PiPaymentData, 
  PaymentCallbacks, 
  initPiNetwork as initPiSDK, 
  authenticateWithPi as authenticateWithPiSDK, 
  createPiPayment as createPiPaymentSDK 
} from "@/utils/pi-sdk";

// Get environment variables using Vite's import.meta.env
const PI_API_KEY = import.meta.env.VITE_PI_API_KEY;
const PI_SANDBOX = import.meta.env.DEV;

// Initialize Pi SDK
export const initPiNetwork = (): boolean => {
  return initPiSDK();
};

// Authenticate user with Pi Network
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments"]
): Promise<PiAuthResult | null> => {
  return await authenticateWithPiSDK(scopes);
};

// Create a payment with Pi
export const createPiPayment = async (
  amount: number,
  memo: string = "Payment for services",
  metadata: Record<string, any> = {}
): Promise<any> => {
  try {
    const paymentData: PiPaymentData = {
      amount,
      memo,
      metadata,
    };

    const paymentCallbacks: PaymentCallbacks = {
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

    await createPiPaymentSDK(paymentData, paymentCallbacks);
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

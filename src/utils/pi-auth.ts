
/**
 * Pi Network Authentication Module
 */
import PiLogger from './pi-logger';
import { PiAuthResult } from './pi-types';

// Callback function for incomplete payments as per documentation
const onIncompletePaymentFound = (payment: any) => {
  PiLogger.warn('incomplete_payment_found', { paymentId: payment?.identifier });
  console.log("Incomplete payment found:", payment);
  // Developer should implement logic to handle incomplete payments
  return payment;
};

// Authenticate user with Pi Network following official documentation
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    if (!window.Pi) {
      PiLogger.error('auth_error', 'Pi SDK not initialized or not available');
      return null;
    }

    PiLogger.info('auth_start', { scopes });
    
    // Call authenticate with scopes and incomplete payment callback as per docs
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    PiLogger.auth('success', authResult, { scopes });
    return authResult as PiAuthResult;
  } catch (error) {
    PiLogger.error('auth_error', error, { scopes });
    return null;
  }
};

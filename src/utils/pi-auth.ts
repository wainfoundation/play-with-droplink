
/**
 * Pi Network Authentication Module - Production Mode
 */
import PiLogger from './pi-logger';
import { PiAuthResult } from './pi-types';

// Pi API endpoints for production
const PI_API_URL = "https://api.minepi.com";

// Callback function for incomplete payments as per documentation
const onIncompletePaymentFound = (payment: any) => {
  PiLogger.warn('incomplete_payment_found', { paymentId: payment?.identifier });
  console.log("Incomplete payment found:", payment);
  return payment;
};

// Validate user with Pi API using access token
const validateUserWithPiAPI = async (accessToken: string): Promise<any> => {
  try {
    const response = await fetch(`${PI_API_URL}/v2/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Pi API validation failed: ${response.status}`);
    }

    const userData = await response.json();
    PiLogger.info('pi_api_validation_success', { uid: userData.uid });
    return userData;
  } catch (error) {
    PiLogger.error('pi_api_validation_error', error);
    throw error;
  }
};

// Authenticate user with Pi Network - Production Mode Only
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments"]
): Promise<PiAuthResult | null> => {
  try {
    // Check if we're in Pi Browser
    if (!window.Pi) {
      throw new Error('Pi SDK not available - must use Pi Browser');
    }

    // Ensure we're in production mode
    const isProduction = import.meta.env.PROD || import.meta.env.VITE_PI_SANDBOX === 'false';
    if (!isProduction) {
      throw new Error('Production mode required for Pi authentication');
    }

    PiLogger.info('auth_start_production', { scopes });
    
    // Call authenticate with scopes and incomplete payment callback
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    if (!authResult || !authResult.accessToken) {
      throw new Error('No access token received from Pi authentication');
    }

    // Validate the access token with Pi API
    const validatedUser = await validateUserWithPiAPI(authResult.accessToken);
    
    // Ensure the user data matches
    if (validatedUser.uid !== authResult.user.uid) {
      throw new Error('User validation failed - UID mismatch');
    }

    PiLogger.auth('success_production', authResult, { scopes, validated: true });
    return authResult as PiAuthResult;
  } catch (error) {
    PiLogger.error('auth_error_production', error, { scopes });
    throw error;
  }
};

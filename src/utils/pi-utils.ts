
/**
 * Pi Network Utility Functions
 */
import PiLogger from './pi-logger';
import { NativeFeature } from './pi-types';

// Check if running in Pi Browser
export const isRunningInPiBrowser = (): boolean => {
  try {
    // Check for Pi Browser specific indicators
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
    
    // In development, we'll simulate Pi browser for testing only when specifically enabled
    if (import.meta.env.DEV && import.meta.env.VITE_PI_SANDBOX === 'true') {
      console.log("Development mode: simulating Pi Browser (sandbox mode)");
      return true;
    }
    
    PiLogger.info('browser_check', { result: 'not_pi_browser' });
    return false;
  } catch (error) {
    PiLogger.error('browser_check_error', error);
    return false;
  }
};

// Redirect to Pi Browser if not already in Pi Browser
export const redirectToPiBrowser = (currentUrl?: string): void => {
  const url = currentUrl || window.location.href;
  const piUrl = `https://minepi.com/browser/open?url=${encodeURIComponent(url)}`;
  window.location.href = piUrl;
};

// Auto-detect and redirect if not in Pi Browser
export const autoDetectAndRedirect = (): boolean => {
  const isPiBrowser = isRunningInPiBrowser();
  
  if (!isPiBrowser) {
    console.log("Not running in Pi Browser, redirecting...");
    PiLogger.info('auto_redirect', { reason: 'not_pi_browser' });
    redirectToPiBrowser();
    return false;
  }
  
  return true;
};

// Get native features available in Pi Browser
export const getNativeFeatures = async (): Promise<NativeFeature[]> => {
  try {
    if (!window.Pi) {
      PiLogger.warn('native_features_not_available', { reason: 'pi_sdk_not_available' });
      return [];
    }

    // In development mode with sandbox, return mock features
    if (import.meta.env.DEV && import.meta.env.VITE_PI_SANDBOX === 'true') {
      console.log("Mock native features returned (sandbox mode)");
      return ["inline_media", "request_permission", "ad_network"];
    }

    const features = await window.Pi.nativeFeaturesList();
    PiLogger.info('native_features_retrieved', { features });
    return features;
  } catch (error) {
    PiLogger.error('native_features_error', error);
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

// Initialize Pi SDK according to official documentation
export const initPiNetwork = (): boolean => {
  try {
    // Check if we're in production mode
    const isProduction = import.meta.env.PROD || import.meta.env.VITE_PI_SANDBOX === 'false';
    
    if (!isProduction && import.meta.env.DEV && import.meta.env.VITE_PI_SANDBOX === 'true') {
      console.log("Development sandbox mode: simulating Pi SDK initialization");
      
      // Create a mock Pi object for development following official structure
      if (!window.Pi) {
        (window as any).Pi = {
          init: (config: any) => {
            console.log("Mock Pi.init called with:", config);
          },
          authenticate: async (scopes: string[], onIncompletePaymentFound?: (payment: any) => void) => {
            console.log("Mock Pi.authenticate called with scopes:", scopes);
            
            // Handle incomplete payments callback if provided
            if (onIncompletePaymentFound) {
              // Simulate no incomplete payments found
              console.log("No incomplete payments found in mock");
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            
            // Return auth result with username if requested
            const authResult = {
              accessToken: 'dev-mock-token-' + Date.now(),
              user: {
                uid: 'dev-user-wain2020',
                username: scopes.includes('username') ? 'Wain2020' : undefined as any
              }
            };
            
            // Clean up undefined username if not requested
            if (!scopes.includes('username')) {
              delete (authResult.user as any).username;
            }
            
            return authResult;
          },
          createPayment: async (paymentData: any, callbacks: any) => {
            console.log("Mock Pi.createPayment called with:", paymentData);
            
            // Simulate payment flow
            setTimeout(() => {
              console.log("Simulating payment approval...");
              callbacks.onReadyForServerApproval(paymentData.identifier);
            }, 1000);
            
            setTimeout(() => {
              console.log("Simulating payment completion...");
              callbacks.onReadyForServerCompletion(paymentData.identifier, 'mock-txid-' + Date.now());
            }, 2000);
            
            return { paymentId: paymentData.identifier };
          },
          nativeFeaturesList: async () => {
            console.log("Mock Pi.nativeFeaturesList called");
            return ["inline_media", "request_permission", "ad_network"];
          },
          openShareDialog: (title: string, message: string) => {
            console.log("Mock Pi.openShareDialog called:", title, message);
          },
          openUrlInSystemBrowser: async (url: string) => {
            console.log("Mock Pi.openUrlInSystemBrowser called:", url);
          },
          Ads: {
            showAd: async (adType: any) => {
              console.log("Mock Pi.Ads.showAd called:", adType);
              if (adType === "rewarded") {
                return { type: "rewarded", result: "AD_REWARDED", adId: "mock-ad-" + Date.now() };
              }
              return { type: "interstitial", result: "AD_CLOSED" };
            },
            isAdReady: async (adType: any) => {
              console.log("Mock Pi.Ads.isAdReady called:", adType);
              return { type: adType, ready: true };
            },
            requestAd: async (adType: any) => {
              console.log("Mock Pi.Ads.requestAd called:", adType);
              return { type: adType, result: "AD_LOADED" };
            }
          }
        };
      }
    }

    if (!window.Pi) {
      PiLogger.warn('init_failed', { reason: 'pi_sdk_not_available' });
      return false;
    }

    // Initialize according to official documentation
    const isSandbox = import.meta.env.VITE_PI_SANDBOX === 'true';
    
    window.Pi.init({ 
      version: "2.0", 
      sandbox: isSandbox
    });
    
    PiLogger.info('init_success', { 
      sandboxMode: isSandbox,
      version: '2.0',
      hostname: window.location.hostname,
      production: isProduction
    });
    return true;
  } catch (error) {
    PiLogger.error('init_error', error);
    return false;
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

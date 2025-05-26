/**
 * Pi Network Utility Functions - Production Mode
 */
import PiLogger from './pi-logger';
import { NativeFeature } from './pi-types';

// Check if running in Pi Browser - Production Mode
export const isRunningInPiBrowser = (): boolean => {
  try {
    // In production, we must be in actual Pi Browser
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

// Redirect to Pi Browser if not already in Pi Browser
export const redirectToPiBrowser = (currentUrl?: string): void => {
  const url = currentUrl || window.location.href;
  const piUrl = `https://minepi.com/browser/open?url=${encodeURIComponent(url)}`;
  
  PiLogger.info('redirect_to_pi_browser', { originalUrl: url, piUrl });
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

// Initialize Pi SDK - More flexible mode checking
export const initPiNetwork = (): boolean => {
  try {
    // Enforce Pi Browser requirement
    if (!isRunningInPiBrowser()) {
      const error = new Error('Pi Browser required for Pi Network features');
      PiLogger.error('init_failed_not_pi_browser', error);
      throw error;
    }

    if (!window.Pi) {
      const error = new Error('Pi SDK not available');
      PiLogger.error('init_failed_no_sdk', error);
      throw error;
    }

    // Initialize with sandbox false for production-like behavior
    // but be more flexible about the environment check
    window.Pi.init({ 
      version: "2.0", 
      sandbox: false
    });
    
    console.log("Pi SDK initialized successfully");
    PiLogger.info('init_success_production', { 
      sandboxMode: false,
      version: '2.0',
      hostname: window.location.hostname,
      piAvailable: !!window.Pi
    });
    return true;
  } catch (error) {
    console.error("Pi SDK initialization error:", error);
    PiLogger.error('init_error_production', error);
    throw error;
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
    PiLogger.error('system_browser_error', error);
    throw error;
  }
};


/**
 * Utility functions for Pi Browser integration
 */

/**
 * Checks if the app is running in Pi Browser
 */
export const isRunningInPiBrowser = (): boolean => {
  // Check if the Pi SDK is available
  return typeof window !== "undefined" && "Pi" in window;
};

/**
 * Redirects to Pi Browser
 */
export const redirectToPiBrowser = () => {
  if (typeof window !== "undefined") {
    window.open('https://minepi.com/download', '_blank');
  }
};

/**
 * Auto-detect and redirect if not in Pi Browser
 * @returns {boolean} True if in Pi Browser, false if redirected
 */
export const autoDetectAndRedirect = (): boolean => {
  if (!isRunningInPiBrowser()) {
    redirectToPiBrowser();
    return false;
  }
  return true;
};

/**
 * Check if Ad Network is supported in the current Pi Browser
 */
export const isAdNetworkSupported = async (): Promise<boolean> => {
  if (!isRunningInPiBrowser()) return false;

  try {
    // This is a simple way to check if ad features are available
    // Should be replaced with actual Pi SDK method when available
    return !!window.Pi && 'ad' in window.Pi;
  } catch (e) {
    console.error('Error checking ad network support:', e);
    return false;
  }
};

/**
 * Initialize Pi Network SDK
 */
export const initPiNetwork = (): boolean => {
  if (!isRunningInPiBrowser()) return false;

  try {
    window.Pi.init({ version: "2.0" });
    return true;
  } catch (e) {
    console.error('Error initializing Pi Network:', e);
    return false;
  }
};

/**
 * Get native features supported by Pi Browser
 */
export const getNativeFeatures = async () => {
  if (!isRunningInPiBrowser()) return [];
  
  try {
    // This should be replaced with actual Pi SDK method
    return ['payments', 'authentication']; // example return
  } catch (e) {
    console.error('Error getting native features:', e);
    return [];
  }
};

/**
 * Open URL in system browser
 */
export const openUrlInSystemBrowser = (url: string): void => {
  if (!isRunningInPiBrowser()) {
    window.open(url, '_blank');
    return;
  }

  try {
    // This should be replaced with actual Pi SDK method when available
    window.open(url, '_system');
  } catch (e) {
    console.error('Error opening URL in system browser:', e);
    window.open(url, '_blank');
  }
};

/**
 * Open share dialog
 */
export const openShareDialog = (data: {
  title?: string;
  text?: string;
  url?: string;
}): void => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share(data).catch(err => console.error('Error sharing:', err));
  } else {
    // Fallback
    console.warn('Share API not supported');
    if (data.url) window.open(data.url, '_blank');
  }
};

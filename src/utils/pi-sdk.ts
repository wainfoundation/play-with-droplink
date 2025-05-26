
/**
 * Pi Network SDK - Main Export Module
 * Refactored into focused modules for better maintainability
 */

// Re-export all types
export * from './pi-types';

// Re-export authentication functions
export { authenticateWithPi } from './pi-auth';

// Re-export payment functions
export { createPiPayment } from './pi-payments';

// Re-export ad functions
export {
  isAdReady,
  requestAd,
  showAd,
  showInterstitialAdAdvanced,
  showRewardedAdAdvanced
} from './pi-ads';

// Re-export utility functions
export {
  isRunningInPiBrowser,
  redirectToPiBrowser,
  autoDetectAndRedirect,
  getNativeFeatures,
  isAdNetworkSupported,
  initPiNetwork,
  openShareDialog,
  openUrlInSystemBrowser
} from './pi-utils';

// Default export for backward compatibility
import { authenticateWithPi } from './pi-auth';
import { createPiPayment } from './pi-payments';
import {
  isAdReady,
  requestAd,
  showAd,
  showInterstitialAdAdvanced,
  showRewardedAdAdvanced
} from './pi-ads';
import {
  isRunningInPiBrowser,
  redirectToPiBrowser,
  autoDetectAndRedirect,
  getNativeFeatures,
  isAdNetworkSupported,
  initPiNetwork,
  openShareDialog,
  openUrlInSystemBrowser
} from './pi-utils';

export default {
  isRunningInPiBrowser,
  redirectToPiBrowser,
  autoDetectAndRedirect,
  initPiNetwork,
  getNativeFeatures,
  isAdNetworkSupported,
  authenticateWithPi,
  createPiPayment,
  isAdReady,
  requestAd,
  showAd,
  showInterstitialAdAdvanced,
  showRewardedAdAdvanced,
  openShareDialog,
  openUrlInSystemBrowser,
};

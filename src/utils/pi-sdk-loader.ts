
import PiLogger from './pi-logger';

interface PiSDKModule {
  initPiNetwork: () => boolean;
  authenticateWithPi: (scopes?: string[]) => Promise<any>;
  createPiPayment: (paymentData: any, callbacks: any) => Promise<void>;
  isRunningInPiBrowser: () => boolean;
  // Add other exports as needed
}

let piSDKPromise: Promise<PiSDKModule> | null = null;
let piSDKLoaded = false;

export const loadPiSDK = async (): Promise<PiSDKModule> => {
  PiLogger.info('sdk_load_start', { loadMethod: 'dynamic_import' });

  // Return cached promise if already loading
  if (piSDKPromise) {
    return piSDKPromise;
  }

  // Return cached module if already loaded
  if (piSDKLoaded) {
    const module = await import('./pi-sdk');
    return module as PiSDKModule;
  }

  piSDKPromise = (async () => {
    try {
      // Check if Pi SDK script is already loaded
      if (!window.Pi) {
        PiLogger.warn('sdk_not_available', { 
          message: 'Pi SDK script not loaded, loading dynamically' 
        });
        
        // Dynamically load Pi SDK script if not present
        await loadPiSDKScript();
      }

      // Import our Pi SDK wrapper
      const module = await import('./pi-sdk');
      piSDKLoaded = true;
      
      PiLogger.info('sdk_load_success', { 
        piAvailable: !!window.Pi,
        moduleExports: Object.keys(module)
      });
      
      return module as PiSDKModule;
    } catch (error) {
      PiLogger.error('sdk_load_error', error, { 
        piAvailable: !!window.Pi 
      });
      throw error;
    }
  })();

  return piSDKPromise;
};

const loadPiSDKScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="pi-sdk.js"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    
    script.onload = () => {
      PiLogger.info('sdk_script_loaded', { source: 'dynamic' });
      resolve();
    };
    
    script.onerror = () => {
      const error = new Error('Failed to load Pi SDK script');
      PiLogger.error('sdk_script_load_error', error);
      reject(error);
    };
    
    document.head.appendChild(script);
  });
};

// Preload Pi SDK when running in Pi Browser for better performance
export const preloadPiSDK = () => {
  if (typeof window !== 'undefined' && window.Pi) {
    loadPiSDK().catch(error => {
      PiLogger.error('sdk_preload_error', error);
    });
  }
};

export default loadPiSDK;

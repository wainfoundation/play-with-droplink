
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { isRunningInPiBrowser } from '@/utils/pi-sdk';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Define the Pi Ads Network interface
interface PiAdsNetwork {
  init: (config: { apiKey: string; placementId: string }) => void;
  showAd: () => void;
}

// Add Pi Ads Network to the global window object
declare global {
  interface Window {
    PiAdsNetwork?: PiAdsNetwork;
  }
}

interface PiAdsProps {
  placementId?: string; // Optional placement ID for different ad locations
}

const PiAdsNetwork = ({ placementId = 'default-placement' }: PiAdsProps) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const { showAds } = useUser();
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    // Don't load ads if the user shouldn't see them
    if (!showAds) return;
    
    // Load Pi Ads Network SDK
    const loadPiAdsSDK = async () => {
      try {
        // Check if already loaded
        if (window.PiAdsNetwork) {
          initializeAds();
          return;
        }
        
        // Only attempt to load in Pi Browser
        if (!isPiBrowser) {
          setAdError('Pi Browser required for ads');
          return;
        }
        
        // Create script element to load the Pi Ads Network SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.minepi.com/pi-ads-sdk.js'; // Replace with actual Pi Ads SDK URL
        script.async = true;
        script.onload = () => initializeAds();
        script.onerror = () => setAdError('Failed to load Pi Ads Network SDK');
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading Pi Ads SDK:', error);
        setAdError('Failed to load Pi Ads Network SDK');
      }
    };

    const initializeAds = () => {
      try {
        if (window.PiAdsNetwork) {
          // Get API key from environment - will be configured in Supabase secrets
          const apiKey = import.meta.env.VITE_PI_ADS_API_KEY;
          if (!apiKey) {
            setAdError('Pi Ads API key not configured');
            return;
          }
          
          window.PiAdsNetwork.init({ 
            apiKey,
            placementId
          });
          
          setAdLoaded(true);
          
          // Display the ad
          window.PiAdsNetwork.showAd();
        }
      } catch (error) {
        console.error('Error initializing Pi Ads SDK:', error);
        setAdError('Failed to initialize Pi Ads Network');
      }
    };

    if (showAds) {
      loadPiAdsSDK();
    }

    // Cleanup function
    return () => {
      // Add any cleanup needed for the ads
    };
  }, [placementId, showAds, isPiBrowser]);

  // If user shouldn't see ads, return nothing
  if (!showAds) return null;

  // Show a "Get Pi Browser" prompt if not in Pi Browser
  if (!isPiBrowser) {
    return (
      <div className="my-4 p-4 bg-gray-100 rounded-lg border border-dashed border-gray-300">
        <h4 className="text-sm font-medium mb-2">Pi Browser Required</h4>
        <p className="text-xs text-gray-600 mb-3">
          To view ads and earn Pi, please open this app in the Pi Browser.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => {
            window.open('https://minepi.com/download', '_blank');
          }}
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Download Pi Browser
        </Button>
      </div>
    );
  }

  // Placeholder for ad container
  return (
    <div className="pi-ads-container my-4 p-2 bg-gray-100 rounded-lg min-h-20">
      {!adLoaded && !adError && (
        <div className="text-center text-gray-500 text-sm py-2">
          Loading advertisement...
        </div>
      )}
      
      {adError && (
        <div className="text-center text-red-500 text-sm py-2">
          {adError}
        </div>
      )}
      
      {/* The actual ad will be injected here by the Pi Ads Network SDK */}
      <div id={`pi-ad-container-${placementId}`} />
    </div>
  );
};

export default PiAdsNetwork;

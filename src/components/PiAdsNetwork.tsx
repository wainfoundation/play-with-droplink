
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

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
        
        // Create script element to load the Pi Ads Network SDK
        // Note: This is a placeholder URL - replace with the actual SDK URL when available
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
          // Initialize with Pi Ads Network API key
          const apiKey = "ldtwy98n3q6f8uvxvoxvnidgiklu21ndbfn5ltqpnfxcftbocc9ujxrcfiwcwkj6";
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
  }, [placementId, showAds]);

  // If user shouldn't see ads, return nothing
  if (!showAds) return null;

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

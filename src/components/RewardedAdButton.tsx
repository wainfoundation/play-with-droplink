
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pi, AlertCircle, Eye, Download } from "lucide-react";
import { isRunningInPiBrowser, isAdNetworkSupported } from "@/utils/pi-sdk";
import { showRewardedAd, AdReward, initializePiAds, isAdServiceReady } from "@/services/piAdService";
import { toast } from "@/hooks/use-toast";

interface RewardedAdButtonProps {
  reward?: AdReward;
  onAdComplete?: (reward: AdReward) => void;
  onAdError?: (error: string) => void;
  buttonText?: string;
  className?: string;
}

const RewardedAdButton = ({
  reward = { type: "pi", amount: 0.1, description: "Watch ad reward" },
  onAdComplete,
  onAdError,
  buttonText = "Watch Ad for Reward",
  className = "",
}: RewardedAdButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [adServiceReady, setAdServiceReady] = useState(false);
  const [adNetworkSupported, setAdNetworkSupported] = useState(false);
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    const initializeAds = async () => {
      if (!isPiBrowser) return;

      try {
        // Check if ad network is supported
        const supported = await isAdNetworkSupported();
        setAdNetworkSupported(supported);
        
        if (supported) {
          // Initialize ad service
          const initialized = await initializePiAds({
            onReward: (reward) => {
              onAdComplete?.(reward);
            },
            onAdError: (error) => {
              onAdError?.(error);
            },
            onAdNotSupported: () => {
              setAdNetworkSupported(false);
            }
          });
          
          setAdServiceReady(initialized);
        }
      } catch (error) {
        console.error("Error initializing ad service:", error);
        setAdServiceReady(false);
      }
    };

    initializeAds();
  }, [isPiBrowser, onAdComplete, onAdError]);

  const handleAdClick = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please open this app in Pi Browser to watch ads.",
        variant: "destructive",
      });
      return;
    }

    if (!adNetworkSupported) {
      toast({
        title: "Update Required",
        description: "Please update your Pi Browser to access the ad network.",
        variant: "destructive",
      });
      return;
    }

    if (!adServiceReady) {
      toast({
        title: "Service Not Ready",
        description: "Ad service is still initializing. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const success = await showRewardedAd(reward);
      
      if (!success) {
        onAdError?.("Failed to show rewarded ad");
      }
      
    } catch (error) {
      console.error("Error showing rewarded ad:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to show ad";
      onAdError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePiBrowserDownload = () => {
    window.open('https://minepi.com/download', '_blank');
  };

  if (!isPiBrowser) {
    return (
      <Button 
        variant="outline" 
        className={`flex items-center gap-2 ${className}`}
        onClick={handlePiBrowserDownload}
      >
        <Download className="h-4 w-4" />
        Get Pi Browser
      </Button>
    );
  }

  if (!adNetworkSupported) {
    return (
      <Button 
        variant="outline" 
        className={`flex items-center gap-2 ${className}`}
        onClick={handlePiBrowserDownload}
      >
        <AlertCircle className="h-4 w-4" />
        Update Pi Browser
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      className={`flex items-center gap-2 ${className}`}
      onClick={handleAdClick}
      disabled={isLoading || !adServiceReady}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          Loading Ad...
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          <Pi className="h-4 w-4" />
          {buttonText}
          <span className="text-xs text-muted-foreground">
            +{reward.amount} {reward.type}
          </span>
        </>
      )}
    </Button>
  );
};

export default RewardedAdButton;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pi, AlertCircle, Eye } from "lucide-react";
import { isRunningInPiBrowser, showAd, isAdReady } from "@/utils/pi-sdk";
import { toast } from "@/hooks/use-toast";

interface RewardedAdButtonProps {
  onAdComplete?: (adId?: string) => void;
  onAdError?: (error: string) => void;
  buttonText?: string;
  className?: string;
}

const RewardedAdButton = ({
  onAdComplete,
  onAdError,
  buttonText = "Watch Ad for Pi",
  className = "",
}: RewardedAdButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isPiBrowser = isRunningInPiBrowser();

  const handleAdClick = async () => {
    if (!isPiBrowser) {
      onAdError?.("This feature requires Pi Browser");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Check if ad is ready first
      const ready = await isAdReady("rewarded");
      if (!ready) {
        toast({
          title: "Ad Not Ready",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        return;
      }
      
      // Show the rewarded ad
      const response = await showAd("rewarded");
      
      if (response.result === "AD_REWARDED") {
        toast({
          title: "Reward Earned!",
          description: "You've earned your reward for watching the ad.",
        });
        onAdComplete?.(response.adId);
      } else if (response.result === "AD_CLOSED") {
        toast({
          title: "Ad Closed",
          description: "Ad was closed before completion. No reward earned.",
        });
      } else {
        throw new Error(`Ad error: ${response.result}`);
      }
      
    } catch (error) {
      console.error("Error showing rewarded ad:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to show ad";
      onAdError?.(errorMessage);
      toast({
        title: "Ad Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPiBrowser) {
    return (
      <Button 
        variant="outline" 
        disabled
        className={`flex items-center gap-2 ${className}`}
        onClick={() => window.open('https://minepi.com/download', '_blank')}
      >
        <AlertCircle className="h-4 w-4" />
        Open in Pi Browser
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      className={`flex items-center gap-2 ${className}`}
      onClick={handleAdClick}
      disabled={isLoading}
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
        </>
      )}
    </Button>
  );
};

export default RewardedAdButton;

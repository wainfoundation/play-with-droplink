
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pi, AlertCircle } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface RewardedAdButtonProps {
  onAdComplete?: () => void;
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
      
      // This is where you would initialize and show the Pi rewarded ad
      // As of now, the Pi Network might not have a formal rewarded ad API
      // This is a placeholder for future implementation
      
      // Simulate ad display
      setTimeout(() => {
        setIsLoading(false);
        onAdComplete?.();
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Error showing rewarded ad:", error);
      onAdError?.(error instanceof Error ? error.message : "Failed to show ad");
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
      <Pi className="h-4 w-4" />
      {isLoading ? "Loading Ad..." : buttonText}
    </Button>
  );
};

export default RewardedAdButton;


import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pi, Eye, Gift } from "lucide-react";
import { isRunningInPiBrowser, showInterstitialAdAdvanced } from "@/utils/pi-sdk";
import { toast } from "@/hooks/use-toast";

interface PiAdBannerProps {
  onAdComplete?: () => void;
  rewardAmount?: number;
  className?: string;
}

const PiAdBanner = ({ 
  onAdComplete, 
  rewardAmount = 0.1, 
  className = "" 
}: PiAdBannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdAvailable, setIsAdAvailable] = useState(false);
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    // Check if ads are available
    const checkAdAvailability = async () => {
      if (isPiBrowser && window.Pi?.Ads) {
        try {
          const ready = await window.Pi.Ads.isAdReady("interstitial");
          setIsAdAvailable(ready.ready);
        } catch (error) {
          console.error("Error checking ad availability:", error);
          setIsAdAvailable(false);
        }
      }
    };

    checkAdAvailability();
  }, [isPiBrowser]);

  const handleShowAd = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please open this app in Pi Browser to view ads.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const success = await showInterstitialAdAdvanced();
      
      if (success) {
        toast({
          title: "Ad Completed!",
          description: `You earned ${rewardAmount} Pi for viewing the ad.`,
        });
        onAdComplete?.();
      } else {
        toast({
          title: "Ad Not Available",
          description: "No ads are currently available. Try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error showing ad:", error);
      toast({
        title: "Ad Error",
        description: "There was an error showing the ad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPiBrowser) {
    return (
      <Card className={`border-orange-200 bg-orange-50 ${className}`}>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
            <Pi className="h-5 w-5" />
            <span className="font-medium">Pi Browser Required</span>
          </div>
          <p className="text-sm text-orange-700 mb-3">
            Open this app in Pi Browser to earn Pi by viewing ads
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://minepi.com/download', '_blank')}
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            Get Pi Browser
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Earn Pi</h3>
              <p className="text-sm text-muted-foreground">
                Watch an ad to earn {rewardAmount} Pi
              </p>
            </div>
          </div>
          <Button 
            onClick={handleShowAd}
            disabled={isLoading || !isAdAvailable}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Watch Ad
              </>
            )}
          </Button>
        </div>
        {!isAdAvailable && isPiBrowser && (
          <p className="text-xs text-muted-foreground mt-2">
            No ads available right now. Check back later!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PiAdBanner;

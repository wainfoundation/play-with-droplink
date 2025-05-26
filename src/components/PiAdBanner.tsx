
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pi, Eye, Clock } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import { toast } from "@/hooks/use-toast";

interface PiAdBannerProps {
  onAdComplete?: (reward: number) => void;
  onAdError?: (error: string) => void;
  className?: string;
}

const PiAdBanner = ({
  onAdComplete,
  onAdError,
  className = ""
}: PiAdBannerProps) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    // Simulate ad loading
    if (isPiBrowser) {
      const timer = setTimeout(() => setIsAdLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isPiBrowser]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWatching && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsWatching(false);
            onAdComplete?.(0.1); // Reward 0.1 Pi for watching ad
            toast({
              title: "Ad Reward Earned!",
              description: "You've earned 0.1 π for watching the ad",
            });
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isWatching, timeLeft, onAdComplete]);

  const handleWatchAd = () => {
    if (!isPiBrowser) {
      onAdError?.("Pi Browser required");
      return;
    }

    if (!isAdLoaded) {
      onAdError?.("Ad not loaded yet");
      return;
    }

    setIsWatching(true);
    setTimeLeft(30);
  };

  if (!isPiBrowser) {
    return (
      <Card className={`p-4 bg-gradient-to-r from-gray-100 to-gray-200 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pi className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Pi Ads available in Pi Browser</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://minepi.com/download', '_blank')}
          >
            Get Pi Browser
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Pi className="h-5 w-5 text-primary" />
            <span className="font-medium">Earn Pi by watching ads</span>
          </div>
          
          {isWatching && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {timeLeft}s remaining
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-primary font-medium">+0.1 π</span>
          <Button 
            onClick={handleWatchAd}
            disabled={!isAdLoaded || isWatching}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            {isWatching ? (
              <>
                <div className="animate-pulse rounded-full h-4 w-4 bg-white/20 mr-2"></div>
                Watching...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Watch Ad
              </>
            )}
          </Button>
        </div>
      </div>
      
      {isWatching && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default PiAdBanner;

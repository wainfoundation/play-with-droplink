
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { isRunningInPiBrowser, isAdNetworkSupported, getNativeFeatures } from "@/utils/pi-sdk";
import { 
  initializePiAds, 
  showInterstitialAd, 
  showRewardedAd, 
  isAdServiceReady,
  AdReward 
} from "@/services/piAdService";
import { toast } from "@/hooks/use-toast";

interface AdManagerProps {
  onRewardEarned?: (reward: AdReward) => void;
  className?: string;
}

const PiAdManager = ({ onRewardEarned, className = "" }: AdManagerProps) => {
  const [adServiceStatus, setAdServiceStatus] = useState<'checking' | 'ready' | 'not_supported' | 'error'>('checking');
  const [nativeFeatures, setNativeFeatures] = useState<string[]>([]);
  const [isLoadingInterstitial, setIsLoadingInterstitial] = useState(false);
  const [isLoadingRewarded, setIsLoadingRewarded] = useState(false);
  const [adNetworkSupported, setAdNetworkSupported] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0);
  const [adsWatched, setAdsWatched] = useState(0);
  
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    const initializeAdService = async () => {
      try {
        setAdServiceStatus('checking');
        
        if (!isPiBrowser) {
          setAdServiceStatus('not_supported');
          return;
        }

        // Get native features
        const features = await getNativeFeatures();
        setNativeFeatures(features);
        
        // Check ad network support
        const supported = await isAdNetworkSupported();
        setAdNetworkSupported(supported);
        
        if (!supported) {
          setAdServiceStatus('not_supported');
          return;
        }

        // Initialize ad service
        const initialized = await initializePiAds({
          onReward: (reward) => {
            setTotalRewards(prev => prev + reward.amount);
            setAdsWatched(prev => prev + 1);
            onRewardEarned?.(reward);
          },
          onAdError: (error) => {
            console.error("Ad service error:", error);
          },
          onAdNotSupported: () => {
            setAdServiceStatus('not_supported');
          }
        });
        
        if (initialized) {
          setAdServiceStatus('ready');
        } else {
          setAdServiceStatus('error');
        }
      } catch (error) {
        console.error("Error initializing ad service:", error);
        setAdServiceStatus('error');
      }
    };

    initializeAdService();
  }, [isPiBrowser, onRewardEarned]);

  const handleShowInterstitial = async () => {
    setIsLoadingInterstitial(true);
    try {
      const success = await showInterstitialAd();
      if (success) {
        setAdsWatched(prev => prev + 1);
      }
    } finally {
      setIsLoadingInterstitial(false);
    }
  };

  const handleShowRewarded = async (reward: AdReward) => {
    setIsLoadingRewarded(true);
    try {
      await showRewardedAd(reward);
    } finally {
      setIsLoadingRewarded(false);
    }
  };

  const getStatusIcon = () => {
    switch (adServiceStatus) {
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'not_supported':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />;
    }
  };

  const getStatusText = () => {
    switch (adServiceStatus) {
      case 'ready':
        return 'Ad Network Ready';
      case 'not_supported':
        return !isPiBrowser ? 'Pi Browser Required' : 'Update Pi Browser';
      case 'error':
        return 'Service Error';
      default:
        return 'Checking Ad Support...';
    }
  };

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Pi Ad Network Manager
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={adServiceStatus === 'ready' ? 'default' : 'secondary'}>
            {getStatusText()}
          </Badge>
          {adNetworkSupported && (
            <Badge variant="outline">Ad Network Available</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Native Features Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Available Features:</h4>
          <div className="flex flex-wrap gap-2">
            {nativeFeatures.map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {nativeFeatures.length === 0 && adServiceStatus === 'checking' && (
              <span className="text-xs text-muted-foreground">Loading features...</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{adsWatched}</div>
            <div className="text-sm text-muted-foreground">Ads Watched</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{totalRewards.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Pi Earned</div>
          </div>
        </div>

        {/* Progress to next milestone */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to 10 ads</span>
            <span>{adsWatched}/10</span>
          </div>
          <Progress value={(adsWatched / 10) * 100} className="h-2" />
        </div>

        {/* Ad Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Try Different Ad Types:</h4>
          
          <div className="grid gap-3">
            <Button
              onClick={handleShowInterstitial}
              disabled={adServiceStatus !== 'ready' || isLoadingInterstitial}
              className="w-full"
              variant="outline"
            >
              {isLoadingInterstitial ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  Loading Interstitial...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Interstitial Ad
                </>
              )}
            </Button>

            <Button
              onClick={() => handleShowRewarded({ type: "pi", amount: 0.1, description: "Basic reward" })}
              disabled={adServiceStatus !== 'ready' || isLoadingRewarded}
              className="w-full"
              variant="outline"
            >
              {isLoadingRewarded ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  Loading Rewarded...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Watch for 0.1 Pi Reward
                </>
              )}
            </Button>

            <Button
              onClick={() => handleShowRewarded({ type: "credits", amount: 100, description: "Bonus credits" })}
              disabled={adServiceStatus !== 'ready' || isLoadingRewarded}
              className="w-full"
              variant="outline"
            >
              {isLoadingRewarded ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  Loading Rewarded...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Watch for 100 Credits
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Troubleshooting */}
        {adServiceStatus !== 'ready' && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Troubleshooting:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {!isPiBrowser && (
                <li>• Download and use Pi Browser to access ads</li>
              )}
              {isPiBrowser && !adNetworkSupported && (
                <li>• Update Pi Browser to the latest version</li>
              )}
              {adServiceStatus === 'error' && (
                <li>• Check your internet connection and try again</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PiAdManager;

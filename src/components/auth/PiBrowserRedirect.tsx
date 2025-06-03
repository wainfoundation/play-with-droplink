
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface PiBrowserRedirectProps {
  onContinue?: () => void;
  showContinueOption?: boolean;
}

const PiBrowserRedirect = ({ onContinue, showContinueOption = false }: PiBrowserRedirectProps) => {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleRedirect();
    }
  }, [countdown]);

  const handleRedirect = () => {
    setIsRedirecting(true);
    try {
      const currentUrl = window.location.href;
      const piUrl = `https://minepi.com/browser/open?url=${encodeURIComponent(currentUrl)}`;
      window.location.href = piUrl;
    } catch (error) {
      console.error("Redirect failed:", error);
      setIsRedirecting(false);
    }
  };

  const handleManualRedirect = () => {
    handleRedirect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 rounded-full p-3">
              <Smartphone className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-orange-800 flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Pi Browser Required
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-orange-700 font-medium">
              For the best experience and full Pi Network features, please use Pi Browser.
            </p>
            <div className="bg-white/70 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-600">
                PlayDrop is optimized for Pi Browser to ensure secure Pi payments, 
                wallet integration, and seamless gameplay.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleManualRedirect}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Redirecting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Pi Browser</span>
                </div>
              )}
            </Button>

            {showContinueOption && onContinue && (
              <Button 
                onClick={onContinue}
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                Continue Anyway (Limited Features)
              </Button>
            )}
          </div>

          {countdown > 0 && (
            <div className="text-center">
              <p className="text-sm text-orange-600">
                Auto-redirecting in {countdown} seconds...
              </p>
            </div>
          )}

          <div className="text-center space-y-2">
            <p className="text-xs text-orange-600 font-medium">
              How to get Pi Browser:
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-orange-200">
              <ol className="text-xs text-orange-700 space-y-1 text-left">
                <li>1. Download Pi Network app</li>
                <li>2. Open Pi app and tap "Browser"</li>
                <li>3. Navigate to PlayDrop</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PiBrowserRedirect;

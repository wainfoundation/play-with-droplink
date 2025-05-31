
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { isRunningInPiBrowser, redirectToPiBrowser } from '@/utils/pi-sdk';

interface PiBrowserCheckProps {
  onContinueAnyway?: () => void;
  showContinueOption?: boolean;
  children?: React.ReactNode;
}

const PiBrowserCheck: React.FC<PiBrowserCheckProps> = ({ 
  onContinueAnyway, 
  showContinueOption = false,
  children 
}) => {
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkBrowser = () => {
      const result = isRunningInPiBrowser();
      setIsPiBrowser(result);
      setChecking(false);
    };

    checkBrowser();
  }, []);

  const handleRedirect = () => {
    try {
      redirectToPiBrowser();
    } catch (error) {
      console.error('Failed to redirect to Pi Browser:', error);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Checking Pi Browser compatibility...</p>
        </div>
      </div>
    );
  }

  if (isPiBrowser) {
    // Pi Browser detected - show children or success message
    return children ? <>{children}</> : (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Pi Browser Detected</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-700">
              Great! You're using Pi Browser. All Pi Network features are available.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not Pi Browser - show warning
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md border-orange-200 bg-orange-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-orange-800">Pi Browser Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-orange-700">
            For the best experience with Pi payments, ads, and games, please use Pi Browser.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleRedirect}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Pi Browser
            </Button>
            
            {showContinueOption && onContinueAnyway && (
              <Button 
                variant="outline" 
                onClick={onContinueAnyway}
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                Continue Anyway (Limited Features)
              </Button>
            )}
          </div>
          
          <p className="text-xs text-orange-600">
            Pi Browser provides enhanced security and access to all Pi Network features including payments and ads.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiBrowserCheck;

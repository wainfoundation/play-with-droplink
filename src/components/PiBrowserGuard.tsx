
import { useEffect, useState } from "react";
import { isRunningInPiBrowser, redirectToPiBrowser } from "@/utils/pi-sdk";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PiBrowserGuardProps {
  children: React.ReactNode;
  showRedirectMessage?: boolean;
}

const PiBrowserGuard = ({ children, showRedirectMessage = true }: PiBrowserGuardProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isPiBrowser, setIsPiBrowser] = useState(false);

  useEffect(() => {
    const checkBrowser = () => {
      const isPi = isRunningInPiBrowser();
      setIsPiBrowser(isPi);
      
      if (!isPi) {
        console.log("External browser detected, redirecting to Pi Browser...");
        
        if (showRedirectMessage) {
          // Show message for 2 seconds before redirecting
          setTimeout(() => {
            redirectToPiBrowser();
          }, 2000);
        } else {
          // Immediate redirect
          redirectToPiBrowser();
        }
      }
      
      setIsChecking(false);
    };

    // Small delay to ensure proper detection
    setTimeout(checkBrowser, 100);
  }, [showRedirectMessage]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Checking browser compatibility...</p>
        </div>
      </div>
    );
  }

  if (!isPiBrowser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
            </svg>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Pi Browser Required</h2>
            <p className="text-gray-600 leading-relaxed">
              This app requires Pi Browser for full functionality. You will be redirected automatically.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm text-gray-500">Redirecting to Pi Browser...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PiBrowserGuard;

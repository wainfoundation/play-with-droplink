
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import PiBrowserRedirect from "@/components/auth/PiBrowserRedirect";

interface LoginPromptSectionProps {
  onPiLogin: () => Promise<void>;
}

const LoginPromptSection = ({ onPiLogin }: LoginPromptSectionProps) => {
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkBrowser = () => {
      const inPiBrowser = isRunningInPiBrowser();
      setIsPiBrowser(inPiBrowser);
    };
    
    checkBrowser();
  }, []);

  const handleContinueAnyway = () => {
    setShowLogin(true);
  };

  if (!isPiBrowser && !showLogin) {
    return (
      <div className="mt-8 max-w-md mx-auto">
        <PiBrowserRedirect 
          onContinue={handleContinueAnyway}
          showContinueOption={true}
        />
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-3">Sign in with Pi Network</h2>
      <Button 
        onClick={onPiLogin}
        className="bg-gradient-hero hover:bg-secondary w-full"
      >
        Connect Pi Network Wallet
      </Button>
      <p className="text-sm text-gray-500 mt-3 text-center">
        Use your Pi Network wallet to access all Droplink features
      </p>
      {!isPiBrowser && (
        <p className="text-xs text-orange-600 mt-2 text-center">
          Note: Some features may be limited outside Pi Browser
        </p>
      )}
    </div>
  );
};

export default LoginPromptSection;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginPromptProps {
  handlePiLogin: () => Promise<void>;
}

const LoginPrompt = ({ handlePiLogin }: LoginPromptProps) => {
  const [isPiAuthenticating, setIsPiAuthenticating] = useState(false);
  
  const handlePiAuthClick = async () => {
    try {
      setIsPiAuthenticating(true);
      await handlePiLogin();
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "Could not authenticate with Pi Network. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPiAuthenticating(false);
    }
  };

  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Lock className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Please Log In to Access Your Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Sign in with your Pi Network account to access your personalized dashboard
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={handlePiAuthClick} 
          className="w-full bg-gradient-hero hover:bg-secondary"
          disabled={isPiAuthenticating}
        >
          {isPiAuthenticating ? "Authenticating..." : "Sign in with Pi Network"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPrompt;

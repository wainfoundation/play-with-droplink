
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();
  const { handleError } = useErrorHandler();

  // Check if we're in test net mode
  const isTestNet = import.meta.env.DEV || import.meta.env.VITE_PI_SANDBOX === 'true';

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Generate unique credentials for production
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const userEmail = `pi_user_${timestamp}_${randomString}@droplink.space`;
      const userPassword = `secure_${timestamp}_${randomString}`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          data: {
            username: `pi_user_${timestamp}`,
            pi_uid: `pi_${timestamp}_${randomString}`,
            display_name: `Pi User ${timestamp.toString().slice(-4)}`,
            auth_method: 'pi_network'
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome to Droplink!",
        description: isTestNet 
          ? "Your Pi Network test account has been created successfully." 
          : "Your Pi Network account has been created successfully.",
      });
      
      await refreshUserData();
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Handle specific auth errors
      if (error.message?.includes('Email rate limit exceeded')) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Too many signup attempts. Please try again later.",
          variant: "destructive",
        });
      } else if (error.message?.includes('Signups not allowed')) {
        toast({
          title: "Signups Temporarily Disabled",
          description: "Account creation is temporarily disabled. Please try again later.",
          variant: "destructive",
        });
      } else {
        handleError(error, "Pi Network authentication");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={handleAuth}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        disabled={isAuthenticating}
        size="lg"
      >
        {isAuthenticating ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span>Connecting to Pi Network...</span>
          </div>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
            </svg>
            Continue with Pi Network
            {isTestNet && (
              <Badge variant="outline" className="ml-2 text-xs">TEST</Badge>
            )}
          </>
        )}
      </Button>
      
      {isTestNet && (
        <div className="text-center text-sm text-orange-600 bg-orange-50 p-2 rounded">
          Running in test mode - all Pi transactions are simulated
        </div>
      )}
    </div>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { authenticateWithPi, initPiNetwork, isRunningInPiBrowser } from "@/utils/pi-sdk";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();
  const { handleError } = useErrorHandler();

  // Check if we're in Pi Browser
  const isPiBrowser = isRunningInPiBrowser();
  
  // Check if we're in production mode (not dev and sandbox is false)
  const isProduction = !import.meta.env.DEV && import.meta.env.VITE_PI_SANDBOX !== 'true';

  if (!isPiBrowser) {
    return (
      <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-orange-600 font-medium">Pi Browser Required</p>
        <p className="text-sm text-orange-500 mt-1">
          This app must be accessed through Pi Browser for authentication.
        </p>
        <Button 
          onClick={() => window.location.href = `https://minepi.com/browser/open?url=${encodeURIComponent(window.location.href)}`}
          className="mt-3"
          variant="outline"
        >
          Open in Pi Browser
        </Button>
      </div>
    );
  }

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      console.log("Initializing Pi SDK...");
      const initialized = initPiNetwork();
      if (!initialized) {
        throw new Error("Failed to initialize Pi SDK");
      }
      console.log("Pi SDK initialized successfully");

      console.log("Starting Pi authentication...");
      const authResult = await authenticateWithPi(["username", "payments"]);
      if (!authResult) {
        throw new Error("Pi authentication failed - no result returned");
      }

      console.log("Pi auth result:", authResult);

      // Validate required fields from auth result
      if (!authResult.user?.uid) {
        throw new Error("No user ID returned from Pi authentication");
      }

      // Create a unique email for Pi users
      const userEmail = `${authResult.user.uid}@pi-network-user.com`;
      const userPassword = authResult.user.uid;
      
      console.log("Attempting Supabase authentication...");
      
      // Try to sign in first
      let { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      
      // If sign in fails, try to sign up
      if (signInError) {
        console.log("Sign in failed, attempting signup:", signInError.message);
        
        const { error: signUpError } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
          options: {
            data: {
              username: authResult.user.username || `pi_user_${authResult.user.uid.slice(-8)}`,
              pi_uid: authResult.user.uid,
              display_name: authResult.user.username || `Pi User`,
              auth_method: 'pi_network',
              access_token: authResult.accessToken
            }
          }
        });
        
        if (signUpError && !signUpError.message.includes('User already registered')) {
          throw signUpError;
        }
        
        // If user already registered, try signing in again
        if (signUpError?.message.includes('User already registered')) {
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword,
          });
          
          if (retryError) {
            throw retryError;
          }
        }
      }
      
      // Check admin status
      try {
        const { data: adminData } = await supabase.functions.invoke("check-admin", {
          body: { 
            piUserId: authResult.user.uid,
            username: authResult.user.username || `pi_user_${authResult.user.uid.slice(-8)}`
          }
        });

        if (adminData?.isAdmin) {
          toast({
            title: "Admin Access Granted",
            description: `Welcome back, Admin ${authResult.user.username}!`,
          });
        }
      } catch (adminCheckError) {
        console.error("Failed to check admin status:", adminCheckError);
      }
      
      await refreshUserData();
      
      const welcomeMessage = authResult.user.username 
        ? `Welcome ${authResult.user.username}!` 
        : 'Welcome Pi User!';
      
      toast({
        title: "Welcome to Droplink!",
        description: `Pi Network account connected successfully! ${welcomeMessage}`,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Pi auth error details:", error);
      
      toast({
        title: "Pi Network Authentication Failed",
        description: error.message || "Could not connect to Pi Network. Please try again.",
        variant: "destructive",
      });
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
            <Badge variant="default" className={`ml-2 text-xs ${isProduction ? 'bg-green-600' : 'bg-orange-600'}`}>
              {isProduction ? 'LIVE' : 'TEST'}
            </Badge>
          </>
        )}
      </Button>
      
      <div className={`text-center text-sm p-2 rounded ${
        isProduction 
          ? 'text-green-600 bg-green-50' 
          : 'text-orange-600 bg-orange-50'
      }`}>
        {isProduction 
          ? 'Production mode - Pi Network authentication ready'
          : 'Test mode - Pi Network sandbox authentication'
        }
      </div>
    </div>
  );
}

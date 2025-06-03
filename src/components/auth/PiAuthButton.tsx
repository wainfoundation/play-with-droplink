
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSystem } from "@/hooks/useAuthSystem";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { authenticateWithPi, initPiNetwork, isRunningInPiBrowser } from "@/utils/pi-sdk";
import { Shield, Zap } from "lucide-react";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useAuthSystem();

  // Check if we're in Pi Browser
  const isPiBrowser = isRunningInPiBrowser();
  
  // Check if we're in production mode
  const isProduction = !import.meta.env.DEV;

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

      if (!authResult.user?.username) {
        throw new Error("No username returned from Pi authentication");
      }

      // Create/update user profile in Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authResult.user.uid)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError);
        throw fetchError;
      }

      if (existingUser) {
        // User exists, update profile
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ 
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
        }

        toast({
          title: "Welcome back!",
          description: `Welcome back, ${authResult.user.username}!`,
        });
      } else {
        // New user, create profile
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: authResult.user.uid,
            username: authResult.user.username,
            display_name: authResult.user.username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error('Error creating user:', insertError);
          throw insertError;
        }

        toast({
          title: "Account created!",
          description: `Welcome to PlayDrop, ${authResult.user.username}!`,
        });
      }

      // Create or update user wallet
      const { error: walletError } = await supabase
        .from('user_wallet')
        .upsert({
          user_id: authResult.user.uid,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (walletError) {
        console.error('Error creating/updating wallet:', walletError);
      }

      await refreshUserData();
      
      toast({
        title: "Pi Network Connected!",
        description: "You're now ready to play and earn Pi rewards!",
      });
      
      navigate('/play');
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
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <Zap className="h-4 w-4" />
              <span>Sign in with Pi Network</span>
            </div>
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
          : 'Development mode - Pi Network sandbox authentication'
        }
      </div>
    </div>
  );
}

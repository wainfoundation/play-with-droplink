
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi } from "@/services/piPaymentService";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  const handlePiAuth = async () => {
    try {
      setIsAuthenticating(true);
      const authResult = await authenticateWithPi(["username", "payments", "wallet_address"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // Check if user exists
        const { data: existingUser } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authResult.user.uid)
          .maybeSingle();
          
        if (existingUser) {
          // User exists, sign them in with Pi credentials
          const { data, error } = await supabase.auth.signInWithPassword({
            email: `pi_${authResult.user.uid}@pinetwork.user`,
            password: authResult.user.uid
          });
          
          if (error) {
            throw error;
          }
          
          // Refresh user data
          await refreshUserData();
          
          toast({
            title: "Authentication Successful",
            description: `Welcome back, @${authResult.user.username || "Pioneer"}!`,
          });
          
          navigate('/dashboard');
          return;
        } else {
          // User doesn't exist, redirect to signup
          toast({
            title: "Account Not Found",
            description: "Please sign up to create an account",
          });
          navigate('/signup');
          return;
        }
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Button 
      onClick={handlePiAuth}
      className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2"
      disabled={isAuthenticating}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
      </svg>
      {isAuthenticating ? "Authenticating..." : "Sign in with Pi Network"}
    </Button>
  );
}

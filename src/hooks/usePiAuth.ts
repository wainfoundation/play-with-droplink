
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { authenticateWithPi } from "@/services/piNetwork";
import { useUser } from "@/context/UserContext";

type PiUser = {
  uid: string;
  username?: string;
}

type PiAuthResult = {
  accessToken: string;
  user: PiUser;
}

export function usePiAuth() {
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshUserData } = useUser();
  
  const handlePiLogin = async () => {
    try {
      setPiAuthenticating(true);
      const authResult = await authenticateWithPi(["username", "payments"]) as PiAuthResult | null;
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // After successful Pi authentication, try to find or create a user in Supabase
        let existingUser = null;
        
        // Fetch profiles without using complex types
        const userProfilesQuery = await supabase
          .from('user_profiles')
          .select('*')
          .eq('pi_user_id', authResult.user.uid);
        
        if (userProfilesQuery.error) {
          console.error("Error checking for existing Pi user:", userProfilesQuery.error);
        } else if (userProfilesQuery.data && userProfilesQuery.data.length > 0) {
          existingUser = userProfilesQuery.data[0];
        }
        
        // If no existing user, create one
        if (!existingUser) {
          // Create a random email and password for the Pi user
          const piEmail = `pi_${authResult.user.uid}@pi-network.user`;
          const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
          
          // Create new user with Supabase
          const signUpResult = await supabase.auth.signUp({
            email: piEmail,
            password: randomPassword,
            options: {
              data: {
                username: authResult.user.username || `pi_user_${Date.now().toString().slice(-6)}`,
                pi_user_id: authResult.user.uid
              }
            }
          });
          
          if (signUpResult.error) {
            throw new Error(`Failed to create account: ${signUpResult.error.message}`);
          }
        }
        
        // Store Pi authentication tokens
        localStorage.setItem('piAccessToken', authResult.accessToken);
        localStorage.setItem('piUserId', authResult.user.uid);
        localStorage.setItem('piUsername', authResult.user.username || '');
        
        await refreshUserData();
        
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome, ${authResult.user.username ? '@' + authResult.user.username : "Pioneer"}!`,
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi login error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication",
        variant: "destructive",
      });
    } finally {
      setPiAuthenticating(false);
    }
  };

  return {
    piAuthenticating,
    handlePiLogin
  };
}

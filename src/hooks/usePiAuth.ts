
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { authenticateWithPi } from "@/services/piNetwork";
import { useUser } from "@/context/UserContext";

// Explicit interface definitions to avoid deep type instantiations
interface PiUser {
  uid: string;
  username?: string;
}

interface PiAuthResult {
  accessToken: string;
  user: PiUser;
}

// Define types for Supabase responses
interface UserProfile {
  id: string;
  username?: string;
  pi_user_id?: string;
  [key: string]: any; // Allow additional fields for flexibility
}

export function usePiAuth() {
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshUserData } = useUser();
  
  const handlePiLogin = async () => {
    try {
      setPiAuthenticating(true);
      // Cast the result explicitly to avoid type instantiation depth issues
      const authResult = await authenticateWithPi(["username", "payments"]);
      
      if (authResult && "user" in authResult) {
        const piAuthData = authResult as PiAuthResult;
        console.log("Pi authentication successful:", piAuthData);
        
        // After successful Pi authentication, try to find or create a user in Supabase
        let existingUser: UserProfile | null = null;
        
        // Use raw fetch with explicit handling to avoid type depth issues
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('pi_user_id', piAuthData.user.uid)
          .maybeSingle();
        
        if (error) {
          console.error("Error checking for existing Pi user:", error);
        } else if (data) {
          existingUser = data;
        }
        
        // If no existing user, create one
        if (!existingUser) {
          // Create a random email and password for the Pi user
          const piEmail = `pi_${piAuthData.user.uid}@pi-network.user`;
          const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
          
          // Create new user with Supabase
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: piEmail,
            password: randomPassword,
            options: {
              data: {
                username: piAuthData.user.username || `pi_user_${Date.now().toString().slice(-6)}`,
                pi_user_id: piAuthData.user.uid
              }
            }
          });
          
          if (signUpError) {
            throw new Error(`Failed to create account: ${signUpError.message}`);
          }
        }
        
        // Store Pi authentication tokens
        localStorage.setItem('piAccessToken', piAuthData.accessToken);
        localStorage.setItem('piUserId', piAuthData.user.uid);
        localStorage.setItem('piUsername', piAuthData.user.username || '');
        
        await refreshUserData();
        
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome, ${piAuthData.user.username ? '@' + piAuthData.user.username : "Pioneer"}!`,
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

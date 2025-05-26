import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthResponse } from "@supabase/supabase-js";
import { loadPiSDK } from "@/utils/pi-sdk-loader";
import PiLogger from "@/utils/pi-logger";

// Define explicit interfaces for user data
interface PiUser {
  id: string;
  username: string;
  uid?: string;
  roles?: string[];
}

interface UserData {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
  uid?: string;
  plan?: string;
}

interface PiAuthResult {
  user: {
    uid: string;
    username: string;
  }
}

// Export as a named function so it can be imported as: import { usePiAuth } from "@/hooks/usePiAuth"
export function usePiAuth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [piUser, setPiUser] = useState<PiUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [piAuthenticating, setPiAuthenticating] = useState(false);

  useEffect(() => {
    // Initialize Pi SDK with lazy loading
    const initializePi = async () => {
      try {
        PiLogger.info('hook_init_start');
        
        if (window.Pi) {
          const piSDK = await loadPiSDK();
          piSDK.initPiNetwork();
          PiLogger.info('hook_init_success', { method: 'window_pi' });
        } else {
          PiLogger.warn('hook_init_no_pi', { message: 'Pi SDK not available in window' });
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Unknown initialization error';
        PiLogger.error('hook_init_error', err as Error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    initializePi();
  }, []);

  const onIncompletePaymentFound = (payment: any) => {
    PiLogger.warn('incomplete_payment_in_auth', { paymentId: payment?.identifier });
    return null;
  };

  const handlePiLogin = async () => {
    try {
      setPiAuthenticating(true);
      setError(null);

      PiLogger.info('auth_login_start');
      
      // Load Pi SDK dynamically
      const piSDK = await loadPiSDK();
      
      if (!window.Pi) {
        throw new Error("Pi Network SDK not available");
      }

      const authResult = await piSDK.authenticateWithPi(
        ["username", "payments", "wallet_address"]
      ) as PiAuthResult;

      if (authResult) {
        PiLogger.auth('login_pi_success', authResult);
        
        // Convert to PiUser format
        const piUserData: PiUser = {
          id: authResult.user.uid,
          username: authResult.user.username || "",
          uid: authResult.user.uid
        };
        setPiUser(piUserData);
        
        // Using correct table name 'user_profiles' instead of 'users'
        const { data: existingUser, error: fetchError } = await supabase
          .from('user_profiles')
          .select()
          .eq("id", authResult.user.uid)
          .maybeSingle();
          
        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("Error checking existing user:", fetchError);
          throw fetchError;
        }

        let userData: UserData | null = null;
        
        if (!existingUser) {
          // Register new user
          const { data: newUser, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              id: authResult.user.uid,
              username: authResult.user.username,
              auth_method: "pi_network"
            })
            .select()
            .maybeSingle();

          if (createError) {
            console.error("Error creating user:", createError);
            throw createError;
          }

          userData = newUser;
        } else {
          userData = existingUser;
        }

        // Sign in with supabase custom auth
        const authResponse: AuthResponse = await supabase.auth.signInWithPassword({
          email: `${authResult.user.username}@pi-network-user.com`,
          password: authResult.user.uid as string,
        });
        
        if (authResponse.error) {
          console.error("Error signing in with Supabase:", authResponse.error);
          throw authResponse.error;
        }

        setIsAuthenticated(true);
        PiLogger.info('auth_login_complete', { userId: authResult.user.uid });
        return { user: userData, piUser: piUserData };
      }
      
      return null;
    } catch (err) {
      PiLogger.error('auth_login_error', err as Error, { 
        step: 'pi_authentication' 
      });
      setError(err instanceof Error ? err.message : "Unknown error during authentication");
      return null;
    } finally {
      setPiAuthenticating(false);
    }
  };

  return {
    loading,
    error,
    piUser,
    isAuthenticated,
    piAuthenticating,
    handlePiLogin,
  };
}

// Also export as default for backward compatibility
export default usePiAuth;

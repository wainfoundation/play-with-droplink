
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthResponse } from "@supabase/supabase-js";

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
    // Check if Pi Network SDK is available in the window object
    if (window.Pi) {
      // Use a Promise pattern correctly with proper error handling
      Promise.resolve()
        .then(() => {
          return window.Pi.init({ version: "2.0", sandbox: true });
        })
        .then(() => {
          console.log("Pi Network SDK initialized");
          setLoading(false);
        })
        .catch((err: Error) => {
          console.error("Error initializing Pi Network SDK:", err);
          setError("Failed to initialize Pi Network SDK");
          setLoading(false);
        });
    } else {
      setError("Pi Network SDK not available");
      setLoading(false);
    }
  }, []);

  const onIncompletePaymentFound = (payment: any) => {
    console.log("Incomplete payment found:", payment);
    // Handle incomplete payment
    return null;
  };

  const handlePiLogin = async () => {
    try {
      setPiAuthenticating(true);
      setError(null);

      if (!window.Pi) {
        throw new Error("Pi Network SDK not available");
      }

      const authResult = await window.Pi.authenticate(
        ["username", "payments", "wallet_address"],
        onIncompletePaymentFound
      ) as PiAuthResult;

      if (authResult) {
        console.log("Pi Auth Result:", authResult);
        // Convert to PiUser format
        const piUserData: PiUser = {
          id: authResult.user.uid, // Use uid as id
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
        return { user: userData, piUser: piUserData };
      }
      
      return null;
    } catch (err) {
      console.error("Error during Pi authentication:", err);
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

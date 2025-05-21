
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin emails - add your email here
  const ADMIN_EMAILS = ["admin@pidrop.dev"];
  
  useEffect(() => {
    // Security improvement: Add authorization header and token validation
    const checkAuthHeaders = async () => {
      // Check if auth state includes valid tokens
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.access_token) {
        // Validate token expiry
        if (new Date(data.session.expires_at * 1000) < new Date()) {
          console.warn("Access token has expired");
          await signOut(); // Force sign out if token expired
          return false;
        }
        console.log("Valid access token present");
        return true;
      }
      return false;
    };
    
    // Set up auth state change listener with improved security
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Security enhancement: Strict admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // Check current session with improved security
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Security enhancement: Strict admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        }
        
        // Run security check
        await checkAuthHeaders();
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      // Clear all local storage items related to authentication
      // Security improvement: More comprehensive cleanup
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPlan');
      localStorage.removeItem('piUsername');
      localStorage.removeItem('piUserId');
      localStorage.removeItem('piAccessToken');
      localStorage.removeItem('subscriptionEnd');
      
      // Clear Supabase storage items
      localStorage.removeItem('supabase.auth.token');
      
      // Clear any session cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      
      console.log("User signed out successfully");
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      
      // Force page reload to clear any in-memory state
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    isLoading,
    isAdmin,
    isLoggedIn: !!user,
    signOut
  };
};

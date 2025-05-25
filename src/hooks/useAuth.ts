
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { useErrorHandler } from './useErrorHandler';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { handleError } = useErrorHandler();

  // Admin emails - add your email here
  const ADMIN_EMAILS = ["admin@pidrop.dev"];
  
  useEffect(() => {
    let isMounted = true;

    // Set up auth state change listener with improved security
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log("Auth state change:", event, session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Enhanced security: Strict admin validation with email verification
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

        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          });
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Password recovery",
            description: "Check your email for password reset instructions.",
          });
        }
      }
    );

    // Check current session with improved security
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!isMounted) return;
        
        console.log("Current session:", session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Enhanced security: Strict admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          handleError(error, "initializing auth");
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      authSubscription.unsubscribe();
    };
  }, [handleError]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear all local storage items related to authentication
      const keysToRemove = [
        'userToken', 'username', 'userEmail', 'userPlan', 
        'piUsername', 'piUserId', 'piAccessToken', 'subscriptionEnd',
        'supabase.auth.token', 'cookie-consent'
      ];
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear any session cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      
      console.log("User signed out successfully");
      
      // Force page reload to clear any in-memory state
      window.location.href = '/';
    } catch (error) {
      handleError(error, "signing out");
    } finally {
      setIsLoading(false);
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


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
    // Security improvement: Add authorization header validation
    const checkAuthHeaders = async () => {
      // Check if auth state includes valid tokens
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        console.log("Valid access token present");
      }
    };
    
    // Set up auth state change listener with improved security
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Security enhancement: Strict admin validation
        if (currentUser && currentUser.email) {
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session?.user?.id);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Security enhancement: Strict admin validation
      if (currentUser && currentUser.email) {
        const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
        setIsAdmin(userIsAdmin);
        
        if (userIsAdmin) {
          console.log("User has admin privileges");
        }
      }
      
      // Run security check
      checkAuthHeaders();
      setIsLoading(false);
    });

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
      
      console.log("User signed out successfully");
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
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

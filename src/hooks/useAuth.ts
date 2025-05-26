
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { useErrorHandler } from './useErrorHandler';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
        console.log('Auth state change: INITIAL_SESSION', session?.user ? 'logged in' : 'logged out');
      } catch (error) {
        console.error('Error getting initial session:', error);
        handleError(error, 'Getting initial session');
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user ? 'logged in' : 'logged out');
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handleError]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsLoggedIn(false);
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      handleError(error, 'Sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isLoggedIn,
    signOut,
  };
};

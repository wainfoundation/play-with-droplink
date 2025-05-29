
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { useErrorHandler } from './useErrorHandler';

// Session timeout configuration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;
const SESSION_WARNING_TIME = 5 * 60 * 1000; // Warn 5 minutes before timeout

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionWarningShown, setSessionWarningShown] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Check if session is still valid
        if (session) {
          const sessionAge = Date.now() - new Date(session.created_at).getTime();
          if (sessionAge > SESSION_TIMEOUT) {
            // Session expired, sign out
            await supabase.auth.signOut();
            toast({
              title: "Session Expired",
              description: "Please sign in again",
              variant: "destructive",
            });
            setUser(null);
            setIsLoggedIn(false);
          } else {
            setUser(session.user);
            setIsLoggedIn(true);
            
            // Set up session warning timer
            const timeUntilWarning = SESSION_TIMEOUT - sessionAge - SESSION_WARNING_TIME;
            if (timeUntilWarning > 0) {
              setTimeout(() => {
                if (!sessionWarningShown) {
                  setSessionWarningShown(true);
                  toast({
                    title: "Session Expiring Soon",
                    description: "Your session will expire in 5 minutes. Please save your work.",
                  });
                }
              }, timeUntilWarning);
            }
          }
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
        
        console.log('Auth state change: INITIAL_SESSION', session?.user ? 'logged in' : 'logged out');
      } catch (error) {
        console.error('Error getting initial session:', error);
        handleError(error, 'Getting initial session');
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user ? 'logged in' : 'logged out');
        
        // Enhanced security logging
        if (event === 'SIGNED_IN') {
          console.log('Successful sign in:', {
            timestamp: new Date().toISOString(),
            userId: session?.user?.id,
            method: session?.user?.app_metadata?.provider || 'unknown'
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out:', {
            timestamp: new Date().toISOString(),
            reason: 'user_action'
          });
        }
        
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
        setIsLoading(false);
        setSessionWarningShown(false);
        
        // Set up session timeout for new sessions
        if (session?.user) {
          setTimeout(() => {
            if (!sessionWarningShown) {
              setSessionWarningShown(true);
              toast({
                title: "Session Expiring Soon",
                description: "Your session will expire in 5 minutes. Please save your work.",
              });
            }
          }, SESSION_TIMEOUT - SESSION_WARNING_TIME);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handleError, sessionWarningShown]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Enhanced logout logging
      console.log('User sign out initiated:', {
        timestamp: new Date().toISOString(),
        userId: user?.id
      });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsLoggedIn(false);
      setSessionWarningShown(false);
      
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

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
        setSessionWarningShown(false);
        
        toast({
          title: "Session Refreshed",
          description: "Your session has been extended",
        });
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      handleError(error, 'Session refresh');
    }
  };

  return {
    user,
    isLoading,
    isLoggedIn,
    signOut,
    refreshSession,
  };
};


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { authenticateWithPi } from '@/utils/pi-sdk';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, Zap } from 'lucide-react';
import { useAuthSecurity } from '@/hooks/useAuthSecurity';

export const SecurePiAuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { checkRateLimit, logSecurityEvent } = useAuthSecurity();

  const handlePiAuth = async () => {
    // Rate limiting check
    if (!checkRateLimit('pi_auth', 5, 60000)) { // 5 attempts per minute
      toast({
        title: "Too many attempts",
        description: "Please wait before trying again",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      logSecurityEvent('auth_attempt_started', { method: 'pi_network' });
      
      const authResult = await authenticateWithPi(['username', 'payments']);
      
      if (!authResult || !authResult.user) {
        throw new Error('Authentication failed');
      }

      // Enhanced validation
      if (!authResult.user.uid || !authResult.accessToken) {
        throw new Error('Invalid authentication response');
      }

      logSecurityEvent('auth_pi_success', { 
        userId: authResult.user.uid,
        username: authResult.user.username 
      });

      // Check if user exists in user_profiles
      const { data: existingUser, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', authResult.user.username)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError);
        throw fetchError;
      }

      if (existingUser) {
        // User exists, update profile
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ 
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
        }

        logSecurityEvent('auth_login_success', { userId: existingUser.id });
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in with Pi Network",
        });
        
        navigate('/dashboard');
      } else {
        // New user, create profile
        const { data: newUser, error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: authResult.user.uid,
            username: authResult.user.username,
            display_name: authResult.user.username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user:', insertError);
          throw insertError;
        }

        logSecurityEvent('auth_signup_success', { userId: newUser.id });
        
        toast({
          title: "Account created!",
          description: "Welcome to Droplink! Let's set up your profile.",
        });
        
        navigate('/auth/userinfo');
      }

    } catch (error) {
      console.error('Pi authentication error:', error);
      
      logSecurityEvent('auth_error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        method: 'pi_network'
      });
      
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Unable to sign in with Pi Network",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePiAuth}
      disabled={isLoading}
      className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <Zap className="h-4 w-4" />
            <span>Sign in with Pi Network</span>
          </div>
        </>
      )}
    </Button>
  );
};

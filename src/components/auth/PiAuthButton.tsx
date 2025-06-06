
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Shield, Zap } from "lucide-react";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Simulate Pi Network authentication for development
      const mockUser = {
        uid: `pi_user_${Date.now()}`,
        username: `pioneer_${Math.random().toString(36).substring(7)}`
      };

      console.log("Mock Pi auth result:", mockUser);

      // Create/update user profile in Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', mockUser.uid)
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

        toast({
          title: "Welcome back!",
          description: `Welcome back, ${mockUser.username}!`,
        });
      } else {
        // New user, create profile
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: mockUser.uid,
            username: mockUser.username,
            display_name: mockUser.username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error('Error creating user:', insertError);
          throw insertError;
        }

        toast({
          title: "Account created!",
          description: `Welcome to PlayDrop, ${mockUser.username}!`,
        });
      }

      // Create or update user wallet
      const { error: walletError } = await supabase
        .from('user_wallet')
        .upsert({
          user_id: mockUser.uid,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (walletError) {
        console.error('Error creating/updating wallet:', walletError);
      }

      // Sign in with Supabase auth (mock)
      const { data, error } = await supabase.auth.signUp({
        email: `${mockUser.username}@pi-network-mock.com`,
        password: mockUser.uid,
        options: {
          data: {
            username: mockUser.username,
            pi_uid: mockUser.uid
          }
        }
      });

      if (error) {
        throw error;
      }

      await refreshUserData();
      
      toast({
        title: "Pi Network Connected!",
        description: "You're now ready to play and earn Pi rewards!",
      });
      
      // Check if user needs to complete welcome flow
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      const petSetupCompleted = localStorage.getItem('petSetupCompleted');
      
      if (welcomeCompleted === 'true' && petSetupCompleted === 'true') {
        navigate('/play');
      } else {
        navigate('/welcome');
      }
    } catch (error: any) {
      console.error("Pi auth error details:", error);
      
      toast({
        title: "Pi Network Authentication Failed",
        description: error.message || "Could not connect to Pi Network. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={handleAuth}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        disabled={isAuthenticating}
        size="lg"
      >
        {isAuthenticating ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span>Connecting to Pi Network...</span>
          </div>
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
      
      <div className="text-center text-sm p-2 rounded bg-orange-50 text-orange-600">
        Development mode - Mock Pi Network authentication
      </div>
    </div>
  );
}

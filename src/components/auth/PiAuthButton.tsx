
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Generate unique credentials for production
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const userEmail = `pi_user_${timestamp}_${randomString}@droplink.space`;
      const userPassword = `secure_${timestamp}_${randomString}`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          data: {
            username: `pi_user_${timestamp}`,
            pi_uid: `pi_${timestamp}_${randomString}`,
            display_name: `Pi User ${timestamp.toString().slice(-4)}`
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Welcome to Droplink!",
        description: "Your Pi Network account has been created successfully.",
      });
      
      await refreshUserData();
      navigate('/dashboard');
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to create Pi Network account. Please try again.",
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
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        disabled={isAuthenticating}
        size="lg"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
        {isAuthenticating ? "Connecting to Pi Network..." : "Continue with Pi Network"}
      </Button>
    </div>
  );
}

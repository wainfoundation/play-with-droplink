
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  // Test mode bypass - creates a demo user
  const handleTestAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Create a test user account
      const testEmail = `test_${Date.now()}@droplink.test`;
      const testPassword = "testpassword123";
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            username: `testuser_${Date.now()}`,
            pi_uid: `test_${Date.now()}`
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Test Login Successful",
        description: "You're now logged in with a test account!",
      });
      
      await refreshUserData();
      navigate('/dashboard');
    } catch (error) {
      console.error("Test auth error:", error);
      toast({
        title: "Test Auth Error",
        description: "Failed to create test account",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleTestAuth}
        className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2"
        disabled={isAuthenticating}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
        {isAuthenticating ? "Creating Test Account..." : "Test Login (Bypass Pi Auth)"}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Pi Network authentication is temporarily disabled for testing
        </p>
      </div>
    </div>
  );
}

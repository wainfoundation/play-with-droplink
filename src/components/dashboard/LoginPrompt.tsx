
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

interface LoginPromptProps {
  handlePiLogin: () => Promise<void>;
}

const LoginPrompt = ({ handlePiLogin }: LoginPromptProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { refreshUserData } = useUser();
  const navigate = useNavigate();
  
  const handleTestLogin = async () => {
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
    <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Lock className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Please Log In to Access Your Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Create a test account to explore the dashboard features
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={handleTestLogin} 
          className="w-full bg-gradient-hero hover:bg-secondary"
          disabled={isAuthenticating}
        >
          {isAuthenticating ? "Creating Test Account..." : "Create Test Account (Bypass Pi Auth)"}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Pi Network authentication is temporarily disabled for testing
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;


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
  
  const handleCreateAccount = async () => {
    try {
      setIsAuthenticating(true);
      
      const userEmail = `user_${Date.now()}@droplink.space`;
      const userPassword = "userpassword123";
      
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          data: {
            username: `user_${Date.now()}`,
            pi_uid: `user_${Date.now()}`
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Welcome to Droplink!",
        description: "Your account has been created successfully!",
      });
      
      await refreshUserData();
      navigate('/dashboard');
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-lg p-8 mx-4">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
          <Lock className="h-12 w-12 text-primary" />
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Access Your Dashboard
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          Create your Droplink profile to start building your Pi Network presence and connecting with your audience
        </p>
      </div>
      
      <div className="space-y-6">
        <Button 
          onClick={handleCreateAccount} 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          disabled={isAuthenticating}
          size="lg"
        >
          {isAuthenticating ? "Creating Account..." : "Create Your Droplink Profile"}
        </Button>
        
        <p className="text-sm text-gray-500 leading-relaxed">
          Join thousands of Pi Network creators building their digital presence
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;

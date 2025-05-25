
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  // Initialize Pi SDK on component mount
  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleTestSignup = async () => {
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
        title: "Test Account Created",
        description: "Welcome! You're now registered with a test account.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Test signup error:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during test account creation",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Create Your Droplink</h1>
            <p className="text-gray-600 mt-2">Join our community with a test account</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Button 
              type="button" 
              onClick={handleTestSignup}
              className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-6"
              disabled={isAuthenticating}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {isAuthenticating ? "Creating Account..." : "Create Test Account (Bypass Pi Auth)"}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Pi Network authentication is temporarily disabled for testing
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

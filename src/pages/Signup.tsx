
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleSignup = async () => {
    try {
      setIsAuthenticating(true);
      
      // Create a user account
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
        description: "Your profile is ready! Start building your Pi Network presence.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Registration Error",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold text-primary mb-4">Create Your Droplink</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Join the Pi Network revolution and build your digital presence with Droplink
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Button 
              type="button" 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-6"
              disabled={isAuthenticating}
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {isAuthenticating ? "Creating Your Profile..." : "Start Building with Pi Network"}
            </Button>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Already have an account?
              </p>
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 hover:underline"
              >
                Sign in to your profile
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-gray-500 leading-relaxed">
              ✓ Custom profile page &nbsp; ✓ Pi Network integration &nbsp; ✓ Analytics dashboard
            </p>
            <p className="text-xs text-gray-400">
              Start free • Upgrade anytime • Cancel whenever
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

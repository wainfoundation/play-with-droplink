import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { authenticateWithPi } from "@/services/piNetwork";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

type UserProfile = {
  id: string;
  username?: string;
  [key: string]: any;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn, refreshUserData } = useUser();

  useEffect(() => {
    // Check if user is already logged in
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate inputs
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
        return;
      }
      
      // Use Supabase auth to login with email and password
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
        return;
      }
      
      // Refresh user data after successful login
      await refreshUserData();
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Droplink!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePiLogin = async () => {
    try {
      setPiAuthenticating(true);
      const authResult = await authenticateWithPi(["username", "payments"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // After successful Pi authentication, try to find or create a user in Supabase
        // Use variable to store the query result instead of inline type casting
        let existingUser: UserProfile | null = null;
        let userError = null;
        
        const userResponse = await supabase
          .from('user_profiles')
          .select('*')
          .eq('pi_user_id', authResult.user.uid)
          .maybeSingle();
        
        existingUser = userResponse.data;
        userError = userResponse.error;
        
        if (userError) {
          console.error("Error checking for existing Pi user:", userError);
        }
        
        // If no existing user, create one
        if (!existingUser) {
          // Create a random email and password for the Pi user
          const piEmail = `pi_${authResult.user.uid}@pi-network.user`;
          const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
          
          // Create new user with Supabase
          const { error: signUpError } = await supabase.auth.signUp({
            email: piEmail,
            password: randomPassword,
            options: {
              data: {
                username: authResult.user.username || `pi_user_${Date.now().toString().slice(-6)}`,
                pi_user_id: authResult.user.uid
              }
            }
          });
          
          if (signUpError) {
            throw new Error(`Failed to create account: ${signUpError.message}`);
          }
        }
        
        // Store Pi authentication tokens
        localStorage.setItem('piAccessToken', authResult.accessToken);
        localStorage.setItem('piUserId', authResult.user.uid);
        localStorage.setItem('piUsername', authResult.user.username || '');
        
        await refreshUserData();
        
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome, ${authResult.user.username ? '@' + authResult.user.username : "Pioneer"}!`,
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi login error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication",
        variant: "destructive",
      });
    } finally {
      setPiAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your Droplink</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Button 
              type="button" 
              onClick={handlePiLogin}
              className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-6"
              disabled={piAuthenticating}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {piAuthenticating ? "Authenticating..." : "Sign in with Pi Network"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-gradient-hero hover:bg-secondary" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
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

export default Login;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi } from "@/services/piPaymentService";
import { supabase } from "@/integrations/supabase/client";
import { isPasswordCompromised } from "@/utils/passwordSecurity";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { PasswordSecurityInfo } from "@/components/auth/PasswordSecurityInfo";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isPasswordCompromisedState, setIsPasswordCompromisedState] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  // Reset compromised state when password changes
  useEffect(() => {
    if (formData.password) {
      setIsPasswordCompromisedState(undefined);
    }
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeTerms: checked
    });
  };

  const checkPasswordSecurity = async (password: string) => {
    if (password.length < 8) return false;
    
    setIsCheckingPassword(true);
    try {
      const compromised = await isPasswordCompromised(password);
      setIsPasswordCompromisedState(compromised);
      return !compromised;
    } catch (error) {
      console.error("Error checking password security:", error);
      return true; // Allow password if check fails
    } finally {
      setIsCheckingPassword(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form data
      if (!formData.username || !formData.email || !formData.password) {
        toast({
          title: "Registration Failed",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password.length < 8) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 8 characters",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.agreeTerms) {
        toast({
          title: "Terms Required",
          description: "Please agree to the terms and conditions",
          variant: "destructive",
        });
        return;
      }
      
      // Check if password has been compromised if we haven't already
      if (isPasswordCompromisedState === undefined) {
        const isSecure = await checkPasswordSecurity(formData.password);
        if (!isSecure) {
          toast({
            title: "Insecure Password",
            description: "This password has appeared in data breaches. Please choose a different password for your security.",
            variant: "destructive",
          });
          return;
        }
      } else if (isPasswordCompromisedState === true) {
        toast({
          title: "Insecure Password",
          description: "This password has appeared in data breaches. Please choose a different password for your security.",
          variant: "destructive",
        });
        return;
      }
      
      // Use Supabase Auth to create a new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          }
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      toast({
        title: "Account Created!",
        description: `Welcome to Droplink, @${formData.username}!`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during account creation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePiSignup = async () => {
    try {
      setPiAuthenticating(true);
      const authResult = await authenticateWithPi(["username"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', authResult.user.username)
          .maybeSingle();
          
        if (existingUser) {
          // User already exists, sign them in instead
          toast({
            title: "Account Already Exists",
            description: "Signing you in with your existing account",
          });
          navigate('/dashboard');
          return;
        }
        
        // Create a random password for the Pi user
        const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
        
        // Use Supabase Auth to create a new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `pi_${authResult.user.uid}@pinetwork.user`, // Create a placeholder email
          password: randomPassword,
          options: {
            data: {
              username: authResult.user.username,
              pi_uid: authResult.user.uid
            }
          }
        });
        
        if (authError) {
          throw new Error(authError.message);
        }
        
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome, @${authResult.user.username || "Pioneer"}! You're now registered with Pi Network.`,
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
      console.error("Pi signup error:", error);
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
            <h1 className="text-3xl font-bold text-primary">Create Your Droplink</h1>
            <p className="text-gray-600 mt-2">Join our community on Pi Network</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Button 
              type="button" 
              onClick={handlePiSignup}
              className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-6"
              disabled={piAuthenticating}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {piAuthenticating ? "Authenticating..." : "Sign up with Pi Network"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    @
                  </span>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    className="rounded-l-none"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => formData.password.length >= 8 && checkPasswordSecurity(formData.password)}
                  required
                />
                
                {/* Password Strength Meter */}
                {formData.password && <PasswordStrengthMeter password={formData.password} />}
                
                {/* Password Security Info */}
                <PasswordSecurityInfo 
                  isCompromised={isPasswordCompromisedState} 
                  showInfo={!isPasswordCompromisedState && !isCheckingPassword} 
                  isChecking={isCheckingPassword}
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-hero hover:bg-secondary" 
                disabled={isSubmitting || isCheckingPassword}
              >
                {isSubmitting ? "Creating Account..." : 
                 isCheckingPassword ? "Checking Password Security..." : "Create Account"}
              </Button>
            </form>
            
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

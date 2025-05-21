
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi, initPiNetwork } from "@/services/piNetwork";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false
  });
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Pi Network SDK
    initPiNetwork(); // Removed the argument since it's not needed
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle signup logic here
    console.log("Signup attempt with:", formData);
    toast({
      title: "Account Created!",
      description: "Welcome to Droplink. This is a demo - in a real app, you would be registered now."
    });
  };

  const handlePiSignup = async () => {
    try {
      setPiAuthenticating(true);
      const authResult = await authenticateWithPi(["username"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        toast({
          title: "Pi Authentication Successful",
          description: `Welcome, ${authResult.user.username || "Pioneer"}! Complete your profile to continue.`,
        });
        
        // Pre-fill username if available
        if (authResult.user.username) {
          setFormData(prev => ({
            ...prev,
            username: authResult.user.username || ""
          }));
        }
        
        // In a real app, you would handle the successful authentication here
        // For this demo, we're just pre-filling the username
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
                <span className="px-2 bg-white text-gray-500">Or complete your profile</span>
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
                  required
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters with letters and numbers
                </p>
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
              
              <Button type="submit" className="w-full bg-gradient-hero hover:bg-secondary">
                Create Account
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


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { isPasswordCompromised as checkPasswordCompromised } from "@/utils/passwordSecurity";
import { PasswordSecurityInfo } from "@/components/auth/PasswordSecurityInfo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isPasswordCompromised, setIsPasswordCompromised] = useState<boolean | undefined>(undefined);
  const [emailUnconfirmed, setEmailUnconfirmed] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  // Reset compromised state when password changes
  useEffect(() => {
    if (password) {
      setIsPasswordCompromised(undefined);
    }
  }, [password]);

  // Reset email unconfirmed state when email changes
  useEffect(() => {
    if (email) {
      setEmailUnconfirmed(false);
    }
  }, [email]);

  const checkPasswordSecurity = async () => {
    if (!password || password.length < 8) return;
    
    setIsCheckingPassword(true);
    try {
      const compromised = await checkPasswordCompromised(password);
      setIsPasswordCompromised(compromised);
    } catch (error) {
      console.error("Error checking password security:", error);
    } finally {
      setIsCheckingPassword(false);
    }
  };

  const sendConfirmationEmail = async () => {
    if (!unconfirmedEmail) return;
    
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unconfirmedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Confirmation Email Sent",
        description: "Please check your inbox for the verification link.",
      });
      
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      toast({
        title: "Failed to Send Email",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      
      // Check if password has been compromised if not already checked
      if (isPasswordCompromised === undefined) {
        setIsCheckingPassword(true);
        const compromised = await checkPasswordCompromised(password);
        setIsPasswordCompromised(compromised);
        setIsCheckingPassword(false);
        
        if (compromised) {
          // Allow login but warn the user
          toast({
            title: "Security Warning",
            description: "Your password appears in known data breaches. Please change it after logging in.",
            variant: "warning",
          });
          // Continue with login despite the warning
        }
      } else if (isPasswordCompromised) {
        // Show warning if we already know the password is compromised
        toast({
          title: "Security Warning",
          description: "Your password appears in known data breaches. Please change it after logging in.",
          variant: "warning",
        });
      }
      
      // Use Supabase auth to login with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      // Handle common auth errors
      if (error) {
        console.error("Supabase login error:", error);
        
        // Check if this is an email confirmation error
        if (error.message.includes("Email not confirmed") || 
            error.message.toLowerCase().includes("email confirmation")) {
          setEmailUnconfirmed(true);
          setUnconfirmedEmail(email);
          toast({
            title: "Email Not Confirmed",
            description: "Please check your inbox and confirm your email address before signing in.",
            variant: "destructive",
          });
          return;
        }
        
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {emailUnconfirmed && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your email address has not been confirmed yet. 
            <Button 
              variant="link" 
              className="p-0 h-auto text-white underline ml-1"
              onClick={sendConfirmationEmail}
              disabled={isSubmitting}
            >
              Resend confirmation email
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
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
          onBlur={checkPasswordSecurity}
          required
        />
        
        {/* Password Security Info */}
        {isPasswordCompromised !== undefined && (
          <PasswordSecurityInfo 
            isCompromised={isPasswordCompromised}
            showInfo={!isPasswordCompromised}
            isChecking={isCheckingPassword}
          />
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-hero hover:bg-secondary" 
        disabled={isSubmitting || isCheckingPassword}
      >
        {isSubmitting ? "Signing in..." : 
         isCheckingPassword ? "Verifying security..." : "Sign in"}
      </Button>
    </form>
  );
}

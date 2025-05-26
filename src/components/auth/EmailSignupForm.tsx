
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { validatePasswordSecurity } from "@/services/passwordSecurityService";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { PasswordSecurityInfo, PasswordSecuritySuccess } from "./PasswordSecurityInfo";

export function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<{
    isValid: boolean;
    message?: string;
    isCompromised?: boolean;
  } | null>(null);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  // Validate password in real-time with debouncing
  useEffect(() => {
    if (!password) {
      setPasswordValidation(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingPassword(true);
      try {
        const validation = await validatePasswordSecurity(password);
        setPasswordValidation(validation);
      } catch (error) {
        console.error("Password validation error:", error);
        setPasswordValidation({ isValid: true }); // Allow password if validation fails
      } finally {
        setIsCheckingPassword(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate inputs
      if (!email || !password || !username) {
        toast({
          title: "Signup Failed",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Signup Failed",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      // Check password security validation
      if (passwordValidation && !passwordValidation.isValid) {
        toast({
          title: "Signup Failed",
          description: passwordValidation.message || "Please choose a stronger password",
          variant: "destructive",
        });
        return;
      }

      if (password.length < 8) {
        toast({
          title: "Signup Failed",
          description: "Password must be at least 8 characters long",
          variant: "destructive",
        });
        return;
      }
      
      // Use Supabase auth to sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: username
          }
        }
      });
      
      if (error) {
        console.error("Supabase signup error:", error);
        toast({
          title: "Signup Failed",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
        return;
      }
      
      // Refresh user data after successful signup
      await refreshUserData();
      
      toast({
        title: "Account Created",
        description: "Welcome to Droplink! Please check your email to verify your account.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordSecure = passwordValidation?.isValid && !passwordValidation?.isCompromised;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* Password strength meter */}
        <PasswordStrengthMeter password={password} />
        
        {/* Password security info */}
        {password && (
          <>
            {isCheckingPassword && (
              <PasswordSecurityInfo isChecking={true} showInfo={false} />
            )}
            
            {!isCheckingPassword && passwordValidation && (
              <>
                {passwordValidation.isCompromised ? (
                  <PasswordSecurityInfo isCompromised={true} showInfo={false} />
                ) : passwordValidation.isValid ? (
                  <PasswordSecuritySuccess />
                ) : (
                  <PasswordSecurityInfo showInfo={false} />
                )}
              </>
            )}
            
            {!passwordValidation && !isCheckingPassword && (
              <PasswordSecurityInfo showInfo={true} />
            )}
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-hero hover:bg-secondary" 
        disabled={isSubmitting || isCheckingPassword || (passwordValidation && !passwordValidation.isValid)}
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Already have an account?
        </p>
        <Link 
          to="/login" 
          className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 hover:underline"
        >
          Sign in to your account
        </Link>
      </div>
    </form>
  );
}

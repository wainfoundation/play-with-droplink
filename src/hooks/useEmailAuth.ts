
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export function useEmailAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.message || "Failed to sign in",
          variant: "destructive",
        });
        return;
      }
      
      await refreshUserData();
      
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    handleSubmit
  };
}

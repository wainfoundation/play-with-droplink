
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribeToNewsletter, updateNewsletterConsent, isSubscribing } = useNewsletterSubscription();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive"
      });
      return;
    }

    if (newsletterConsent && !email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email to receive updates",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Update user profile with username
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user?.id,
          username: username.trim(),
          display_name: username.trim(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Handle newsletter subscription if consented
      if (newsletterConsent && email.trim()) {
        await subscribeToNewsletter(email.trim(), user?.id);
        await updateNewsletterConsent(user?.id || '', true);
      } else if (user?.id) {
        await updateNewsletterConsent(user?.id, false);
      }

      toast({
        title: "Profile updated",
        description: "Your information has been saved successfully",
      });

      // Navigate to next step with username in URL state
      navigate("/register/your-information", { 
        state: { 
          username: username.trim(),
          fromUserInfo: true 
        } 
      });
      
    } catch (error) {
      console.error('Error updating user info:', error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Setup Your Profile - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Droplink!</CardTitle>
          <p className="text-gray-600">Choose your Droplink username. You can always change it later.</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
              {username && (
                <p className="text-sm text-gray-500">
                  Your profile will be: <span className="font-medium">droplink.space/@{username}</span>
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter-consent"
                  checked={newsletterConsent}
                  onCheckedChange={(checked) => setNewsletterConsent(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="newsletter-consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By continuing, you agree to receive offers, news and updates from Droplink
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get the latest features, tips, and exclusive offers delivered to your inbox.
                  </p>
                </div>
              </div>

              {newsletterConsent && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="email">Your email here to receive news and updates</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required={newsletterConsent}
                  />
                  <p className="text-xs text-gray-500">
                    We'll use this email to send you updates and news about Droplink.
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-blue-600"
              disabled={isSubmitting || isSubscribing}
            >
              {isSubmitting || isSubscribing ? "Setting up..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;

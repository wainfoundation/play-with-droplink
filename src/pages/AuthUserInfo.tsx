
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOnboarding } from '@/hooks/useOnboarding';
import { toast } from '@/hooks/use-toast';

const AuthUserInfo = () => {
  const navigate = useNavigate();
  const { data, updateStep } = useOnboarding();
  const [username, setUsername] = useState(data.username);
  const [consentUpdates, setConsentUpdates] = useState(data.consentUpdates);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateStep('intent', { username, consentUpdates });
      navigate('/register/your-information');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save username. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Droplink!</CardTitle>
          <p className="text-gray-600">Choose your Droplink username</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Your profile will be: droplink.space/@{username || 'yourname'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={consentUpdates}
              onCheckedChange={(checked) => setConsentUpdates(checked as boolean)}
            />
            <Label htmlFor="consent" className="text-sm">
              I agree to receive offers, news and updates from Droplink
            </Label>
          </div>

          <Button
            onClick={handleContinue}
            disabled={isLoading || !username.trim()}
            className="w-full"
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthUserInfo;

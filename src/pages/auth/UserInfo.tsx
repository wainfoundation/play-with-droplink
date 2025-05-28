
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Helmet } from "react-helmet-async";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useUser();
  const [username, setUsername] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!username || !consent) return;
    
    setIsLoading(true);
    try {
      await updateProfile({ username });
      navigate("/register/your-information");
    } catch (error) {
      console.error("Error updating username:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Choose Your Username - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Droplink!</CardTitle>
          <p className="text-gray-600">Choose your Droplink username. You can always change it later.</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
            />
            <p className="text-sm text-gray-500">droplink.space/@{username || "your-username"}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(!!checked)}
            />
            <Label htmlFor="consent" className="text-sm">
              By continuing, you agree to receive offers, news and updates from Droplink.
            </Label>
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={!username || !consent || isLoading}
            className="w-full"
          >
            {isLoading ? "Setting up..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;

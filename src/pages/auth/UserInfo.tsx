
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Form Section */}
        <Card className="w-full max-w-md mx-auto shadow-xl">
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
              className="w-full bg-gradient-to-r from-primary to-blue-600"
            >
              {isLoading ? "Setting up..." : "Continue"}
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview Section */}
        <div className="flex justify-center">
          <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl max-w-sm">
            <div className="bg-white rounded-2xl overflow-hidden">
              {/* Status bar */}
              <div className="bg-gray-900 text-white text-xs flex justify-between items-center px-4 py-1">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Profile content */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[500px]">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                      <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${username || "preview"}`} />
                      <AvatarFallback>{(username || "YU").substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <h1 className="text-xl font-bold text-gray-900 mb-1">{username || "Your Name"}</h1>
                  <p className="text-gray-600 text-sm mb-2">@{username || "your-username"}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey
                  </p>
                </div>
                
                {/* Preview Links */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl py-3 h-auto shadow-md">
                    <span className="font-medium">🎯 My Pi Network App</span>
                  </Button>
                  
                  <Button variant="outline" className="w-full border-2 border-gray-200 rounded-xl py-3 h-auto">
                    <span className="font-medium text-gray-700">📱 Download My App</span>
                  </Button>
                  
                  <Button variant="outline" className="w-full border-2 border-orange-200 bg-orange-50 rounded-xl py-3 h-auto">
                    <span className="font-medium text-orange-700">💰 Tip me in Pi</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

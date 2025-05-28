
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

const SelectPlatforms = () => {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: "youtube", name: "YouTube", icon: "🎥", popular: true },
    { id: "tiktok", name: "TikTok", icon: "🎵", popular: true },
    { id: "instagram", name: "Instagram", icon: "📷", popular: true },
    { id: "twitter", name: "Twitter", icon: "🐦", popular: false },
    { id: "whatsapp", name: "WhatsApp", icon: "💬", popular: false },
    { id: "facebook", name: "Facebook", icon: "📘", popular: false },
    { id: "spotify", name: "Spotify", icon: "🎧", popular: false },
    { id: "website", name: "Website", icon: "🌐", popular: false },
    { id: "linkedin", name: "LinkedIn", icon: "💼", popular: false },
    { id: "discord", name: "Discord", icon: "🎮", popular: false },
    { id: "twitch", name: "Twitch", icon: "🎮", popular: false },
    { id: "telegram", name: "Telegram", icon: "✈️", popular: false }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = () => {
    navigate("/register/create/add-links");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Select Platforms - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Which platforms are you on?</h1>
          <p className="text-gray-600">Select all platforms where you're active. We'll help you add links next.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Platform Selection */}
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {platforms.map((platform) => (
                <Card
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`cursor-pointer transition-all transform hover:scale-105 relative ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-primary bg-primary/5 border-2" 
                      : "border-gray-200 hover:shadow-md"
                  }`}
                >
                  {platform.popular && (
                    <Badge className="absolute -top-1 -right-1 bg-green-500 text-xs px-1">
                      ⭐
                    </Badge>
                  )}
                  
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl mb-1">{platform.icon}</div>
                    <h3 className="font-medium text-xs">{platform.name}</h3>
                    
                    {selectedPlatforms.includes(platform.id) && (
                      <div className="mt-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Selected: {selectedPlatforms.length} platforms
              </h4>
              <p className="text-sm text-gray-600">
                Don't worry if you missed any - you can add more platforms later in your dashboard.
              </p>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-primary to-blue-600"
              size="lg"
            >
              Continue to Add Links
            </Button>
          </div>

          {/* Live Preview Section */}
          <div className="flex justify-center">
            <DemoPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlatforms;

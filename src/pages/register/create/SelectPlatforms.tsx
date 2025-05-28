
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const SelectPlatforms = () => {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: "youtube", name: "YouTube", icon: "🎥" },
    { id: "tiktok", name: "TikTok", icon: "🎵" },
    { id: "whatsapp", name: "WhatsApp", icon: "💬" },
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "instagram", name: "Instagram", icon: "📷" },
    { id: "spotify", name: "Spotify", icon: "🎧" },
    { id: "website", name: "Website", icon: "🌐" },
    { id: "twitter", name: "Twitter", icon: "🐦" }
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
      
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Which platforms are you on?</h1>
          <p className="text-gray-600">Select the platforms where you're active</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Card
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`cursor-pointer transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? "border-primary bg-primary/5" 
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{platform.icon}</div>
                <h3 className="font-medium text-sm">{platform.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button onClick={handleContinue} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPlatforms;

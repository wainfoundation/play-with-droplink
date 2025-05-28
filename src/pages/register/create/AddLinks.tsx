
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

const AddLinks = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState({
    youtube: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    website: "",
    whatsapp: ""
  });

  const platforms = [
    { key: "youtube", name: "YouTube", icon: "🎥", placeholder: "https://youtube.com/@username" },
    { key: "instagram", name: "Instagram", icon: "📷", placeholder: "https://instagram.com/username" },
    { key: "tiktok", name: "TikTok", icon: "🎵", placeholder: "https://tiktok.com/@username" },
    { key: "twitter", name: "Twitter", icon: "🐦", placeholder: "https://twitter.com/username" },
    { key: "website", name: "Personal Website", icon: "🌐", placeholder: "https://yourwebsite.com" },
    { key: "whatsapp", name: "WhatsApp", icon: "💬", placeholder: "https://wa.me/1234567890" }
  ];

  const handleLinkChange = (platform: string, value: string) => {
    setLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleContinue = () => {
    navigate("/register/create/name-image-bio?freeEntryPoint=ON_SIGNUP");
  };

  const filledLinksCount = Object.values(links).filter(link => link.trim() !== "").length;

  const getPreviewData = () => {
    // Convert links object to array format for preview
    const linksArray = Object.entries(links)
      .filter(([_, url]) => url.trim() !== "")
      .map(([platform, url]) => ({ platform, url }));

    return {
      title: "Your Name",
      bio: "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      selectedPlatforms: Object.keys(links).filter(key => links[key as keyof typeof links].trim() !== ""),
      links: linksArray,
      selectedTemplate: "modern"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Add Your Links - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Add Your Links</h1>
          <p className="text-gray-600">Paste your platform URLs below. You can add more later!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Links Form */}
          <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Platform Links</CardTitle>
              <p className="text-sm text-gray-600">Add your social media and website links</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {platforms.map((platform) => (
                <div key={platform.key} className="space-y-2">
                  <Label htmlFor={platform.key} className="flex items-center gap-2">
                    <span className="text-lg">{platform.icon}</span>
                    {platform.name}
                  </Label>
                  <Input
                    id={platform.key}
                    value={links[platform.key as keyof typeof links]}
                    onChange={(e) => handleLinkChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              
              <div className="border-t pt-4 mt-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="text-lg">π</span>
                    Pi Network Integration
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Connect your Pi Network profile to enable Pi tips and .pi domain
                  </p>
                  <Input
                    placeholder="https://profiles.pi/@username (optional)"
                    className="text-sm"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="text-green-600">📊</span>
                  Progress: {filledLinksCount}/6 links added
                </h4>
                <p className="text-sm text-gray-600">
                  Great start! You can add more platforms anytime from your dashboard.
                </p>
              </div>
              
              <Button 
                onClick={handleContinue} 
                className="w-full bg-gradient-to-r from-primary to-blue-600"
                size="lg"
              >
                Continue to Profile Setup
              </Button>
            </CardContent>
          </Card>

          {/* Live Preview Section */}
          <div className="flex justify-center">
            <DemoPreview profileData={getPreviewData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinks;

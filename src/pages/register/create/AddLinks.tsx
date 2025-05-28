
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

const AddLinks = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState({
    whatsapp: "",
    youtube: "",
    tiktok: "",
    spotify: "",
    website: ""
  });

  const handleLinkChange = (platform: string, value: string) => {
    setLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleContinue = () => {
    navigate("/register/create/name-image-bio?freeEntryPoint=ON_SIGNUP");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Add Your Links - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Add Your Links</CardTitle>
          <p className="text-gray-600">Paste your platform URLs below</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={links.whatsapp}
              onChange={(e) => handleLinkChange("whatsapp", e.target.value)}
              placeholder="https://wa.me/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              value={links.youtube}
              onChange={(e) => handleLinkChange("youtube", e.target.value)}
              placeholder="https://youtube.com/@..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              value={links.tiktok}
              onChange={(e) => handleLinkChange("tiktok", e.target.value)}
              placeholder="https://tiktok.com/@..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spotify">Spotify</Label>
            <Input
              id="spotify"
              value={links.spotify}
              onChange={(e) => handleLinkChange("spotify", e.target.value)}
              placeholder="https://open.spotify.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={links.website}
              onChange={(e) => handleLinkChange("website", e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Optional: Sync Pi profile</p>
            <p className="text-xs text-gray-500">Example: profiles.pinet.com/profiles/@username</p>
          </div>
          
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLinks;

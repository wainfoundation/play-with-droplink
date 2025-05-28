
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Helmet } from "react-helmet-async";

const NameImageBio = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState({
    title: "",
    bio: "",
    avatar: ""
  });

  const entryPoint = searchParams.get("freeEntryPoint") || 
                   searchParams.get("basicEntryPoint") || 
                   searchParams.get("proEntryPoint") || 
                   searchParams.get("premiumEntryPoint") || 
                   "ON_SIGNUP";

  const handleContinue = () => {
    const plan = searchParams.get("freeEntryPoint") ? "free" :
                searchParams.get("basicEntryPoint") ? "basic" :
                searchParams.get("proEntryPoint") ? "pro" : "premium";
    
    navigate(`/register/create/complete?${plan}EntryPoint=ON_SIGNUP`);
  };

  const generateBio = () => {
    const sampleBios = [
      "Creator passionate about sharing content with the Pi Network community",
      "Building amazing projects on Pi Network",
      "Connecting people through Pi Network innovation"
    ];
    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    setProfileData(prev => ({ ...prev, bio: randomBio }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Profile Setup - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Profile Image, Title & Bio</CardTitle>
          <p className="text-gray-600">Complete your profile setup</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback>👤</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Profile Title</Label>
            <Input
              id="title"
              value={profileData.title}
              onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Your name or business"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio (max 80 characters)</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value.slice(0, 80) }))}
              placeholder="Tell people about yourself..."
              maxLength={80}
            />
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={generateBio}>
                Write my bio
              </Button>
              <span className="text-xs text-gray-500">{profileData.bio.length}/80</span>
            </div>
          </div>
          
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameImageBio;

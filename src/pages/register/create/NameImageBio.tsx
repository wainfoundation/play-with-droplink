
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

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
      "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      "🎯 Digital entrepreneur | 📱 Tech enthusiast | 🌍 Changing the world with Pi",
      "✨ Content creator | 💰 Pi pioneer | 🔥 Follow for amazing content",
      "🎨 Creative professional | 🌟 Pi community builder | 💡 Innovation lover"
    ];
    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    setProfileData(prev => ({ ...prev, bio: randomBio }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Profile Setup - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
          <p className="text-gray-600">Add your profile picture, name, and bio to make a great first impression</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Form */}
          <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <p className="text-sm text-gray-600">This is how visitors will see your profile</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={profileData.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.title || "user"}`} />
                  <AvatarFallback className="text-xl">
                    {(profileData.title || "YU").substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Upload Photo
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  JPG, PNG or GIF. Max 5MB. Square images work best.
                </p>
              </div>
              
              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="title">Display Name</Label>
                <Input
                  id="title"
                  value={profileData.title}
                  onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your name or business name"
                  className="text-center font-medium"
                />
              </div>
              
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (max 80 characters)</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value.slice(0, 80) }))}
                  placeholder="Tell people about yourself..."
                  maxLength={80}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={generateBio}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Bio
                  </Button>
                  <span className={`text-xs ${profileData.bio.length > 70 ? 'text-red-500' : 'text-gray-500'}`}>
                    {profileData.bio.length}/80
                  </span>
                </div>
              </div>
              
              {/* Preview Box */}
              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">✨ Profile Preview</h4>
                <div className="text-center space-y-1">
                  <p className="font-semibold">{profileData.title || "Your Name"}</p>
                  <p className="text-sm text-gray-600">@username</p>
                  <p className="text-sm">{profileData.bio || "Your bio will appear here..."}</p>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue} 
                className="w-full bg-gradient-to-r from-primary to-blue-600"
                size="lg"
              >
                Complete Setup
              </Button>
            </CardContent>
          </Card>

          {/* Live Preview Section */}
          <div className="flex justify-center">
            <DemoPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameImageBio;

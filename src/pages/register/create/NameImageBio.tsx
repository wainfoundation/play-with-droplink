
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Sparkles, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import DemoPreview from "@/components/DemoPreview";
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

const NameImageBio = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { updateProgress } = useOnboardingProgress();
  
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    avatarUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  
  const plan = searchParams.get("freeEntryPoint") ? "Free" :
              searchParams.get("basicEntryPoint") ? "Starter" :
              searchParams.get("proEntryPoint") ? "Pro" : "Premium";

  const bioSuggestions = [
    "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
    "💼 Digital Entrepreneur | 🌍 Connecting globally | ✨ Making dreams reality",
    "🎨 Creative Professional | 📱 Sharing my passion | 💫 Follow my story",
    "👨‍💻 Tech Enthusiast | 🔗 Linking possibilities | 🎯 Innovation focused"
  ];

  useEffect(() => {
    // Pre-fill with user data if available
    if (user) {
      setProfileData(prev => ({
        ...prev,
        displayName: user.user_metadata?.full_name || user.user_metadata?.username || "",
      }));
    }
  }, [user]);

  const generateBio = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const randomBio = bioSuggestions[Math.floor(Math.random() * bioSuggestions.length)];
      setProfileData(prev => ({ ...prev, bio: randomBio }));
      setIsGeneratingBio(false);
      toast({
        title: "Bio Generated!",
        description: "Feel free to customize it further.",
      });
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll just show a placeholder
      // In a real implementation, you'd upload to Supabase storage
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatarUrl: imageUrl }));
      toast({
        title: "Image Uploaded",
        description: "Your profile image has been uploaded successfully.",
      });
    }
  };

  const updateUserProfile = async () => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          display_name: profileData.displayName,
          bio: profileData.bio,
          avatar_url: profileData.avatarUrl,
          profile_title: profileData.displayName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };

  const handleContinue = async () => {
    if (!profileData.displayName.trim()) {
      toast({
        title: "Display Name Required",
        description: "Please enter your display name to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Update user profile in database
      const profileUpdated = await updateUserProfile();
      
      if (!profileUpdated) {
        throw new Error('Failed to update profile');
      }

      // Save to onboarding progress
      const success = await updateProgress('name-image-bio', {
        profile: {
          displayName: profileData.displayName,
          bio: profileData.bio,
          avatarUrl: profileData.avatarUrl
        }
      });

      if (success) {
        const queryParam = `${plan.toLowerCase()}EntryPoint=ON_SIGNUP`;
        navigate(`/register/create/complete?${queryParam}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPreviewData = () => {
    return {
      title: profileData.displayName || "Your Name",
      bio: profileData.bio || "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      avatarUrl: profileData.avatarUrl,
      selectedTemplate: "modern"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Profile Setup - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
          <p className="text-gray-600">Add your name, photo, and bio to make your profile shine</p>
          
          <div className="flex justify-center mt-4">
            <Badge variant="default" className="text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              {plan} Plan Active
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Form */}
          <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <p className="text-sm text-gray-600">This is how others will see you</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Profile Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="avatar" className="text-sm font-medium">Profile Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {profileData.displayName.charAt(0).toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => document.getElementById('avatar')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 400x400px, PNG or JPG
                    </p>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  Display Name *
                </Label>
                <Input
                  id="displayName"
                  value={profileData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  placeholder="Your full name or brand"
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  <span className="text-xs text-gray-500">
                    {profileData.bio.length}/80
                  </span>
                </div>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value.slice(0, 80))}
                  placeholder="Tell people about yourself..."
                  className="transition-all focus:ring-2 focus:ring-primary/20 resize-none"
                  rows={3}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateBio}
                  disabled={isGeneratingBio}
                  className="w-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingBio ? "Generating..." : "Generate Bio with AI"}
                </Button>
              </div>

              {/* Bio Suggestions */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quick Bio Ideas</Label>
                <div className="grid gap-2">
                  {bioSuggestions.slice(0, 2).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleInputChange('bio', suggestion)}
                      className="p-2 text-left text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleContinue} 
                disabled={!profileData.displayName.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary to-blue-600"
                size="lg"
              >
                {isLoading ? "Saving Profile..." : "Complete Setup"}
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

export default NameImageBio;

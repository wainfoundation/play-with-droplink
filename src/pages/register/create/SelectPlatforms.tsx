
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Lock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress";
import { toast } from "@/hooks/use-toast";

const SelectPlatforms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProgress, savePlatformSelections } = useOnboardingProgress();
  
  // Get plan from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const userPlan = urlParams.get('freeEntryPoint') ? 'free' : 
                   urlParams.get('basicEntryPoint') ? 'starter' : 
                   urlParams.get('proEntryPoint') ? 'pro' : 
                   urlParams.get('premiumEntryPoint') ? 'premium' : 'free';

  // Plan-based limitations
  const planLimits = {
    free: { maxPlatforms: 3 },
    starter: { maxPlatforms: 10 },
    pro: { maxPlatforms: 15 },
    premium: { maxPlatforms: 999 }
  };

  const currentPlanLimits = planLimits[userPlan as keyof typeof planLimits];

  const platforms = [
    { id: "youtube", name: "YouTube", icon: "🎥", popular: true },
    { id: "instagram", name: "Instagram", icon: "📷", popular: true },
    { id: "tiktok", name: "TikTok", icon: "🎵", popular: true },
    { id: "twitter", name: "Twitter", icon: "🐦", popular: false },
    { id: "facebook", name: "Facebook", icon: "📘", popular: false },
    { id: "linkedin", name: "LinkedIn", icon: "💼", popular: false },
    { id: "spotify", name: "Spotify", icon: "🎶", popular: true },
    { id: "website", name: "Personal Website", icon: "🌐", popular: false },
    { id: "whatsapp", name: "WhatsApp", icon: "💬", popular: true },
    { id: "telegram", name: "Telegram", icon: "✈️", popular: false },
    { id: "discord", name: "Discord", icon: "🎮", popular: false },
    { id: "github", name: "GitHub", icon: "👨‍💻", popular: false }
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(prev => prev.filter(id => id !== platformId));
    } else {
      if (selectedPlatforms.length >= currentPlanLimits.maxPlatforms) {
        toast({
          title: "Platform Limit Reached",
          description: `You can only select ${currentPlanLimits.maxPlatforms} platforms with the ${userPlan} plan.`,
          variant: "destructive"
        });
        return;
      }
      setSelectedPlatforms(prev => [...prev, platformId]);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    
    try {
      // Save platform selections to dedicated table
      await savePlatformSelections(selectedPlatforms);
      
      // Update onboarding progress
      const success = await updateProgress('select-platforms', {
        platforms: selectedPlatforms
      });

      if (success) {
        const queryParam = `${userPlan}EntryPoint=ON_SIGNUP`;
        navigate(`/register/create/add-links?${queryParam}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your platform selections. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPreviewData = () => {
    return {
      title: "Your Name",
      bio: "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      selectedPlatforms,
      selectedTemplate: "modern"
    };
  };

  const handleUpgrade = () => {
    navigate("/register/select-categories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Select Platforms - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Which platforms are you on?</h1>
          <p className="text-gray-600">Select the social media platforms where your audience can find you</p>
          
          {/* Plan Badge */}
          <div className="flex justify-center mt-4">
            <Badge variant={userPlan === 'free' ? 'destructive' : 'default'} className="text-sm">
              {userPlan === 'free' && <Lock className="w-4 h-4 mr-1" />}
              {userPlan !== 'free' && <Crown className="w-4 h-4 mr-1" />}
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan - {currentPlanLimits.maxPlatforms} Platform{currentPlanLimits.maxPlatforms > 1 ? 's' : ''} Max
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Platform Selection */}
          <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Choose Your Platforms</CardTitle>
              <p className="text-sm text-gray-600">
                Selected: {selectedPlatforms.length}/{currentPlanLimits.maxPlatforms}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  const isAtLimit = selectedPlatforms.length >= currentPlanLimits.maxPlatforms && !isSelected;
                  
                  return (
                    <div
                      key={platform.id}
                      onClick={() => !isAtLimit && togglePlatform(platform.id)}
                      className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? "border-primary bg-primary/10 shadow-lg" 
                          : isAtLimit
                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="text-sm font-medium">{platform.name}</span>
                        {platform.popular && !isSelected && (
                          <Badge variant="outline" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {userPlan === 'free' && selectedPlatforms.length >= currentPlanLimits.maxPlatforms && (
                <div className="border-t pt-4 mt-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-amber-600" />
                      Platform Limit Reached
                    </h4>
                    <p className="text-sm text-amber-800 mb-3">
                      You've reached the platform limit for the Free plan. 
                      Upgrade to select more platforms and unlock additional features!
                    </p>
                    <Button 
                      onClick={handleUpgrade}
                      size="sm" 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleContinue} 
                disabled={selectedPlatforms.length === 0 || isLoading}
                className="w-full bg-gradient-to-r from-primary to-blue-600"
                size="lg"
              >
                {isLoading ? "Saving..." : "Continue to Add Links"}
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

export default SelectPlatforms;

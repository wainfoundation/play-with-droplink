
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Lock, Crown } from "lucide-react";
import DemoPreview from "@/components/DemoPreview";

const SelectPlatforms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const userPlan = urlParams.get('freeEntryPoint') ? 'free' : 
                   urlParams.get('basicEntryPoint') ? 'starter' : 
                   urlParams.get('proEntryPoint') ? 'pro' : 
                   urlParams.get('premiumEntryPoint') ? 'premium' : 'free';

  // Plan-based limitations
  const planLimits = {
    free: { maxSocialProfiles: 1 },
    starter: { maxSocialProfiles: 12 },
    pro: { maxSocialProfiles: 12 },
    premium: { maxSocialProfiles: 12 }
  };

  const currentPlanLimits = planLimits[userPlan as keyof typeof planLimits];

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
    const isAlreadySelected = selectedPlatforms.includes(platformId);
    
    // For free plan, check if at limit
    if (userPlan === 'free' && !isAlreadySelected && selectedPlatforms.length >= currentPlanLimits.maxSocialProfiles) {
      return; // Don't allow selection if at limit
    }
    
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = () => {
    const queryParam = userPlan === 'free' ? '?freeEntryPoint=ON_SIGNUP' : 
                      userPlan === 'starter' ? '?basicEntryPoint=ON_SIGNUP' :
                      userPlan === 'pro' ? '?proEntryPoint=ON_SIGNUP' :
                      '?premiumEntryPoint=ON_SIGNUP';
    navigate(`/register/create/add-links${queryParam}`);
  };

  const handleUpgrade = () => {
    navigate("/register/select-categories");
  };

  const getPreviewData = () => {
    return {
      title: "Your Name",
      bio: "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      selectedPlatforms: selectedPlatforms,
      selectedTemplate: "modern"
    };
  };

  const isAtLimit = selectedPlatforms.length >= currentPlanLimits.maxSocialProfiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Select Platforms - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Which platforms are you on?</h1>
          <p className="text-gray-600">Select all platforms where you're active. We'll help you add links next.</p>
          
          {/* Plan Badge */}
          <div className="flex justify-center mt-4">
            <Badge variant={userPlan === 'free' ? 'destructive' : 'default'} className="text-sm">
              {userPlan === 'free' && <Lock className="w-4 h-4 mr-1" />}
              {userPlan !== 'free' && <Crown className="w-4 h-4 mr-1" />}
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan - {currentPlanLimits.maxSocialProfiles} Platform{currentPlanLimits.maxSocialProfiles > 1 ? 's' : ''} Max
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Platform Selection */}
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {platforms.map((platform, index) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                const isDisabled = userPlan === 'free' && !isSelected && isAtLimit;
                
                return (
                  <Card
                    key={platform.id}
                    onClick={() => !isDisabled && togglePlatform(platform.id)}
                    className={`cursor-pointer transition-all transform hover:scale-105 relative ${
                      isSelected
                        ? "border-primary bg-primary/5 border-2" 
                        : isDisabled
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    {platform.popular && !isDisabled && (
                      <Badge className="absolute -top-1 -right-1 bg-green-500 text-xs px-1">
                        ⭐
                      </Badge>
                    )}
                    
                    {isDisabled && (
                      <Badge className="absolute -top-1 -right-1 bg-gray-400 text-xs px-1">
                        <Lock className="w-3 h-3" />
                      </Badge>
                    )}
                    
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <h3 className="font-medium text-xs">{platform.name}</h3>
                      
                      {isSelected && (
                        <div className="mt-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center mx-auto">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                      
                      {isDisabled && (
                        <div className="mt-2 text-xs text-gray-500">
                          Upgrade Required
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Free Plan Limitation Notice */}
            {userPlan === 'free' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-600" />
                  Free Plan Limitation
                </h4>
                <p className="text-sm text-amber-800 mb-3">
                  You can only select {currentPlanLimits.maxSocialProfiles} platform with the Free plan. 
                  Upgrade to select all platforms and unlock unlimited features!
                </p>
                <Button 
                  onClick={handleUpgrade}
                  size="sm" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Now - Starting at 10π/month
                </Button>
              </div>
            )}
            
            <div className={`rounded-lg p-4 mb-6 ${
              userPlan === 'free' ? 'bg-red-50 border border-red-200' : 'bg-green-50'
            }`}>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                {userPlan === 'free' ? (
                  <>
                    <Lock className="w-5 h-5 text-red-600" />
                    <span className="text-red-600">Limited Selection: {selectedPlatforms.length}/{currentPlanLimits.maxSocialProfiles} platform selected</span>
                  </>
                ) : (
                  <>
                    <span className="text-green-600">✅</span>
                    <span className="text-green-600">Selected: {selectedPlatforms.length} platforms</span>
                  </>
                )}
              </h4>
              <p className="text-sm text-gray-600">
                {userPlan === 'free' 
                  ? "You've reached your platform limit. Upgrade to select all platforms and access premium features!"
                  : "Don't worry if you missed any - you can add more platforms later in your dashboard."
                }
              </p>
              {userPlan === 'free' && isAtLimit && (
                <Button 
                  onClick={handleUpgrade}
                  size="sm" 
                  className="mt-2 bg-gradient-to-r from-primary to-blue-600"
                >
                  Upgrade to Select More Platforms
                </Button>
              )}
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
            <DemoPreview profileData={getPreviewData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlatforms;


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown } from "lucide-react";
import DemoPreview from "@/components/DemoPreview";

const AddLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get plan from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const userPlan = urlParams.get('freeEntryPoint') ? 'free' : 
                   urlParams.get('basicEntryPoint') ? 'starter' : 
                   urlParams.get('proEntryPoint') ? 'pro' : 
                   urlParams.get('premiumEntryPoint') ? 'premium' : 'free';

  const [links, setLinks] = useState({
    youtube: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    website: "",
    whatsapp: ""
  });

  // Plan-based limitations
  const planLimits = {
    free: { maxLinks: 1, canUsePiDomain: false },
    starter: { maxLinks: 6, canUsePiDomain: true },
    pro: { maxLinks: 6, canUsePiDomain: true },
    premium: { maxLinks: 6, canUsePiDomain: true }
  };

  const currentPlanLimits = planLimits[userPlan as keyof typeof planLimits];

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
    const queryParam = userPlan === 'free' ? '?freeEntryPoint=ON_SIGNUP' : 
                      userPlan === 'starter' ? '?basicEntryPoint=ON_SIGNUP' :
                      userPlan === 'pro' ? '?proEntryPoint=ON_SIGNUP' :
                      '?premiumEntryPoint=ON_SIGNUP';
    navigate(`/register/create/name-image-bio${queryParam}`);
  };

  const filledLinksCount = Object.values(links).filter(link => link.trim() !== "").length;
  const isAtLimit = filledLinksCount >= currentPlanLimits.maxLinks;

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

  const handleUpgrade = () => {
    navigate("/register/select-categories");
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
          
          {/* Plan Badge */}
          <div className="flex justify-center mt-4">
            <Badge variant={userPlan === 'free' ? 'destructive' : 'default'} className="text-sm">
              {userPlan === 'free' && <Lock className="w-4 h-4 mr-1" />}
              {userPlan !== 'free' && <Crown className="w-4 h-4 mr-1" />}
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan - {currentPlanLimits.maxLinks} Link{currentPlanLimits.maxLinks > 1 ? 's' : ''} Max
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Links Form */}
          <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Platform Links</CardTitle>
              <p className="text-sm text-gray-600">Add your social media and website links</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {platforms.map((platform, index) => {
                const isPlatformDisabled = userPlan === 'free' && index > 0 && filledLinksCount >= currentPlanLimits.maxLinks;
                const isCurrentFieldFilled = links[platform.key as keyof typeof links].trim() !== "";
                const shouldDisableField = isPlatformDisabled && !isCurrentFieldFilled;

                return (
                  <div key={platform.key} className="space-y-2 relative">
                    <Label htmlFor={platform.key} className="flex items-center gap-2">
                      <span className="text-lg">{platform.icon}</span>
                      {platform.name}
                      {shouldDisableField && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          <Lock className="w-3 h-3 mr-1" />
                          Upgrade Required
                        </Badge>
                      )}
                    </Label>
                    <Input
                      id={platform.key}
                      value={links[platform.key as keyof typeof links]}
                      onChange={(e) => handleLinkChange(platform.key, e.target.value)}
                      placeholder={shouldDisableField ? "Upgrade to add more links" : platform.placeholder}
                      disabled={shouldDisableField}
                      className={`transition-all focus:ring-2 focus:ring-primary/20 ${
                        shouldDisableField ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                );
              })}
              
              {/* Free Plan Limitation Notice */}
              {userPlan === 'free' && (
                <div className="border-t pt-4 mt-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-amber-600" />
                      Free Plan Limitation
                    </h4>
                    <p className="text-sm text-amber-800 mb-3">
                      You can only add {currentPlanLimits.maxLinks} link with the Free plan. 
                      Upgrade to add unlimited links and unlock more features!
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
                </div>
              )}
              
              {/* Pi Network Integration */}
              <div className="border-t pt-4 mt-6">
                <div className={`rounded-lg p-4 ${
                  currentPlanLimits.canUsePiDomain ? 'bg-purple-50' : 'bg-gray-50'
                }`}>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="text-lg">π</span>
                    Pi Network Integration
                    {!currentPlanLimits.canUsePiDomain && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Paid Plans Only
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Connect your Pi Network profile to enable Pi tips and .pi domain
                  </p>
                  <Input
                    placeholder={
                      currentPlanLimits.canUsePiDomain 
                        ? "https://profiles.pi/@username (optional)" 
                        : "Upgrade to connect Pi Network profile"
                    }
                    disabled={!currentPlanLimits.canUsePiDomain}
                    className={`text-sm ${
                      !currentPlanLimits.canUsePiDomain ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                  {!currentPlanLimits.canUsePiDomain && (
                    <p className="text-xs text-gray-500 mt-2">
                      Pi Network integration requires a paid plan. Upgrade to unlock Pi tips and .pi domains!
                    </p>
                  )}
                </div>
              </div>
              
              <div className={`rounded-lg p-4 ${
                userPlan === 'free' ? 'bg-red-50 border border-red-200' : 'bg-green-50'
              }`}>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  {userPlan === 'free' ? (
                    <>
                      <Lock className="w-5 h-5 text-red-600" />
                      <span className="text-red-600">Limited Progress: {filledLinksCount}/{currentPlanLimits.maxLinks} links added</span>
                    </>
                  ) : (
                    <>
                      <span className="text-green-600">📊</span>
                      <span className="text-green-600">Progress: {filledLinksCount}/{currentPlanLimits.maxLinks} links added</span>
                    </>
                  )}
                </h4>
                <p className="text-sm text-gray-600">
                  {userPlan === 'free' 
                    ? "You've reached your link limit. Upgrade to add unlimited links and access premium features!"
                    : "Great start! You can add more platforms anytime from your dashboard."
                  }
                </p>
                {userPlan === 'free' && isAtLimit && (
                  <Button 
                    onClick={handleUpgrade}
                    size="sm" 
                    className="mt-2 bg-gradient-to-r from-primary to-blue-600"
                  >
                    Upgrade to Add More Links
                  </Button>
                )}
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

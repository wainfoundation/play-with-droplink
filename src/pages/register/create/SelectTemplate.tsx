
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Lock, Crown } from "lucide-react";
import DemoPreview from "@/components/DemoPreview";

const SelectTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const userPlan = urlParams.get('freeEntryPoint') ? 'free' : 
                   urlParams.get('basicEntryPoint') ? 'starter' : 
                   urlParams.get('proEntryPoint') ? 'pro' : 
                   urlParams.get('premiumEntryPoint') ? 'premium' : 'free';

  // Plan-based template limitations
  const templateLimits = {
    free: { maxTemplates: 3, allowedTemplates: ['modern', 'minimal', 'creative'] },
    starter: { maxTemplates: 33, allowedTemplates: 'all' },
    pro: { maxTemplates: 66, allowedTemplates: 'all' },
    premium: { maxTemplates: 99, allowedTemplates: 'all' }
  };

  const currentPlanLimits = templateLimits[userPlan as keyof typeof templateLimits];

  const templates = [
    { 
      id: "modern", 
      name: "Modern Gradient", 
      preview: "🎨",
      description: "Clean gradients with modern spacing",
      popular: true,
      tier: "free"
    },
    { 
      id: "minimal", 
      name: "Minimal Clean", 
      preview: "⚪",
      description: "Simple and elegant design",
      popular: false,
      tier: "free"
    },
    { 
      id: "creative", 
      name: "Creative Bold", 
      preview: "🌈",
      description: "Vibrant colors and animations",
      popular: false,
      tier: "free"
    },
    { 
      id: "business", 
      name: "Professional", 
      preview: "💼",
      description: "Corporate and trustworthy",
      popular: false,
      tier: "premium"
    },
    { 
      id: "social", 
      name: "Social Media", 
      preview: "📱",
      description: "Perfect for influencers",
      popular: true,
      tier: "premium"
    },
    { 
      id: "portfolio", 
      name: "Creative Portfolio", 
      preview: "🖼️",
      description: "Showcase your work beautifully",
      popular: false,
      tier: "premium"
    }
  ];

  const handleContinue = () => {
    if (selectedTemplate) {
      let queryParam = '';
      switch (userPlan) {
        case 'free':
          queryParam = '?freeEntryPoint=ON_SIGNUP';
          break;
        case 'starter':
          queryParam = '?basicEntryPoint=ON_SIGNUP';
          break;
        case 'pro':
          queryParam = '?proEntryPoint=ON_SIGNUP';
          break;
        case 'premium':
          queryParam = '?premiumEntryPoint=ON_SIGNUP';
          break;
        default:
          queryParam = '?freeEntryPoint=ON_SIGNUP';
      }
      navigate(`/register/create/select-platforms${queryParam}`);
    }
  };

  const handleUpgrade = () => {
    navigate("/register/select-categories");
  };

  const getPreviewData = () => {
    return {
      title: "Your Name",
      bio: "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      selectedTemplate: selectedTemplate
    };
  };

  const isTemplateAllowed = (template: any) => {
    if (currentPlanLimits.allowedTemplates === 'all') return true;
    return (currentPlanLimits.allowedTemplates as string[]).includes(template.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Choose Template - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-gray-600">Select from professionally designed templates to match your style</p>
          
          {/* Plan Badge */}
          <div className="flex justify-center mt-4">
            <Badge variant={userPlan === 'free' ? 'destructive' : 'default'} className="text-sm">
              {userPlan === 'free' && <Lock className="w-4 h-4 mr-1" />}
              {userPlan !== 'free' && <Crown className="w-4 h-4 mr-1" />}
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan - {currentPlanLimits.maxTemplates}+ Templates Available
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Template Selection */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {templates.map((template) => {
                const isAllowed = isTemplateAllowed(template);
                const isSelected = selectedTemplate === template.id;
                
                return (
                  <Card
                    key={template.id}
                    onClick={() => isAllowed && setSelectedTemplate(template.id)}
                    className={`cursor-pointer transition-all transform hover:scale-105 relative ${
                      isSelected 
                        ? "border-primary border-2 shadow-lg" 
                        : isAllowed
                        ? "border-gray-200 hover:shadow-md"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {template.popular && isAllowed && (
                      <Badge className="absolute -top-2 -right-2 bg-primary">
                        Popular
                      </Badge>
                    )}
                    
                    {!isAllowed && (
                      <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{template.preview}</div>
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-500">{template.description}</p>
                      
                      {isSelected && isAllowed && (
                        <div className="mt-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center mx-auto">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      
                      {!isAllowed && (
                        <div className="mt-3 text-xs text-amber-600 font-medium">
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
                  You have access to {currentPlanLimits.maxTemplates} basic templates with the Free plan. 
                  Upgrade to unlock {userPlan === 'starter' ? '33+' : userPlan === 'pro' ? '66+' : '99+'} premium templates and advanced customization!
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
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-gray-600">
                {userPlan === 'free' 
                  ? "You can preview all templates, but upgrade to use premium designs and customize colors, fonts, and layouts!"
                  : "You can customize colors, fonts, and layouts after setup. Templates are just starting points!"
                }
              </p>
            </div>
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="w-full bg-gradient-to-r from-primary to-blue-600"
              size="lg"
            >
              Continue with {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : "Template"}
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

export default SelectTemplate;

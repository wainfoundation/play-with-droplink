import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown, Star, Eye, Check, Palette, LogIn } from "lucide-react";
import { useUserPlan } from "@/hooks/use-user-plan";
import UpgradeModal from "./UpgradeModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface Template {
  id: string;
  name: string;
  tier: 'free' | 'starter' | 'pro' | 'premium';
  preview: string;
  category: string;
  description: string;
}

const templates: Template[] = [
  {
    id: 'basic-1',
    name: 'Simple Link',
    tier: 'free',
    preview: '/template-previews/basic-1.png',
    category: 'Basic',
    description: 'Clean and simple design perfect for beginners'
  },
  {
    id: 'creator-1',
    name: 'Creator Hub',
    tier: 'starter',
    preview: '/template-previews/creator-1.png',
    category: 'Creator',
    description: 'Perfect for content creators and influencers'
  },
  {
    id: 'business-1',
    name: 'Professional',
    tier: 'starter',
    preview: '/template-previews/business-1.png',
    category: 'Business',
    description: 'Clean design for professionals and businesses'
  },
  {
    id: 'ecommerce-1',
    name: 'Shop Front',
    tier: 'pro',
    preview: '/template-previews/ecommerce-1.png',
    category: 'E-commerce',
    description: 'Showcase products with integrated Pi payments'
  },
  {
    id: 'portfolio-1',
    name: 'Portfolio Pro',
    tier: 'pro',
    preview: '/template-previews/portfolio-1.png',
    category: 'Portfolio',
    description: 'Stunning portfolio layout for artists and designers'
  },
  {
    id: 'enterprise-1',
    name: 'Enterprise Suite',
    tier: 'premium',
    preview: '/template-previews/enterprise-1.png',
    category: 'Enterprise',
    description: 'Advanced template with full customization options'
  }
];

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  selectedTemplate?: string;
}

const TemplateSelector = ({ onTemplateSelect, selectedTemplate }: TemplateSelectorProps) => {
  const { plan, limits, isLoggedIn } = useUserPlan();
  const { user } = useUser();
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const navigate = useNavigate();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return <Star className="w-4 h-4" />;
      case 'starter': return <Star className="w-4 h-4" />;
      case 'pro': return <Crown className="w-4 h-4" />;
      case 'premium': return <Crown className="w-4 h-4 text-yellow-500" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canUseTemplate = (templateTier: string) => {
    return limits.canUseTemplate(templateTier);
  };

  const handleTemplateSelect = (template: Template) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (canUseTemplate(template.tier)) {
      onTemplateSelect(template.id);
    } else {
      setSelectedFeature(`${template.name} template`);
      setUpgradeModalOpen(true);
    }
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
    // In a real app, this would open a preview modal or navigate to preview page
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Choose Your Template
          </CardTitle>
          <p className="text-muted-foreground">
            {!isLoggedIn 
              ? "Sign in to use templates and unlock premium designs!"
              : plan === 'free' 
              ? `You can preview all templates but only use ${limits.maxTemplates} free template. Upgrade to unlock more!`
              : `You have access to templates based on your ${plan} plan.`
            }
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => {
              const canUse = isLoggedIn && canUseTemplate(template.tier);
              const isSelected = selectedTemplate === template.id;
              
              return (
                <Card 
                  key={template.id} 
                  className={`relative transition-all duration-200 hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  } ${!canUse ? 'opacity-75' : ''}`}
                >
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                      <div className="text-4xl font-bold text-gray-400">
                        {template.name.substring(0, 2)}
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className={getTierColor(template.tier)}>
                        {getTierIcon(template.tier)}
                        {template.tier}
                      </Badge>
                    </div>
                    
                    {!isLoggedIn && (
                      <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                        <LogIn className="w-8 h-8 text-white" />
                      </div>
                    )}
                    
                    {isLoggedIn && !canUse && (
                      <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    )}
                    
                    {isSelected && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(template.id)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      
                      <Button
                        onClick={() => handleTemplateSelect(template)}
                        size="sm"
                        className="flex-1"
                        variant={canUse ? "default" : "secondary"}
                      >
                        {!isLoggedIn ? (
                          <>
                            <LogIn className="w-3 h-3 mr-1" />
                            Sign In
                          </>
                        ) : !canUse ? (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Upgrade
                          </>
                        ) : isSelected ? (
                          'Selected'
                        ) : (
                          'Use Template'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {!isLoggedIn && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <LogIn className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Sign In Required
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Create your free account to start using templates and building your Droplink profile.
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In Now
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {isLoggedIn && plan === 'free' && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">
                    Unlock Premium Templates
                  </h4>
                  <p className="text-sm text-amber-700 mb-3">
                    Upgrade to access beautiful, professional templates and remove the Droplink badge from your profile.
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => {
                      setSelectedFeature('premium templates');
                      setUpgradeModalOpen(true);
                    }}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    View Upgrade Plans
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName={selectedFeature}
        onNavigateToPricing={() => navigate('/pricing')}
      />
    </div>
  );
};

export default TemplateSelector;

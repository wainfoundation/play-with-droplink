
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Star, Shield, Check, X } from "lucide-react";

interface PlanStatusHeaderProps {
  plan: string;
  limits: any;
  onUpgrade: () => void;
}

const PlanStatusHeader = ({ plan, limits, onUpgrade }: PlanStatusHeaderProps) => {
  const planIcons = {
    'free': Star,
    'starter': Zap,
    'pro': Crown,
    'premium': Shield
  };

  const planColors = {
    'free': 'from-gray-500 to-gray-600',
    'starter': 'from-blue-500 to-blue-600',
    'pro': 'from-purple-500 to-purple-600',
    'premium': 'from-yellow-500 to-orange-500'
  };

  const PlanIcon = planIcons[plan as keyof typeof planIcons] || Star;

  const getFeatureList = () => {
    switch (plan) {
      case 'free':
        return [
          { name: '1 Link Only', included: true },
          { name: 'Pi Ad Network', included: true },
          { name: '3 Basic Templates', included: true },
          { name: 'Community Support', included: true },
          { name: 'Unlimited Links', included: false, upgrade: 'Starter' },
          { name: 'Pi Tips', included: false, upgrade: 'Starter' },
          { name: 'Analytics', included: false, upgrade: 'Starter' }
        ];
      case 'starter':
        return [
          { name: 'Unlimited Links', included: true },
          { name: 'Pi Tips', included: true },
          { name: 'Basic Analytics', included: true },
          { name: '33+ Templates', included: true },
          { name: '.pi Domain', included: true },
          { name: 'Product Sales', included: false, upgrade: 'Pro' },
          { name: 'Advanced Analytics', included: false, upgrade: 'Pro' }
        ];
      case 'pro':
        return [
          { name: 'Everything in Starter', included: true },
          { name: 'Product Sales', included: true },
          { name: 'Advanced Analytics', included: true },
          { name: 'SEO Tools', included: true },
          { name: '66+ Templates', included: true },
          { name: 'Custom CSS', included: false, upgrade: 'Premium' },
          { name: 'API Access', included: false, upgrade: 'Premium' }
        ];
      case 'premium':
        return [
          { name: 'Everything in Pro', included: true },
          { name: 'Custom CSS', included: true },
          { name: 'API Access', included: true },
          { name: 'White-label Branding', included: true },
          { name: 'Team Access', included: true },
          { name: '99+ Templates', included: true }
        ];
      default:
        return [];
    }
  };

  const features = getFeatureList();

  return (
    <Card className="mx-6 mt-6 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${planColors[plan as keyof typeof planColors]} text-white`}>
              <PlanIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                You're on the {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
              </h2>
              <p className="text-gray-600">
                {plan === 'free' && 'Upgrade to unlock premium features and grow your audience'}
                {plan === 'starter' && 'Perfect for growing creators with essential features'}
                {plan === 'pro' && 'Advanced features for professional creators'}
                {plan === 'premium' && 'Full access to all features and customizations'}
              </p>
            </div>
          </div>
          
          {plan !== 'premium' && (
            <Button 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              {feature.included ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                {feature.name}
              </span>
              {!feature.included && feature.upgrade && (
                <Badge variant="outline" className="text-xs">
                  {feature.upgrade}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {plan === 'free' && (
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm font-medium">
              🚀 You're currently limited to 1 link. Upgrade to Starter for unlimited links starting at just 10π/month!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanStatusHeader;

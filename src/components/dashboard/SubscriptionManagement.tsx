
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Star, Zap, Lock, Globe, Palette, BarChart3, Mail, Shield } from "lucide-react";
import { planPricing } from "@/hooks/usePiPayment";

interface SubscriptionManagementProps {
  subscription: any;
  handleSubscribe: (plan: string, billingCycle: string) => Promise<void>;
  processingPayment: boolean;
  setConfirmCancelOpen: (open: boolean) => void;
}

const SubscriptionManagement = ({ 
  subscription, 
  handleSubscribe, 
  processingPayment,
  setConfirmCancelOpen 
}: SubscriptionManagementProps) => {
  const plans = [
    {
      name: "Free",
      price: 0,
      features: [
        "3 links maximum",
        "2 social profiles", 
        "1 basic template only",
        "Pi Ad Network (with ads)",
        "Droplink badge (required)",
        "Basic analytics",
        "Community support",
        "Template preview only"
      ],
      limitations: [
        "No .pi domain",
        "No custom themes",
        "No email capture",
        "Limited features"
      ],
      icon: Star,
      color: "gray",
      description: "Limited starter experience"
    },
    {
      name: "Starter",
      price: planPricing.starter.monthly,
      features: [
        "Unlimited links",
        "Unlimited social profiles",
        "5 premium templates",
        "Remove Droplink badge",
        ".pi domain support",
        "Custom themes",
        "Email capture forms",
        "Advanced analytics",
        "Priority email support"
      ],
      icon: Zap,
      color: "blue",
      description: "Perfect for growing creators"
    },
    {
      name: "Pro",
      price: planPricing.pro.monthly,
      features: [
        "Everything in Starter",
        "15 premium templates",
        "QR code generation",
        "Link scheduling",
        "Link animations",
        "Location analytics",
        "SEO optimization tools",
        "Password protection",
        "Multi-language support",
        "Priority support"
      ],
      icon: Crown,
      color: "purple",
      description: "For professional creators"
    },
    {
      name: "Premium",
      price: planPricing.premium.monthly,
      features: [
        "Everything in Pro",
        "Unlimited templates",
        "White label/branding removal",
        "Custom CSS editor",
        "File uploads",
        "API access",
        "Team collaboration",
        "Advanced automations",
        "Data export",
        "Dedicated support"
      ],
      icon: Crown,
      color: "gold",
      description: "Enterprise-level features"
    }
  ];

  const currentPlan = subscription?.plan || 'free';

  const handleUpgrade = async (planName: string) => {
    await handleSubscribe(planName, 'monthly');
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          Subscription Plans
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Unlock your full potential with Pi Network's most powerful link-in-bio platform
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              currentPlan.toLowerCase() === plan.name.toLowerCase()
                ? 'border-primary bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md'
                : plan.name === 'Free'
                ? 'border-red-200 bg-red-50/50'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  plan.name === 'Free' ? 'bg-red-100' : `bg-${plan.color}-100`
                }`}>
                  <plan.icon className={`w-5 h-5 ${
                    plan.name === 'Free' ? 'text-red-600' : `text-${plan.color}-600`
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{plan.name}</span>
                    {currentPlan.toLowerCase() === plan.name.toLowerCase() && (
                      <Badge className="bg-primary text-white px-2 py-1">Current Plan</Badge>
                    )}
                    {plan.name === 'Free' && (
                      <Badge className="bg-red-500 text-white px-2 py-1">Limited</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {plan.price === 0 ? 'Free' : `${plan.price}π`}
                </div>
                {plan.price > 0 && (
                  <p className="text-sm text-gray-500">per month</p>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Included Features
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {plan.limitations && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    Limitations
                  </h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Lock className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="text-sm text-red-700">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {currentPlan.toLowerCase() !== plan.name.toLowerCase() && plan.name !== "Free" && (
              <Button
                onClick={() => handleUpgrade(plan.name)}
                disabled={processingPayment}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                size="sm"
              >
                {processingPayment ? "Processing..." : `Upgrade to ${plan.name}`}
              </Button>
            )}
            
            {plan.name === "Free" && currentPlan.toLowerCase() === "free" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                <p className="text-amber-800 text-sm font-medium">
                  🚀 Ready to unlock your full potential? Upgrade to remove limitations!
                </p>
              </div>
            )}
          </div>
        ))}
        
        {subscription && subscription.plan !== 'free' && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={() => setConfirmCancelOpen(true)}
              variant="outline"
              size="sm"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              Cancel Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionManagement;

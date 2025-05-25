
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Star, Zap } from "lucide-react";
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
      features: ["Basic profile", "5 links", "Basic analytics", "Community support"],
      icon: Star,
      color: "gray",
      description: "Perfect for getting started"
    },
    {
      name: "Starter",
      price: planPricing.starter.monthly,
      features: ["Custom profile", "Unlimited links", "Advanced analytics", "Email support"],
      icon: Zap,
      color: "blue",
      description: "Ideal for growing creators"
    },
    {
      name: "Pro",
      price: planPricing.pro.monthly,
      features: ["Everything in Starter", "Custom domain", "Priority support", "Advanced features"],
      icon: Crown,
      color: "purple",
      description: "For professional creators"
    },
    {
      name: "Premium",
      price: planPricing.premium.monthly,
      features: ["Everything in Pro", "White label", "API access", "Dedicated support"],
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
          Choose the perfect plan for your Pi Network journey
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              currentPlan.toLowerCase() === plan.name.toLowerCase()
                ? 'border-primary bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${plan.color}-100`}>
                  <plan.icon className={`w-5 h-5 text-${plan.color}-600`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{plan.name}</span>
                    {currentPlan.toLowerCase() === plan.name.toLowerCase() && (
                      <Badge className="bg-primary text-white px-2 py-1">Current Plan</Badge>
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
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
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

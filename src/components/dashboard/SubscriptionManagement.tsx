
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
      features: ["Basic profile", "5 links", "Basic analytics", "Pi Ads"],
      icon: Star,
      color: "gray"
    },
    {
      name: "Starter",
      price: planPricing.starter.monthly,
      features: ["Custom profile", "Unlimited links", "Advanced analytics", "No ads"],
      icon: Zap,
      color: "blue"
    },
    {
      name: "Pro",
      price: planPricing.pro.monthly,
      features: ["Everything in Starter", "Custom domain", "Priority support", "Advanced features"],
      icon: Crown,
      color: "purple"
    },
    {
      name: "Premium",
      price: planPricing.premium.monthly,
      features: ["Everything in Pro", "White label", "API access", "Dedicated support"],
      icon: Crown,
      color: "gold"
    }
  ];

  const currentPlan = subscription?.plan || 'free';

  const handleTestSubscribe = async (planName: string) => {
    // Simulate subscription for testing
    await handleSubscribe(planName, 'monthly');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Subscription Plans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-4 rounded-lg border-2 ${
                currentPlan.toLowerCase() === plan.name.toLowerCase()
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <plan.icon className={`w-5 h-5 text-${plan.color}-500`} />
                  <span className="font-semibold">{plan.name}</span>
                  {currentPlan.toLowerCase() === plan.name.toLowerCase() && (
                    <Badge className="bg-primary text-white">Current</Badge>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">
                    {plan.price === 0 ? 'Free' : `${plan.price}π/mo`}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-1 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {currentPlan.toLowerCase() !== plan.name.toLowerCase() && plan.name !== "Free" && (
                <Button
                  onClick={() => handleTestSubscribe(plan.name)}
                  disabled={processingPayment}
                  className="w-full bg-gradient-hero hover:bg-secondary"
                  size="sm"
                >
                  {processingPayment ? "Processing..." : `Upgrade to ${plan.name} (Test)`}
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {subscription && subscription.plan !== 'free' && (
          <div className="mt-6 pt-4 border-t">
            <Button
              onClick={() => setConfirmCancelOpen(true)}
              variant="outline"
              size="sm"
              className="w-full text-red-600 hover:text-red-700"
            >
              Cancel Subscription (Test)
            </Button>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Test Mode:</strong> All payments are simulated for testing purposes. No actual charges will be made.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManagement;

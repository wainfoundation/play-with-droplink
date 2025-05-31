
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { usePiPayment, planPricing } from '@/hooks/usePiPayment';

interface Plan {
  name: string;
  price: { monthly: number; annual: number };
  features: string[];
  popular?: boolean;
}

const SelectCategories = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { handleSubscribe, processingPayment } = usePiPayment();

  const plans: Plan[] = [
    {
      name: 'free',
      price: planPricing.free,
      features: ['Basic profile', '5 links', 'Basic analytics']
    },
    {
      name: 'starter',
      price: planPricing.starter,
      features: ['Custom domain', 'Unlimited links', 'Advanced analytics'],
      popular: true
    },
    {
      name: 'pro',
      price: planPricing.pro,
      features: ['Everything in Starter', 'Custom CSS', 'Priority support']
    },
    {
      name: 'premium',
      price: planPricing.premium,
      features: ['Everything in Pro', 'White label', 'API access']
    }
  ];

  const handleContinue = async () => {
    try {
      if (selectedPlan !== 'free') {
        const success = await handleSubscribe(selectedPlan, billingCycle);
        if (!success) {
          throw new Error('Payment failed');
        }
      }
      
      navigate(`/register/create/select-template?${selectedPlan}EntryPoint=ON_SIGNUP`);
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('annual')}
          >
            Annual
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.name ? 'ring-2 ring-blue-500' : ''
            } ${plan.popular ? 'border-blue-500' : ''}`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="capitalize">{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <CardDescription>
                {plan.price[billingCycle]}π/{billingCycle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={handleContinue}
          disabled={processingPayment}
          size="lg"
        >
          {processingPayment ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SelectCategories;

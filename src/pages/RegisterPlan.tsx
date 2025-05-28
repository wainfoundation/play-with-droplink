
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOnboarding, UserPlan } from '@/hooks/useOnboarding';
import { Check, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RegisterPlan = () => {
  const navigate = useNavigate();
  const { data, updateStep } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState<UserPlan>(data.plan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const plans = {
    free: {
      name: 'Free',
      monthly: 0,
      annual: 0,
      features: ['5 Links', 'Basic Analytics', 'Droplink Branding'],
      popular: false
    },
    basic: {
      name: 'Basic',
      monthly: 10,
      annual: 8,
      features: ['20 Links', '.pi Domain', 'Remove Ads', 'Analytics', 'QR Codes'],
      popular: false
    },
    pro: {
      name: 'Pro',
      monthly: 15,
      annual: 12,
      features: ['50 Links', 'Digital Products', 'Email Capture', 'Link Scheduling', 'Priority Support'],
      popular: true
    },
    premium: {
      name: 'Premium',
      monthly: 22,
      annual: 18,
      features: ['Unlimited Links', 'Custom CSS', 'SEO Tools', 'White Label', 'API Access'],
      popular: false
    }
  };

  const handlePayment = async () => {
    if (selectedPlan === 'free') {
      handleContinue();
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, integrate Pi SDK payment here
      const amount = plans[selectedPlan][billingCycle];
      
      toast({
        title: "Payment Integration",
        description: `Pi payment for ${amount}π would be processed here.`,
      });

      // Simulate payment success
      setTimeout(() => {
        handleContinue();
      }, 1000);
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    try {
      await updateStep('template', { plan: selectedPlan });
      navigate('/register/create/select-template');
    } catch (error) {
      console.error('Error updating plan:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Choose Your Plan</CardTitle>
          <p className="text-gray-600">Select the plan that works best for you</p>
          
          <div className="flex justify-center mt-4">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'annual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('annual')}
              >
                Annual (Save 20%)
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(plans).map(([planId, plan]) => (
              <Card
                key={planId}
                className={`cursor-pointer transition-all relative ${
                  selectedPlan === planId
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:shadow-md'
                } ${plan.popular ? 'border-purple-500' : ''}`}
                onClick={() => setSelectedPlan(planId as UserPlan)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan[billingCycle]}</span>
                      <span className="text-gray-600">π</span>
                      {planId !== 'free' && (
                        <span className="text-sm text-gray-500">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {selectedPlan === planId && (
                    <Badge variant="default" className="w-full mt-4 justify-center">
                      Selected
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              size="lg"
              className="px-8"
            >
              {isLoading ? "Processing..." : 
               selectedPlan === 'free' ? "Continue with Free" :
               `Pay ${plans[selectedPlan][billingCycle]}π & Continue`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPlan;

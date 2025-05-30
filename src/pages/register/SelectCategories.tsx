import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown, Shield, CreditCard } from "lucide-react";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";
import { usePiPayment } from "@/hooks/usePiPayment";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import GoToTop from '@/components/GoToTop';

const SelectCategories = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [processingPayment, setProcessingPayment] = useState(false);
  const { handleSubscribe, planPricing } = usePiPayment();
  const { toast } = useToast();

  const plans = [
    {
      id: "free",
      name: "Free",
      monthlyPrice: "Free",
      annualPrice: "Free",
      icon: <Star className="w-5 h-5" />,
      color: "border-gray-300",
      features: ["1 Link Only", "Basic Profile", "Pi Ads Shown", "Community Support"],
      popular: false
    },
    {
      id: "starter", 
      name: "Starter",
      monthlyPrice: "10π/month",
      annualPrice: "8π/month",
      icon: <Zap className="w-5 h-5" />,
      color: "border-blue-500",
      features: ["Unlimited Links", ".pi Domain", "Pi Tips", "No Ads", "QR Codes"],
      popular: true
    },
    {
      id: "pro",
      name: "Pro", 
      monthlyPrice: "15π/month",
      annualPrice: "12π/month",
      icon: <Crown className="w-5 h-5" />,
      color: "border-purple-500",
      features: ["Everything in Starter", "Sell Digital Products", "Advanced Analytics", "SEO Tools"],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: "22π/month", 
      annualPrice: "18π/month",
      icon: <Shield className="w-5 h-5" />,
      color: "border-yellow-500",
      features: ["Everything in Pro", "Custom CSS", "API Access", "White Label", "Priority Support"],
      popular: false
    }
  ];

  const getDisplayPrice = (plan: any) => {
    if (plan.id === "free") return "Free";
    return billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: any) => {
    if (plan.id === "free") return null;
    const pricing = planPricing[plan.id as keyof typeof planPricing];
    if (!pricing) return null;
    
    const monthlyCost = pricing.monthly * 12;
    const annualCost = pricing.annual * 12;
    const savings = monthlyCost - annualCost;
    return savings;
  };

  const handleContinue = async () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Choose a plan to continue with your setup",
        variant: "destructive",
      });
      return;
    }

    // If free plan, continue directly
    if (selectedPlan === "free") {
      navigate("/register/create/select-template?freeEntryPoint=ON_SIGNUP");
      return;
    }

    // For paid plans, process payment first
    setProcessingPayment(true);
    
    try {
      await handleSubscribe(selectedPlan, billingCycle);
      
      // After successful payment, continue to next step
      const entryPoint = selectedPlan === "starter" ? "basicEntryPoint" : 
                        selectedPlan === "pro" ? "proEntryPoint" : "premiumEntryPoint";
      navigate(`/register/create/select-template?${entryPoint}=ON_SIGNUP`);
      
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "Unable to process your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Choose Your Plan - Droplink</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">Select the plan that best fits your needs. You can upgrade or downgrade anytime.</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-primary' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-primary' : 'text-gray-500'}`}>
                Annual
              </span>
              {billingCycle === 'annual' && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  Save up to 4π/month
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Plans Selection */}
            <div className="space-y-4">
              {plans.map((plan) => {
                const savings = getSavings(plan);
                return (
                  <Card
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`cursor-pointer transition-all transform hover:scale-105 relative ${
                      selectedPlan === plan.id 
                        ? `${plan.color} border-2 shadow-lg` 
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    {billingCycle === 'annual' && savings && savings > 0 && (
                      <div className="absolute -top-3 right-4">
                        <Badge className="bg-green-500 text-white">
                          Save {savings}π/year
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {plan.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <div className="text-2xl font-bold text-primary">
                              {getDisplayPrice(plan)}
                            </div>
                            {billingCycle === 'annual' && plan.id !== 'free' && (
                              <div className="text-sm text-gray-500">
                                Billed annually
                              </div>
                            )}
                          </div>
                        </div>
                        {selectedPlan === plan.id && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
              
              {/* Payment Info for Paid Plans */}
              {selectedPlan && selectedPlan !== "free" && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Required
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    You'll be charged via Pi Network for the {plans.find(p => p.id === selectedPlan)?.name} plan.
                    Payment is processed securely through the Pi Wallet.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <span>💎</span>
                    <span>Powered by Pi Network</span>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleContinue}
                disabled={!selectedPlan || processingPayment}
                className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600"
                size="lg"
              >
                {processingPayment ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : selectedPlan === "free" ? (
                  "Continue with Free Plan"
                ) : (
                  `Pay & Continue with ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : "Selected"} Plan`
                )}
              </Button>
            </div>

            {/* Live Preview Section */}
            <div className="flex justify-center">
              <DemoPreview />
            </div>
          </div>
        </div>
      </div>
      <GoToTop />
    </>
  );
};

export default SelectCategories;

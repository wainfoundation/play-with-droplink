
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

const SelectCategories = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "Free",
      icon: <Star className="w-5 h-5" />,
      color: "border-gray-300",
      features: ["1 Link Only", "Basic Profile", "Pi Ads Shown", "Community Support"],
      popular: false
    },
    {
      id: "starter", 
      name: "Starter",
      price: "8π/month",
      icon: <Zap className="w-5 h-5" />,
      color: "border-blue-500",
      features: ["Unlimited Links", ".pi Domain", "Pi Tips", "No Ads", "QR Codes"],
      popular: true
    },
    {
      id: "pro",
      name: "Pro", 
      price: "12π/month",
      icon: <Crown className="w-5 h-5" />,
      color: "border-purple-500",
      features: ["Everything in Starter", "Sell Digital Products", "Advanced Analytics", "SEO Tools"],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "18π/month", 
      icon: <Shield className="w-5 h-5" />,
      color: "border-yellow-500",
      features: ["Everything in Pro", "Custom CSS", "API Access", "White Label", "Priority Support"],
      popular: false
    }
  ];

  const handleContinue = () => {
    if (selectedPlan) {
      navigate("/register/create/select-template");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Choose Your Plan - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Select the plan that best fits your needs. You can upgrade or downgrade anytime.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Plans Selection */}
          <div className="space-y-4">
            {plans.map((plan) => (
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
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {plan.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="text-2xl font-bold text-primary">{plan.price}</div>
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
            ))}
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedPlan}
              className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600"
              size="lg"
            >
              Continue with {selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : "Selected"} Plan
            </Button>
          </div>

          {/* Live Preview Section */}
          <div className="flex justify-center">
            <DemoPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategories;

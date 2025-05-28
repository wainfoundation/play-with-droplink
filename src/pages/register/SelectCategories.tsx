
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SelectCategories = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "Free",
      features: ["Basic profile", "5 links", "Basic analytics"]
    },
    {
      id: "basic", 
      name: "Basic",
      price: "10π",
      features: ["Unlimited links", "Custom themes", "Advanced analytics"]
    },
    {
      id: "pro",
      name: "Pro", 
      price: "15π",
      features: ["Everything in Basic", "Custom CSS", "Pi domain", "Priority support"]
    },
    {
      id: "premium",
      name: "Premium",
      price: "22π", 
      features: ["Everything in Pro", "Advanced features", "White label", "API access"]
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
      
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">Select the plan that best fits your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? "border-primary shadow-lg scale-105" 
                  : "hover:shadow-md"
              }`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl font-bold text-primary">{plan.price}</div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={handleContinue}
            disabled={!selectedPlan}
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectCategories;

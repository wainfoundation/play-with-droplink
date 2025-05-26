
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Crown, Shield, Star } from "lucide-react";
import PlanPreviewDemo from "@/components/PlanPreviewDemo";
import { useUser } from "@/context/UserContext";

const DemoSection = () => {
  const { isLoggedIn, profile } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('starter');

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-gray-500 hover:bg-gray-600',
      features: ['1 Link', 'Pi Ads', 'Basic Profile']
    },
    {
      id: 'starter' as const, 
      name: 'Starter',
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      features: ['Unlimited Links', 'No Ads', 'QR Codes']
    },
    {
      id: 'pro' as const,
      name: 'Pro', 
      icon: <Crown className="w-4 h-4" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      features: ['Advanced Analytics', 'SEO Tools', 'Scheduling']
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
      features: ['Sell Products', 'Priority Support', 'Custom CSS']
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preview Your Profile on Different Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See exactly what your demo.pi profile will look like with each subscription plan. Try before you subscribe!
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {plans.map((plan) => (
            <Button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`${
                selectedPlan === plan.id 
                  ? plan.color 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              } px-4 py-2 rounded-lg transition-all duration-200`}
              variant={selectedPlan === plan.id ? 'default' : 'outline'}
            >
              {plan.icon}
              <span className="ml-2 font-medium">{plan.name}</span>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Plan Features */}
          <div className="flex flex-col space-y-6 order-2 lg:order-1">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {plans.find(p => p.id === selectedPlan)?.name} Plan Features
              </h3>
              <div className="space-y-3">
                {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Live Preview</h4>
              <p className="text-sm text-blue-700">
                This is how your demo.pi profile will appear to visitors with the {plans.find(p => p.id === selectedPlan)?.name} plan. 
                {selectedPlan === 'free' && ' Notice the ads and link limitations.'}
                {selectedPlan !== 'free' && ' See the professional look without restrictions.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-200">
                <Link to="/pricing" className="flex items-center gap-2">
                  Choose {plans.find(p => p.id === selectedPlan)?.name} Plan <ArrowRight size={16} />
                </Link>
              </Button>
              {isLoggedIn && profile ? (
                <Button asChild variant="outline" className="hover:bg-muted/50 transition-colors">
                  <Link to={`/${profile.username}`}>View Your Profile</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="hover:bg-muted/50 transition-colors">
                  <Link to="/signup">Create Your Own</Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Demo Preview */}
          <div className="w-full flex justify-center order-1 lg:order-2">
            <div className="transform hover:-rotate-1 transition-all duration-300 hover:scale-105">
              <PlanPreviewDemo selectedPlan={selectedPlan} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

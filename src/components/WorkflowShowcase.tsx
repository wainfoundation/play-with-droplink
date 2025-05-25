
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Users, DollarSign, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const WorkflowShowcase = () => {
  const steps = [
    {
      step: "01",
      title: "Sign Up with Pi Network",
      description: "Quick authentication with your Pi Network account. No email verification needed.",
      icon: <Users className="w-6 h-6" />,
      features: ["Instant setup", "Pi Network integration", "Secure authentication"]
    },
    {
      step: "02", 
      title: "Create Your Profile",
      description: "Customize your bio page with 100+ templates and your Pi domain.",
      icon: <Globe className="w-6 h-6" />,
      features: ["100+ templates", "Pi domain setup", "Custom branding"]
    },
    {
      step: "03",
      title: "Add Links & Content",
      description: "Add unlimited links, social profiles, and enable Pi payments for tips.",
      icon: <DollarSign className="w-6 h-6" />,
      features: ["Unlimited links", "Pi payment integration", "Social profiles"]
    },
    {
      step: "04",
      title: "Choose Your Plan",
      description: "Start free with Pi Ads or upgrade for premium features and analytics.",
      icon: <BarChart3 className="w-6 h-6" />,
      features: ["Free with Pi Ads", "Premium analytics", "Advanced customization"]
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white px-4 py-2">
            Complete Workflow
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            From Sign-Up to Success in 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> 4 Simple Steps</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build your Pi Network presence and monetize your audience. 
            Complete integration from profiles to payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-blue-300 z-0"></div>
              )}
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature breakdown */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-100">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">🆓</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Free Forever Plan</h3>
            <p className="text-gray-600 mb-4">Start with our free plan featuring Pi Ad Network integration to monetize immediately.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Basic profile & links
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Pi Ad Network revenue
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Pi domain setup
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Advanced Analytics</h3>
            <p className="text-gray-600 mb-4">Track your performance with detailed analytics and insights on all paid plans.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Click tracking
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Revenue analytics
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                Visitor insights
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 md:p-8 border border-purple-100">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Pi Network Integration</h3>
            <p className="text-gray-600 mb-4">Full Pi Network ecosystem integration for seamless user experience.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                Pi payment processing
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                Custom Pi domains
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                Pi Ad Network
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button asChild size="lg" className="bg-gradient-hero hover:bg-secondary transform transition hover:scale-105 duration-200">
            <Link to="/signup" className="flex items-center gap-2">
              Start Your Journey <ArrowRight size={20} />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free plan available • Full Pi Network integration
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkflowShowcase;

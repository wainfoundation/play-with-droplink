
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Star, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";

const Pricing = () => {
  const { isLoggedIn } = useUser();

  const plans = [
    {
      name: "Free",
      price: "0π",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 Custom Profile",
        "5 Links",
        "Basic Analytics",
        "1 Template",
        "Community Support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Basic",
      price: "10π",
      period: "month",
      description: "For growing creators",
      features: [
        "Everything in Free",
        "Unlimited Links",
        "Pi Payments",
        "20+ Templates",
        "Basic Analytics",
        "Email Support"
      ],
      cta: "Upgrade to Basic",
      popular: false
    },
    {
      name: "Pro",
      price: "15π",
      period: "month",
      description: "For serious creators",
      features: [
        "Everything in Basic",
        "Custom .pi Domain",
        "Advanced Analytics",
        "50+ Templates",
        "Product Sales",
        "Priority Support",
        "Custom CSS"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Premium",
      price: "22π",
      period: "month",
      description: "For businesses & teams",
      features: [
        "Everything in Pro",
        "100+ Templates",
        "White Label",
        "Team Collaboration",
        "API Access",
        "Dedicated Support",
        "Custom Integrations"
      ],
      cta: "Upgrade to Premium",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pricing - Droplink</title>
        <meta name="description" content="Choose the perfect Droplink plan for your needs. Start free and upgrade as you grow your Pi Network presence." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Start free and upgrade as you grow 
              your Pi Network presence.
            </p>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className={`relative bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all ${plan.popular ? 'border-primary scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period !== "forever" && <span className="text-gray-600">/{plan.period}</span>}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">How do I pay with Pi?</h3>
                <p className="text-gray-600">All payments are processed through the Pi Network using your Pi Wallet. Simply select your plan and complete the payment through the Pi Browser.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade anytime?</h3>
                <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be charged or credited accordingly.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens if I cancel?</h3>
                <p className="text-gray-600">You can cancel anytime. Your account will remain active until the end of your billing period, then revert to the free plan.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pricing;

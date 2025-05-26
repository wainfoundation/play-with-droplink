
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanPreviewDemo from "@/components/PlanPreviewDemo";
import PlanFeaturesTable from "@/components/features/PlanFeaturesTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, MousePointer, BarChart4, Zap, Crown, Shield, Star, Lock, Palette, Calendar, QrCode, Settings, Eye, Users, DollarSign, TrendingUp } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Demo = () => {
  const { isLoggedIn, profile } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('starter');

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-gray-500 hover:bg-gray-600',
      price: '0π',
      templates: 3,
      links: 1,
      features: [
        '1 Link Only', 
        'Basic Profile', 
        'Pi Ads Shown', 
        'Droplink Badge',
        '3 Basic Templates'
      ],
      limitations: [
        'No .pi Domain',
        'No Pi Tips',
        'No Analytics',
        'No QR Codes', 
        'No Custom Themes',
        'Ads displayed'
      ]
    },
    {
      id: 'starter' as const, 
      name: 'Starter',
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      price: '8π',
      templates: 33,
      links: 999,
      features: [
        'Unlimited Links', 
        '.pi Domain Access',
        'Pi Tips Enabled',
        'No Ads', 
        'QR Codes', 
        'Basic Analytics', 
        'Email Support',
        '33+ Templates',
        'Custom Button Styles'
      ],
      limitations: [
        'No Product Sales',
        'No Link Scheduling',
        'No SEO Tools',
        'No Email Capture'
      ]
    },
    {
      id: 'pro' as const,
      name: 'Pro', 
      icon: <Crown className="w-4 h-4" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      price: '12π',
      templates: 66,
      links: 999,
      features: [
        'Everything in Starter',
        'Digital Product Sales',
        'Advanced Analytics', 
        'SEO Tools', 
        'Link Scheduling', 
        'Custom Themes',
        '66+ Premium Templates',
        'Email/Phone Collection',
        'Location Analytics',
        'Hide Droplink Branding'
      ],
      limitations: [
        'No Custom CSS',
        'No API Access',
        'Basic Support'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
      price: '18π',
      templates: 99,
      links: 999,
      features: [
        'Everything in Pro', 
        'Sell Products with Pi', 
        'Priority Support', 
        'Custom CSS', 
        'API Access',
        '99+ Exclusive Templates',
        'White-label Option',
        'Historical Analytics',
        'Team Access',
        'Data Export'
      ],
      limitations: []
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <>
      <Helmet>
        <title>Droplink Demo - Preview Your .pi Profile | Pi Network Link Hub</title>
        <meta name="description" content="Try our interactive demo to see how your .pi profile looks on different subscription plans. Preview features before you subscribe!" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen py-16 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Experience Your .pi Profile
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See exactly how your demo.pi profile will look and function with each subscription plan. Try before you buy!
            </p>
          </div>

          {/* Plan Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {plans.map((plan) => (
              <Button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`${
                  selectedPlan === plan.id 
                    ? plan.color 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                } px-6 py-3 rounded-lg transition-all duration-200`}
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
              >
                {plan.icon}
                <span className="ml-2 font-medium">{plan.name}</span>
                <span className="ml-2 text-sm opacity-80">({plan.price}/month)</span>
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Plan Details */}
            <div className="flex flex-col space-y-6 order-2 lg:order-1">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {currentPlan?.name} Plan
                </h2>
                <p className="text-2xl font-bold text-primary mb-4">
                  {currentPlan?.price}/month
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {selectedPlan === 'free' && 'Perfect for getting started with basic link sharing'}
                  {selectedPlan === 'starter' && 'Great for creators who want .pi domains, unlimited links and Pi tips'}
                  {selectedPlan === 'pro' && 'Ideal for serious creators who want to sell digital products and get advanced analytics'}
                  {selectedPlan === 'premium' && 'Best for businesses wanting to sell products and get full customization'}
                </p>
              </div>
              
              {/* Template & Link Count */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Palette className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Templates</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{currentPlan?.templates}+</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Links</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {currentPlan?.links === 999 ? '∞' : currentPlan?.links}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <h3 className="text-xl font-bold">What's included:</h3>
                {currentPlan?.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                      <Check size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {currentPlan?.limitations && currentPlan.limitations.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h3 className="text-xl font-bold text-gray-600">Limitations:</h3>
                  {currentPlan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-gray-100 rounded-full p-2 flex-shrink-0">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">{limitation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <MousePointer size={18} />
                  Interactive Preview
                </h4>
                <p className="text-sm text-blue-700">
                  This live preview shows exactly how your demo.pi profile will appear to visitors. 
                  {selectedPlan === 'free' && ' Notice the Pi ads, single link limitation, and basic template selection.'}
                  {selectedPlan === 'starter' && ' See .pi domain, unlimited links, Pi tips, and access to 33+ templates.'}
                  {selectedPlan === 'pro' && ' Experience digital product sales, advanced analytics and 66+ premium templates.'}
                  {selectedPlan === 'premium' && ' Enjoy full customization with 99+ templates and all features unlocked.'}
                </p>
              </div>

              {/* Feature Comparison */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Feature Comparison:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart4 className={`w-4 h-4 ${
                      ['starter', 'pro', 'premium'].includes(selectedPlan) ? 'text-green-500' : 'text-gray-300'
                    }`} />
                    <span className={['starter', 'pro', 'premium'].includes(selectedPlan) ? 'text-gray-900' : 'text-gray-400'}>
                      Analytics
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className={`w-4 h-4 ${
                      ['starter', 'pro', 'premium'].includes(selectedPlan) ? 'text-green-500' : 'text-gray-300'
                    }`} />
                    <span className={['starter', 'pro', 'premium'].includes(selectedPlan) ? 'text-gray-900' : 'text-gray-400'}>
                      QR Codes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className={`w-4 h-4 ${
                      ['pro', 'premium'].includes(selectedPlan) ? 'text-green-500' : 'text-gray-300'
                    }`} />
                    <span className={['pro', 'premium'].includes(selectedPlan) ? 'text-gray-900' : 'text-gray-400'}>
                      Product Sales
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className={`w-4 h-4 ${
                      selectedPlan === 'premium' ? 'text-green-500' : 'text-gray-300'
                    }`} />
                    <span className={selectedPlan === 'premium' ? 'text-gray-900' : 'text-gray-400'}>
                      Custom CSS
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-200">
                  <Link to="/pricing" className="flex items-center gap-2">
                    Get {currentPlan?.name} Plan <ArrowRight size={16} />
                  </Link>
                </Button>
                {isLoggedIn && profile ? (
                  <Button asChild variant="outline" size="lg" className="hover:bg-blue-50">
                    <Link to={`/${profile.username}`}>View Your Profile</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="lg" className="hover:bg-blue-50">
                    <Link to="/signup">Create Account</Link>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Demo Preview */}
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div className="transform hover:-rotate-2 transition-all duration-300 hover:scale-[1.02]">
                <PlanPreviewDemo selectedPlan={selectedPlan} />
              </div>
            </div>
          </div>

          {/* Plan Features Table */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete Feature Comparison</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare all features across our subscription plans to find the perfect fit for your needs.
              </p>
            </div>
            <PlanFeaturesTable />
          </div>
          
          <div className="mt-20 bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to create your demo.pi profile?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Sign up for free and start building your professional Pi Network presence. Connect your .pi domain and showcase your content beautifully.
            </p>
            {isLoggedIn && profile ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                <Link to="/signup">Get Started for Free</Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Demo;

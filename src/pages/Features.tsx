
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, Zap, Users, Globe, DollarSign, Palette } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";

const Features = () => {
  const { isLoggedIn } = useUser();

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Custom Profiles",
      description: "Create beautiful, professional profiles that represent your brand perfectly.",
      included: ["Free", "Basic", "Pro", "Premium"]
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Pi Payments",
      description: "Accept Pi payments directly from your profile with seamless integration.",
      included: ["Basic", "Pro", "Premium"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Pi Domains",
      description: "Get your custom .pi domain for a truly professional presence.",
      included: ["Pro", "Premium"]
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "100+ Templates",
      description: "Choose from our extensive library of professionally designed templates.",
      included: ["Free (1)", "Basic", "Pro", "Premium"]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track your performance with detailed insights and analytics.",
      included: ["Pro", "Premium"]
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Priority Support",
      description: "Get dedicated support when you need it most.",
      included: ["Premium"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Features - Droplink</title>
        <meta name="description" content="Discover all the powerful features Droplink offers to help you build your Pi Network presence and monetize your audience." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build your Pi Network presence, monetize your audience, 
              and drive mass adoption.
            </p>
            {!isLoggedIn && (
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Available in:</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.included.map((plan) => (
                        <span key={plan} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {plan}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of creators already building their Pi Network presence with Droplink.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Link to="/signup">Start Building Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;

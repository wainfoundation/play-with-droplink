
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Users, DollarSign, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Demo - Droplink</title>
        <meta name="description" content="See Droplink in action with our interactive demo. Discover how easy it is to create your Pi Network profile." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              See Droplink in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Watch how easy it is to create your professional Pi Network profile 
              and start monetizing your audience in minutes.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-8">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video coming soon</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Create Profile</h3>
                <p className="text-gray-600 text-sm">Set up your profile in under 2 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Add Pi Payments</h3>
                <p className="text-gray-600 text-sm">Start accepting Pi from your audience</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Share & Grow</h3>
                <p className="text-gray-600 text-sm">Share your profile and start earning</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Profile?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of creators already using Droplink to build their Pi Network presence.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <Link to="/signup" className="flex items-center gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;

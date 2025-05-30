
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Hero Content */}
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6 animate-fade-in">
              <Star className="w-4 h-4 mr-2" />
              Powered by Pi Network
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent leading-tight animate-fade-in delay-200">
              Your Pi Domain,
              <br />
              Your Digital Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-400">
              Transform your .pi domain into a powerful business hub with Pi payments, 
              professional profiles, and seamless Pi Browser integration.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-600">
            <div className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <span className="font-medium">Pi Native Integration</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20">
              <Zap className="w-6 h-6 text-primary mr-3" />
              <span className="font-medium">Instant Pi Payments</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20">
              <Star className="w-6 h-6 text-primary mr-3" />
              <span className="font-medium">Professional Profiles</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-800">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
            >
              <Link to="/signup">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="hover:bg-primary/5 transition-colors text-lg px-8 py-4"
            >
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center animate-fade-in delay-1000">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by Pi Network pioneers worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-primary">π</div>
              <div className="text-sm font-medium">Pi Browser Compatible</div>
              <div className="text-2xl font-bold text-primary">🔗</div>
              <div className="text-sm font-medium">.pi Domain Ready</div>
              <div className="text-2xl font-bold text-primary">💰</div>
              <div className="text-sm font-medium">Pi Payments Enabled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

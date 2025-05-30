
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Mascot */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <svg
          width="300"
          height="360"
          viewBox="0 0 300 360"
          className="animate-bounce-gentle"
        >
          {/* Droplet shape */}
          <path
            d="M150 30 C90 90, 52.5 150, 52.5 210 C52.5 277.5, 97.5 330, 150 330 C202.5 330, 247.5 277.5, 247.5 210 C247.5 150, 210 90, 150 30 Z"
            fill="url(#heroDropletGradient)"
            className="animate-pulse-gentle"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="heroDropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aaff" />
              <stop offset="50%" stopColor="#0099ee" />
              <stop offset="100%" stopColor="#0077cc" />
            </linearGradient>
          </defs>
          
          {/* Highlight */}
          <ellipse
            cx="112.5"
            cy="105"
            rx="18"
            ry="27"
            fill="rgba(255, 255, 255, 0.6)"
            className="animate-shimmer"
          />
          
          {/* Face */}
          {/* Eyes */}
          <circle cx="120" cy="165" r="9" fill="#fff" />
          <circle cx="180" cy="165" r="9" fill="#fff" />
          <circle cx="123" cy="168" r="4.5" fill="#333" className="animate-blink" />
          <circle cx="183" cy="168" r="4.5" fill="#333" className="animate-blink" />
          
          {/* Smile */}
          <path
            d="M120 210 Q150 240 180 210"
            stroke="#fff"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            className="animate-smile"
          />
          
          {/* Speech bubble */}
          <g className="animate-float">
            <path
              d="M200 80 Q200 60 220 60 L280 60 Q300 60 300 80 L300 120 Q300 140 280 140 L240 140 L220 160 L240 140 L220 140 Q200 140 200 120 Z"
              fill="#fff"
              stroke="#0099ee"
              strokeWidth="2"
            />
            <text x="250" y="85" textAnchor="middle" className="text-xs font-medium fill-primary">
              Welcome to
            </text>
            <text x="250" y="100" textAnchor="middle" className="text-xs font-bold fill-primary">
              Droplink!
            </text>
            <text x="250" y="115" textAnchor="middle" className="text-xs fill-primary">
              🚀 π Ready
            </text>
          </g>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:max-w-2xl">
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
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-400">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in delay-800 mb-12">
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

          {/* Embedded Video Section */}
          <div className="mb-12 animate-fade-in delay-1000">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-center">See Droplink in Action</h3>
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe 
                  src="https://www.youtube-nocookie.com/embed/1sv5cf9ygZs?si=rATq0V5J1SH_iNpE&controls=1" 
                  title="Droplink Demo Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center lg:text-left animate-fade-in delay-1200">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by Pi Network pioneers worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/20">
                <div className="text-xl font-bold text-primary">π</div>
                <span className="text-sm font-medium">Pi Browser Compatible</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/20">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">.pi Domain Ready</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/20">
                <div className="text-xl font-bold text-primary">💰</div>
                <span className="text-sm font-medium">Pi Payments Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes smile {
          0%, 100% { stroke-dasharray: 0, 100; }
          50% { stroke-dasharray: 30, 100; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 4s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 5s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }
        
        .animate-smile {
          animation: smile 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        `}
      </style>
    </section>
  );
};

export default Hero;

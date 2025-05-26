
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, Share, ExternalLink, Star, Lock, Zap, Crown, Shield } from "lucide-react";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface PlanPreviewDemoProps {
  selectedPlan: PlanType;
}

const PlanPreviewDemo: React.FC<PlanPreviewDemoProps> = ({ selectedPlan }) => {
  const planConfig = {
    free: {
      title: "Free Plan",
      icon: <Star className="w-4 h-4" />,
      badge: "Free",
      badgeColor: "bg-gray-500",
      links: 1,
      showAds: true,
      showDroplinkBadge: true,
      features: ["1 Link Only", "Basic Profile", "Pi Ads Shown"]
    },
    starter: {
      title: "Starter Plan", 
      icon: <Zap className="w-4 h-4" />,
      badge: "Starter",
      badgeColor: "bg-blue-500",
      links: 3,
      showAds: false,
      showDroplinkBadge: false,
      features: ["Unlimited Links", "QR Codes", "Basic Analytics", "Custom Themes"]
    },
    pro: {
      title: "Pro Plan",
      icon: <Crown className="w-4 h-4" />,
      badge: "Pro",
      badgeColor: "bg-purple-500", 
      links: 5,
      showAds: false,
      showDroplinkBadge: false,
      features: ["Everything in Starter", "Advanced Analytics", "SEO Tools", "Link Scheduling"]
    },
    premium: {
      title: "Premium Plan",
      icon: <Shield className="w-4 h-4" />,
      badge: "Premium",
      badgeColor: "bg-gold-500",
      links: 6,
      showAds: false, 
      showDroplinkBadge: false,
      features: ["Everything in Pro", "Sell Products", "Priority Support", "Custom CSS"]
    }
  };

  const config = planConfig[selectedPlan];

  const demoLinks = [
    { title: "🚀 My Pi Network App", type: "primary", locked: false },
    { title: "📱 Download My App", type: "secondary", locked: selectedPlan === 'free' },
    { title: "🎥 YouTube Channel", type: "secondary", locked: selectedPlan === 'free' }, 
    { title: "💰 Tip me in Pi", type: "tip", locked: false },
    { title: "🎵 My Music", type: "secondary", locked: selectedPlan === 'free' },
    { title: "📚 My Course", type: "secondary", locked: selectedPlan === 'free' }
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Mobile phone frame */}
      <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-gray-900 text-white text-xs flex justify-between items-center px-4 py-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* URL Bar */}
          <div className="bg-gray-100 px-4 py-2 border-b">
            <div className="bg-white rounded-lg px-3 py-1 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-mono text-sm font-bold text-primary">demo.pi</span>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[500px]">
            {/* Pi Ads for Free Plan */}
            {config.showAds && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
                <p className="text-xs text-yellow-800 font-medium">📢 Pi Network Ad</p>
                <p className="text-xs text-yellow-600 mt-1">Upgrade to remove ads</p>
              </div>
            )}
            
            {/* Profile header */}
            <div className="text-center mb-4">
              <div className="relative inline-block mb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  PD
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h1 className="text-lg font-bold text-gray-900 mb-1">Pi Developer</h1>
              <p className="text-gray-600 text-xs mb-2">@pideveloper</p>
              <p className="text-gray-700 text-xs leading-relaxed mb-3">
                🚀 Building the future of Pi Network | Join my journey
              </p>
              
              <div className="flex justify-center gap-2 mb-4">
                <Badge className={`text-xs ${config.badgeColor} text-white`}>
                  {config.icon}
                  <span className="ml-1">{config.badge}</span>
                </Badge>
              </div>
            </div>
            
            {/* Links */}
            <div className="space-y-2 mb-4">
              {demoLinks.slice(0, config.links).map((link, index) => (
                <div key={index} className="relative">
                  {link.locked ? (
                    <div className="w-full border-2 border-gray-200 bg-gray-100 rounded-xl py-2 px-3 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{link.title}</span>
                        <Lock className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className={`w-full ${
                        link.type === 'primary' 
                          ? 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white' 
                          : link.type === 'tip'
                          ? 'border-2 border-orange-200 bg-orange-50 hover:bg-orange-100'
                          : 'border-2 border-gray-200 hover:bg-gray-50'
                      } rounded-xl py-2 h-auto text-xs`}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-medium ${
                          link.type === 'tip' ? 'text-orange-700' : 
                          link.type === 'primary' ? 'text-white' : 'text-gray-700'
                        }`}>
                          {link.title}
                        </span>
                        {link.type === 'tip' ? (
                          <Heart className="w-3 h-3 text-orange-500" />
                        ) : (
                          <ExternalLink className="w-3 h-3" />
                        )}
                      </div>
                    </Button>
                  )}
                </div>
              ))}
              
              {selectedPlan === 'free' && (
                <div className="text-center py-2">
                  <p className="text-xs text-gray-500">Upgrade for more links</p>
                </div>
              )}
            </div>
            
            {/* Social links */}
            <div className="flex justify-center gap-2 mb-4">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full text-xs">
                <span className="text-blue-600">𝕏</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full text-xs">
                <span className="text-pink-600">📷</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full text-xs">
                <span className="text-blue-600">💼</span>
              </Button>
            </div>
            
            {/* Share button */}
            <div className="text-center mb-4">
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700 text-xs">
                <Share className="w-3 h-3 mr-1" />
                Share Profile
              </Button>
            </div>
            
            {/* Droplink Badge for Free Plan */}
            {config.showDroplinkBadge && (
              <div className="text-center">
                <p className="text-xs text-gray-400">Powered by Droplink</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPreviewDemo;

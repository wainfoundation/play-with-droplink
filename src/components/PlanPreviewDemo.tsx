
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, Share, ExternalLink, Star, Lock, Zap, Crown, Shield, QrCode, BarChart3, Palette, Calendar, Eye, Settings } from "lucide-react";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface PlanPreviewDemoProps {
  selectedPlan: PlanType;
}

const PlanPreviewDemo: React.FC<PlanPreviewDemoProps> = ({ selectedPlan }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const planConfig = {
    free: {
      title: "Free Plan",
      icon: <Star className="w-4 h-4" />,
      badge: "Free",
      badgeColor: "bg-gray-500",
      links: 1,
      templates: 3,
      showAds: true,
      showDroplinkBadge: true,
      features: {
        analytics: false,
        qrCode: false,
        customThemes: false,
        scheduling: false,
        seo: false,
        emailCapture: false,
        customCSS: false,
        brandingRemoval: false
      }
    },
    starter: {
      title: "Starter Plan", 
      icon: <Zap className="w-4 h-4" />,
      badge: "Starter",
      badgeColor: "bg-blue-500",
      links: 999,
      templates: 20,
      showAds: false,
      showDroplinkBadge: false,
      features: {
        analytics: true,
        qrCode: true,
        customThemes: true,
        scheduling: false,
        seo: false,
        emailCapture: false,
        customCSS: false,
        brandingRemoval: false
      }
    },
    pro: {
      title: "Pro Plan",
      icon: <Crown className="w-4 h-4" />,
      badge: "Pro",
      badgeColor: "bg-purple-500", 
      links: 999,
      templates: 50,
      showAds: false,
      showDroplinkBadge: false,
      features: {
        analytics: true,
        qrCode: true,
        customThemes: true,
        scheduling: true,
        seo: true,
        emailCapture: true,
        customCSS: false,
        brandingRemoval: false
      }
    },
    premium: {
      title: "Premium Plan",
      icon: <Shield className="w-4 h-4" />,
      badge: "Premium",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      links: 999,
      templates: 100,
      showAds: false, 
      showDroplinkBadge: false,
      features: {
        analytics: true,
        qrCode: true,
        customThemes: true,
        scheduling: true,
        seo: true,
        emailCapture: true,
        customCSS: true,
        brandingRemoval: true
      }
    }
  };

  const config = planConfig[selectedPlan];

  const templates = [
    { name: "Ocean Blue", colors: ["#00aaff", "#00d4ff"], tier: "free" },
    { name: "Sunset", colors: ["#ff7e5f", "#feb47b"], tier: "free" },
    { name: "Forest", colors: ["#11998e", "#38ef7d"], tier: "free" },
    { name: "Gradient Pro", colors: ["#667eea", "#764ba2"], tier: "starter" },
    { name: "Neon Lights", colors: ["#ff006e", "#00f5ff"], tier: "starter" },
    { name: "Royal Purple", colors: ["#8e2de2", "#4a00e0"], tier: "pro" },
    { name: "Gold Rush", colors: ["#f7971e", "#ffd200"], tier: "pro" },
    { name: "Premium Dark", colors: ["#0f0f23", "#2d2d44"], tier: "premium" },
    { name: "Diamond", colors: ["#e8f5e8", "#b8e6b8", "#74c0fc"], tier: "premium" }
  ];

  const availableTemplates = templates.filter(template => {
    if (selectedPlan === 'free') return template.tier === 'free';
    if (selectedPlan === 'starter') return ['free', 'starter'].includes(template.tier);
    if (selectedPlan === 'pro') return ['free', 'starter', 'pro'].includes(template.tier);
    return true; // premium gets all
  });

  const demoLinks = [
    { title: "🚀 My Pi Network App", type: "primary", locked: false },
    { title: "📱 Download My App", type: "secondary", locked: selectedPlan === 'free' },
    { title: "🎥 YouTube Channel", type: "secondary", locked: selectedPlan === 'free' }, 
    { title: "💰 Tip me in Pi", type: "tip", locked: false },
    { title: "🎵 My Music", type: "secondary", locked: selectedPlan === 'free' },
    { title: "📚 My Course", type: "secondary", locked: selectedPlan === 'free' }
  ];

  const currentTemplate = availableTemplates[selectedTemplate] || availableTemplates[0];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Template Selector */}
      <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">Templates</span>
          <Badge variant="outline" className="text-xs">
            {availableTemplates.length}/{config.templates}
          </Badge>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {availableTemplates.slice(0, 6).map((template, index) => (
            <button
              key={index}
              onClick={() => setSelectedTemplate(index)}
              className={`flex-shrink-0 w-8 h-8 rounded-md border-2 transition-all ${
                selectedTemplate === index ? 'border-primary scale-110' : 'border-gray-200'
              }`}
              style={{
                background: `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
              }}
            />
          ))}
          {config.templates > 6 && (
            <div className="flex-shrink-0 w-8 h-8 rounded-md border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-500">+{config.templates - 6}</span>
            </div>
          )}
        </div>
        {selectedPlan === 'free' && (
          <p className="text-xs text-gray-500 mt-1">Upgrade for more templates</p>
        )}
      </div>

      {/* Feature Icons Bar */}
      <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-700">Features</span>
          <div className="flex gap-2">
            {config.features.analytics ? (
              <BarChart3 className="w-4 h-4 text-primary" title="Analytics" />
            ) : (
              <BarChart3 className="w-4 h-4 text-gray-300" title="Analytics (Locked)" />
            )}
            {config.features.qrCode ? (
              <QrCode className="w-4 h-4 text-primary" title="QR Code" />
            ) : (
              <QrCode className="w-4 h-4 text-gray-300" title="QR Code (Locked)" />
            )}
            {config.features.customThemes ? (
              <Palette className="w-4 h-4 text-primary" title="Custom Themes" />
            ) : (
              <Palette className="w-4 h-4 text-gray-300" title="Custom Themes (Locked)" />
            )}
            {config.features.scheduling ? (
              <Calendar className="w-4 h-4 text-primary" title="Link Scheduling" />
            ) : (
              <Calendar className="w-4 h-4 text-gray-300" title="Link Scheduling (Locked)" />
            )}
            {config.features.customCSS ? (
              <Settings className="w-4 h-4 text-primary" title="Custom CSS" />
            ) : (
              <Settings className="w-4 h-4 text-gray-300" title="Custom CSS (Locked)" />
            )}
          </div>
        </div>
      </div>

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
          <div 
            className="p-4 min-h-[500px]"
            style={{
              background: currentTemplate ? 
                `linear-gradient(135deg, ${currentTemplate.colors[0]}, ${currentTemplate.colors[1]})` :
                'linear-gradient(135deg, #00aaff, #00d4ff)'
            }}
          >
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
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 text-xl font-bold shadow-lg">
                  PD
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h1 className="text-lg font-bold text-white mb-1 drop-shadow-md">Pi Developer</h1>
              <p className="text-white/90 text-xs mb-2 drop-shadow-sm">@pideveloper</p>
              <p className="text-white/90 text-xs leading-relaxed mb-3 drop-shadow-sm">
                🚀 Building the future of Pi Network | Join my journey
              </p>
              
              <div className="flex justify-center gap-2 mb-4">
                <Badge className={`text-xs text-white ${config.badgeColor}`}>
                  {config.icon}
                  <span className="ml-1">{config.badge}</span>
                </Badge>
              </div>
            </div>
            
            {/* Links */}
            <div className="space-y-2 mb-4">
              {demoLinks.slice(0, selectedPlan === 'free' ? 1 : 4).map((link, index) => (
                <div key={index} className="relative">
                  {link.locked ? (
                    <div className="w-full border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl py-2 px-3 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70">{link.title}</span>
                        <Lock className="w-3 h-3 text-white/70" />
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className={`w-full ${
                        link.type === 'primary' 
                          ? 'bg-white/90 hover:bg-white text-gray-800 backdrop-blur-sm' 
                          : link.type === 'tip'
                          ? 'border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                          : 'border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                      } rounded-xl py-2 h-auto text-xs shadow-lg`}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{link.title}</span>
                        {link.type === 'tip' ? (
                          <Heart className="w-3 h-3" />
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
                  <p className="text-xs text-white/70 drop-shadow-sm">Upgrade for unlimited links</p>
                </div>
              )}
            </div>
            
            {/* Analytics Preview (Pro/Premium only) */}
            {config.features.analytics && (
              <div className="mb-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-3 h-3 text-white" />
                  <span className="text-xs text-white font-medium">Analytics</span>
                </div>
                <div className="flex justify-between text-xs text-white/90">
                  <span>Views: 1.2k</span>
                  <span>Clicks: 340</span>
                  <span>CTR: 28%</span>
                </div>
              </div>
            )}
            
            {/* Social links */}
            <div className="flex justify-center gap-2 mb-4">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>𝕏</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>📷</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>💼</span>
              </Button>
            </div>
            
            {/* QR Code (Starter+ only) */}
            {config.features.qrCode && (
              <div className="text-center mb-4">
                <Button size="sm" variant="ghost" className="text-white/80 hover:text-white text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  <QrCode className="w-3 h-3 mr-1" />
                  Show QR Code
                </Button>
              </div>
            )}
            
            {/* Share button */}
            <div className="text-center mb-4">
              <Button size="sm" variant="ghost" className="text-white/80 hover:text-white text-xs">
                <Share className="w-3 h-3 mr-1" />
                Share Profile
              </Button>
            </div>
            
            {/* Droplink Badge for Free Plan */}
            {config.showDroplinkBadge && (
              <div className="text-center">
                <p className="text-xs text-white/60 drop-shadow-sm">Powered by Droplink</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan Features Summary */}
      <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
        <h4 className="text-sm font-medium text-gray-900 mb-2">{config.badge} Plan Includes:</h4>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Links</span>
            <span className="font-medium">{selectedPlan === 'free' ? '1 only' : 'Unlimited'}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Templates</span>
            <span className="font-medium">{config.templates}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Analytics</span>
            <span className={`font-medium ${config.features.analytics ? 'text-green-600' : 'text-gray-400'}`}>
              {config.features.analytics ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>QR Codes</span>
            <span className={`font-medium ${config.features.qrCode ? 'text-green-600' : 'text-gray-400'}`}>
              {config.features.qrCode ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Custom CSS</span>
            <span className={`font-medium ${config.features.customCSS ? 'text-green-600' : 'text-gray-400'}`}>
              {config.features.customCSS ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>No Ads</span>
            <span className={`font-medium ${!config.showAds ? 'text-green-600' : 'text-gray-400'}`}>
              {!config.showAds ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPreviewDemo;

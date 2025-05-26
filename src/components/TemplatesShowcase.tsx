import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Star, Zap, Palette, ArrowRight, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useUserPlan } from "@/hooks/use-user-plan";

const TemplatesShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("popular");
  const { isLoggedIn } = useUser();
  const { limits } = useUserPlan();
  
  // Generate featured templates with varied properties
  const generateFeaturedTemplates = () => {
    const templates = [
      {
        id: 1,
        name: "Ocean Breeze",
        category: "popular",
        plan: "free",
        colors: ["#00aaff", "#00d4ff"],
        popular: true,
        description: "Clean and refreshing design perfect for content creators"
      },
      {
        id: 2,
        name: "Coral Reef",
        category: "popular", 
        plan: "starter",
        colors: ["#ff7e5f", "#feb47b"],
        popular: true,
        description: "Vibrant template ideal for artists and designers"
      },
      {
        id: 3,
        name: "Deep Ocean",
        category: "popular",
        plan: "pro", 
        colors: ["#1a2980", "#26d0ce"],
        popular: true,
        description: "Professional template for business profiles"
      },
      {
        id: 4,
        name: "Sunset Wave",
        category: "business",
        plan: "pro",
        colors: ["#ff7e5f", "#feb47b", "#f093fb"],
        description: "Perfect for e-commerce and product showcases"
      },
      {
        id: 5,
        name: "Mint Fresh", 
        category: "creator",
        plan: "starter",
        colors: ["#0cebeb", "#20e3b2", "#29ffc6"],
        description: "Ideal for influencers and social media creators"
      },
      {
        id: 6,
        name: "Purple Haze",
        category: "creator",
        plan: "premium",
        colors: ["#5433ff", "#20bdff", "#a5fecb"],
        description: "Advanced template with custom animations"
      },
      {
        id: 7,
        name: "Golden Hour",
        category: "business", 
        plan: "premium",
        colors: ["#f5f7fa", "#c3cfe2"],
        description: "Enterprise-level template with full customization"
      },
      {
        id: 8,
        name: "Crystal Clear",
        category: "minimalist",
        plan: "free",
        colors: ["#48c6ef", "#6f86d6"], 
        description: "Simple and elegant minimalist design"
      }
    ];
    
    return templates;
  };

  const templates = generateFeaturedTemplates();
  
  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const getPlanBadge = (templatePlan: string) => {
    switch(templatePlan) {
      case "free":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Free</Badge>;
      case "starter":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Starter</Badge>;
      case "pro":
        return <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">Pro</Badge>;
      case "premium":
        return <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">Premium</Badge>;
      default:
        return null;
    }
  };

  const canUseTemplate = (templatePlan: string) => {
    return isLoggedIn && limits.canUseTemplate(templatePlan);
  };

  const TemplatePreview = ({ template }: { template: any }) => (
    <div className="w-full max-w-sm mx-auto">
      <div 
        className="w-full h-96 rounded-lg shadow-lg relative overflow-hidden"
        style={{
          background: template.colors.length > 2 
            ? `linear-gradient(45deg, ${template.colors.join(', ')})`
            : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
        }}
      >
        <div className="flex flex-col items-center justify-center h-full p-6 text-white relative z-10">
          <div className="w-20 h-20 bg-white/90 rounded-full mb-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-32 h-4 bg-white/80 rounded-full mb-2"></div>
          <div className="w-40 h-3 bg-white/60 rounded-full mb-6"></div>
          <div className="w-40 h-8 bg-white/90 rounded-lg mb-3 flex items-center justify-center">
            <div className="text-gray-700 font-semibold text-sm">Follow Me</div>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-40">
            <div className="w-full h-6 bg-white/50 rounded-md flex items-center justify-center">
              <div className="text-white/80 text-xs">🔗 Link 1</div>
            </div>
            <div className="w-full h-6 bg-white/50 rounded-md flex items-center justify-center">
              <div className="text-white/80 text-xs">🔗 Link 2</div>
            </div>
            <div className="w-full h-6 bg-white/50 rounded-md flex items-center justify-center">
              <div className="text-white/80 text-xs">🔗 Link 3</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 text-white/60 text-xs">
          {template.name}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Beautiful Templates
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {!isLoggedIn 
              ? "Sign in to use our collection of professionally designed templates and start building your profile."
              : "Choose from our collection of professionally designed templates. Preview all templates for free before selecting your perfect design."
            }
          </p>
          
          <Tabs defaultValue="popular" className="max-w-2xl mx-auto" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="creator">Creator</TabsTrigger>
              <TabsTrigger value="minimalist">Minimal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <div 
                  className="w-full h-48"
                  style={{
                    background: template.colors.length > 2 
                      ? `linear-gradient(45deg, ${template.colors.join(', ')})`
                      : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 bg-white rounded-full mb-2"></div>
                    <div className="w-20 h-2 bg-white/80 rounded-full mb-1.5"></div>
                    <div className="w-24 h-1.5 bg-white/60 rounded-full mb-3"></div>
                    <div className="w-24 h-4 bg-white/90 rounded-full mb-2"></div>
                    <div className="flex flex-col items-center gap-1 w-3/4">
                      <div className="w-full h-3 bg-white/50 rounded-sm"></div>
                      <div className="w-full h-3 bg-white/50 rounded-sm"></div>
                      <div className="w-3/4 h-3 bg-white/50 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.popular && <Badge className="bg-primary text-white"><Star className="h-3 w-3 mr-1" /> Popular</Badge>}
                </div>
                <div className="absolute top-3 right-3">
                  {getPlanBadge(template.plan)}
                </div>
                
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <LogIn className="w-4 h-4 inline mr-1" />
                      <span className="text-sm font-medium">Sign In Required</span>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1" size={14} /> Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {template.name} Preview
                          {getPlanBadge(template.plan)}
                        </DialogTitle>
                      </DialogHeader>
                      <TemplatePreview template={template} />
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" asChild>
                          <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                            {isLoggedIn ? "Use This Template" : "Sign Up to Use"}
                          </Link>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform" asChild>
                    <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                      {isLoggedIn ? "Use Template" : "Sign Up"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Previews</h3>
            <p className="text-gray-600">Preview all templates before choosing. No restrictions on viewing designs.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100+ Templates</h3>
            <p className="text-gray-600">Huge variety of professionally designed templates for every use case.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
            <p className="text-gray-600">Customize colors, fonts, and layouts to match your brand perfectly.</p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Explore All Templates</h3>
            <p className="text-gray-600 mb-6">
              {!isLoggedIn 
                ? "Create your free account to access our complete collection of 100+ templates and start building your Pi Network profile."
                : "Browse our complete collection of 100+ templates with full preview access. Find the perfect design for your Pi Network profile."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform">
                <Link to="/templates" className="flex items-center gap-2">
                  View All Templates <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                  {isLoggedIn ? "Start Building" : "Start Building Free"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;

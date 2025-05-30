import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Star, Zap, Eye, Lock, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import GoToTop from '@/components/GoToTop';

const Templates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { plan, limits, isLoggedIn } = useUserPlan();
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Generate 100 templates with varied properties
  const generateTemplates = () => {
    const categories = ["basic", "premium", "minimalist", "creator", "business", "artistic"];
    const plans = ["starter", "pro", "premium"];
    const baseNames = [
      "Aqua", "Ocean", "Coral", "Wave", "Tide", "Splash", "Marina", "Lagoon", "Ripple", "Foam",
      "Cascade", "Deep", "Flow", "Drift", "Current", "Shore", "Bay", "Stream", "River", "Lake",
      "Pond", "Falls", "Spring", "Brook", "Delta", "Cove", "Reef", "Surf", "Waves", "Blue",
      "Azure", "Cyan", "Teal", "Navy", "Sapphire", "Indigo", "Cobalt", "Turquoise", "Mint", "Sage",
      "Forest", "Emerald", "Jade", "Lime", "Olive", "Pine", "Moss", "Leaf", "Fern", "Ivy",
      "Rose", "Ruby", "Crimson", "Scarlet", "Cherry", "Wine", "Burgundy", "Coral", "Salmon", "Pink",
      "Purple", "Violet", "Lavender", "Plum", "Orchid", "Magenta", "Fuchsia", "Mauve", "Lilac", "Grape",
      "Orange", "Amber", "Gold", "Honey", "Peach", "Apricot", "Sunset", "Dawn", "Fire", "Flame",
      "Silver", "Pearl", "Platinum", "Crystal", "Diamond", "Marble", "Stone", "Granite", "Slate", "Ash",
      "Snow", "Ice", "Cloud", "Storm", "Thunder", "Lightning", "Rain", "Mist", "Fog", "Breeze"
    ];

    return Array.from({ length: 100 }, (_, index) => {
      const categoryIndex = index % categories.length;
      const planIndex = index % plans.length;
      const nameIndex = index % baseNames.length;
      
      return {
        id: index + 1,
        name: baseNames[nameIndex],
        category: categories[categoryIndex],
        popular: index < 10,
        new: index >= 90,
        plan: plans[planIndex],
        colors: generateColors(index),
        preview: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=600&fit=crop`
      };
    });
  };

  const generateColors = (index: number) => {
    const colorSets = [
      ["#00aaff", "#00d4ff"],
      ["#34c3eb", "#4764e6"],
      ["#ff7e5f", "#feb47b"],
      ["#3a7bd5", "#00d2ff"],
      ["#232526", "#414345"],
      ["#48c6ef", "#6f86d6"],
      ["#1a2980", "#26d0ce"],
      ["#0cebeb", "#20e3b2", "#29ffc6"],
      ["#5433ff", "#20bdff", "#a5fecb"],
      ["#f5f7fa", "#c3cfe2"]
    ];
    return colorSets[index % colorSets.length];
  };

  const templates = generateTemplates();
  
  const filteredTemplates = activeTab === "all" 
    ? templates 
    : templates.filter(template => template.category === activeTab);

  const getPlanBadge = (templatePlan: string) => {
    switch(templatePlan) {
      case "starter":
        return <Badge variant="outline">Starter</Badge>;
      case "pro":
        return <Badge variant="secondary">Pro</Badge>;
      case "premium":
        return <Badge className="bg-gradient-hero text-white">Premium</Badge>;
      default:
        return null;
    }
  };

  const canPreviewTemplate = (templatePlan: string) => {
    return limits.canUseTemplate(templatePlan);
  };

  const handleUseTemplate = (template: any) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!canPreviewTemplate(template.plan)) {
      navigate('/pricing');
      return;
    }
    
    // Template can be used - redirect to dashboard or template editor
    navigate('/dashboard');
  };

  const TemplatePreview = ({ template }: { template: any }) => (
    <div className="w-full max-w-sm mx-auto">
      <div 
        className="w-full h-96 rounded-lg shadow-lg"
        style={{
          background: template.colors.length > 2 
            ? `linear-gradient(45deg, ${template.colors.join(', ')})`
            : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
        }}
      >
        <div className="flex flex-col items-center justify-center h-full p-6 text-white">
          <div className="w-20 h-20 bg-white/90 rounded-full mb-4"></div>
          <div className="w-32 h-4 bg-white/80 rounded-full mb-2"></div>
          <div className="w-40 h-3 bg-white/60 rounded-full mb-6"></div>
          <div className="w-40 h-8 bg-white/90 rounded-lg mb-3"></div>
          <div className="flex flex-col gap-2 w-full max-w-40">
            <div className="w-full h-6 bg-white/50 rounded-md"></div>
            <div className="w-full h-6 bg-white/50 rounded-md"></div>
            <div className="w-full h-6 bg-white/50 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Templates | Droplink.space - Link in Bio for Pi Network Creators</title>
        <meta name="description" content="Choose from our collection of 100+ professionally designed templates that make your Droplink profile stand out." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              100+ Beautiful Templates
            </h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              {!isLoggedIn 
                ? "Sign in to use our extensive collection of professionally designed templates."
                : "Choose from our extensive collection of professionally designed templates. Preview available based on your plan."
              }
            </p>
            <Tabs defaultValue="all" className="max-w-3xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="minimalist">Minimal</TabsTrigger>
                <TabsTrigger value="creator">Creator</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTemplates.map(template => (
                <div key={template.id} className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative overflow-hidden">
                    <div 
                      className="w-full h-56"
                      style={{
                        background: template.colors.length > 2 
                          ? `linear-gradient(45deg, ${template.colors.join(', ')})`
                          : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
                        <div className="w-24 h-3 bg-white/80 rounded-full mb-1.5"></div>
                        <div className="w-32 h-2 bg-white/60 rounded-full mb-3"></div>
                        <div className="w-32 h-6 bg-white/90 rounded-full mb-2"></div>
                        <div className="flex flex-col items-center gap-1.5 w-3/4">
                          <div className="w-full h-4 bg-white/50 rounded-md"></div>
                          <div className="w-full h-4 bg-white/50 rounded-md"></div>
                          <div className="w-full h-4 bg-white/50 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {template.popular && <Badge className="bg-primary text-white"><Star className="h-3 w-3 mr-1" /> Popular</Badge>}
                      {template.new && <Badge variant="secondary"><Zap className="h-3 w-3 mr-1" /> New</Badge>}
                    </div>
                    
                    {!isLoggedIn && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90">
                          <LogIn className="h-3 w-3 mr-1" />
                          Login Required
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">{template.name}</h3>
                      {getPlanBadge(template.plan)}
                    </div>
                    <div className="flex justify-between items-center">
                      {isLoggedIn && canPreviewTemplate(template.plan) ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-primary font-medium hover:underline flex items-center">
                              <Eye className="mr-1" size={16} /> Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <TemplatePreview template={template} />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="flex items-center text-muted-foreground text-sm">
                          {!isLoggedIn ? (
                            <>
                              <LogIn className="mr-1" size={16} />
                              Sign in to preview
                            </>
                          ) : (
                            <>
                              <Lock className="mr-1" size={16} />
                              Upgrade to preview
                            </>
                          )}
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        className="bg-gradient-hero hover:scale-105 transition-transform"
                        onClick={() => handleUseTemplate(template)}
                      >
                        {!isLoggedIn ? 'Sign In to Use' : 'Use Template'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-3">No templates found</h3>
                <p className="text-muted-foreground">Try a different category or check back soon for new additions.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Template Plans */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Template Access by Plan</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-semibold mb-4">Starter</h3>
                <p className="text-lg mb-2">10π/month</p>
                <p className="mb-6 text-muted-foreground">Access to 20+ basic templates with preview</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Basic color customization
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Standard layout options
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Template preview access
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full hover:bg-blue-50 transition-colors">
                  <Link to="/pricing">Get Starter</Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-lg border-primary border-2 transform scale-[1.02]">
                <div className="bg-primary text-white text-sm font-semibold py-1 px-3 rounded-full w-fit mx-auto -mt-10 mb-4">Most Popular</div>
                <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                <p className="text-lg mb-2">15π/month</p>
                <p className="mb-6 text-muted-foreground">Access to 50+ templates with full preview</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Advanced color customization
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Custom button styles
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    All template previews
                  </li>
                </ul>
                <Button asChild className="w-full bg-gradient-hero hover:scale-105 transition-transform">
                  <Link to="/pricing">Get Pro</Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-semibold mb-4">Premium</h3>
                <p className="text-lg mb-2">22π/month</p>
                <p className="mb-6 text-muted-foreground">Access to all 100+ templates with full customization</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Full template library access
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Custom CSS options
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Early access to new designs
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Priority template support
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full hover:bg-blue-50 transition-colors">
                  <Link to="/pricing">Get Premium</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Templates;

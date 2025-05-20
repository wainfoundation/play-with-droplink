
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Templates = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const templates = [
    {
      id: 1,
      name: "Aqua",
      category: "basic",
      image: "https://images.unsplash.com/photo-1617957718587-60a442884bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: true,
      new: false,
      plan: "starter"
    },
    {
      id: 2,
      name: "Ocean",
      category: "premium",
      image: "https://images.unsplash.com/photo-1581059729227-8a690cd41d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: true,
      plan: "pro"
    },
    {
      id: 3,
      name: "Coral",
      category: "creator",
      image: "https://images.unsplash.com/photo-1593077676642-3acbd7a80b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: true,
      new: false,
      plan: "pro"
    },
    {
      id: 4,
      name: "Wave",
      category: "business",
      image: "https://images.unsplash.com/photo-1545259741-2ea3ebf92fe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: false,
      plan: "premium"
    },
    {
      id: 5,
      name: "Tide",
      category: "minimalist",
      image: "https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: true,
      new: false,
      plan: "starter"
    },
    {
      id: 6,
      name: "Splash",
      category: "basic",
      image: "https://images.unsplash.com/photo-1527323585280-9036d09125a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: false,
      plan: "starter"
    },
    {
      id: 7,
      name: "Marina",
      category: "premium",
      image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: true,
      plan: "premium"
    },
    {
      id: 8,
      name: "Lagoon",
      category: "creator",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: false,
      plan: "pro"
    },
    {
      id: 9,
      name: "Ripple",
      category: "business",
      image: "https://images.unsplash.com/photo-1617824254359-0941a234789b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: true,
      plan: "premium"
    },
    {
      id: 10,
      name: "Foam",
      category: "minimalist",
      image: "https://images.unsplash.com/photo-1625234188513-6054f53aed20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: true,
      new: false,
      plan: "pro"
    },
    {
      id: 11,
      name: "Cascade",
      category: "basic",
      image: "https://images.unsplash.com/photo-1526376043067-5af36c35cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: false,
      plan: "starter"
    },
    {
      id: 12,
      name: "Deep",
      category: "premium",
      image: "https://images.unsplash.com/photo-1519619091416-f5d7e5200702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: false,
      new: true,
      plan: "premium"
    }
  ];
  
  const filteredTemplates = activeTab === "all" 
    ? templates 
    : templates.filter(template => template.category === activeTab);

  const getPlanBadge = (plan: string) => {
    switch(plan) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Showcase Your Vision with Beautiful Templates</h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, water-inspired templates that make your Droplink profile stand out.
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
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {template.popular && <Badge className="bg-primary text-white">Popular</Badge>}
                      {template.new && <Badge variant="secondary">New</Badge>}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">{template.name}</h3>
                      {getPlanBadge(template.plan)}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/templates/${template.id}`}
                        className="text-primary font-medium hover:underline"
                      >
                        Preview
                      </Link>
                      <Button size="sm">Use Template</Button>
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
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Template Availability by Plan</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Starter</h3>
                <p className="text-lg mb-2">6π/month</p>
                <p className="mb-6 text-muted-foreground">Access to 5+ basic templates</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Basic color customization
                  </li>
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Standard layout options
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/pricing">Get Starter</Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border-primary border-2">
                <div className="bg-primary text-white text-sm font-semibold py-1 px-3 rounded-full w-fit mx-auto -mt-10 mb-4">Most Popular</div>
                <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                <p className="text-lg mb-2">10π/month</p>
                <p className="mb-6 text-muted-foreground">Access to 15+ premium templates</p>
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
                    Link animations
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/pricing">Get Pro</Link>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Premium</h3>
                <p className="text-lg mb-2">15π/month</p>
                <p className="mb-6 text-muted-foreground">Access to all 25+ templates</p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Full template customization
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
                <Button variant="outline" asChild className="w-full">
                  <Link to="/pricing">Get Premium</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Create Your Own */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Looking for Something Custom?</h2>
            <p className="text-xl mb-8">
              Pro and Premium users can create fully customized templates to match their brand identity perfectly.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;

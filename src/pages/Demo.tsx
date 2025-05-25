
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, MousePointer, BarChart4 } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Demo = () => {
  const { isLoggedIn, profile } = useUser();

  return (
    <>
      <Helmet>
        <title>Droplink Demo - Try Our Link in Bio Tool for Pi Network</title>
        <meta name="description" content="See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen py-16 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Experience Droplink in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try our interactive demo to see how Droplink can help you create stunning link in bio pages for your Pi Network content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-lg">
                Our demo gives you a taste of the Droplink experience. Explore a sample profile, interact with links, and see the analytics dashboard.
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                    <MousePointer size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Browse a Sample Profile</h3>
                    <p className="text-muted-foreground">See how your links, products, and content will look to your visitors.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                    <Check size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Interact with Features</h3>
                    <p className="text-muted-foreground">Test Pi payment integration, newsletter signups, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                    <BarChart4 size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">View Analytics</h3>
                    <p className="text-muted-foreground">See how you can track visits, clicks, and earnings with our dashboard.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {isLoggedIn && profile ? (
                  <Button asChild size="lg" className="bg-gradient-hero hover:scale-105 transition-transform duration-200">
                    <Link to={`/${profile.username}`} className="flex items-center gap-2">
                      View Your Profile <ArrowRight size={16} />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-gradient-hero hover:scale-105 transition-transform duration-200">
                    <Link to="/signup" className="flex items-center gap-2">
                      Create Your Own <ArrowRight size={16} />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="hover:bg-blue-50">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div className="transform hover:-rotate-2 transition-all duration-300 hover:scale-[1.02]">
                <DemoPreview />
              </div>
            </div>
          </div>
          
          <div className="mt-20 bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to create your own Droplink page?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Sign up for free and start connecting with your audience through a beautiful, customizable link in bio page that accepts Pi payments.
            </p>
            {isLoggedIn && profile ? (
              <Button asChild size="lg" className="bg-gradient-hero hover:scale-105 transition-transform">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-gradient-hero hover:scale-105 transition-transform">
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

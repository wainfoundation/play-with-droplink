
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Demo = () => {
  return (
    <>
      <Helmet>
        <title>Droplink Demo - Try Our Link in Bio Tool for Pi Network</title>
        <meta name="description" content="See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience Droplink in Action</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try our interactive demo to see how Droplink can help you create stunning link in bio pages for your Pi Network content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-lg">
                Our demo gives you a taste of the Droplink experience. Explore a sample profile, interact with links, and see the analytics dashboard.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-2 text-white">1</div>
                  <div>
                    <h3 className="font-semibold text-xl">Browse a Sample Profile</h3>
                    <p>See how your links, products, and content will look to your visitors.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-2 text-white">2</div>
                  <div>
                    <h3 className="font-semibold text-xl">Interact with Features</h3>
                    <p>Test Pi payment integration, newsletter signups, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-2 text-white">3</div>
                  <div>
                    <h3 className="font-semibold text-xl">View Analytics</h3>
                    <p>See how you can track visits, clicks, and earnings with our dashboard.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="bg-gradient-hero hover:bg-secondary">
                  <Link to="/signup">Create Your Own</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full flex justify-center">
              <DemoPreview />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Demo;

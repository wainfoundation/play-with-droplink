
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DemoPreview from "@/components/DemoPreview";
import { useUser } from "@/context/UserContext";

const DemoSection = () => {
  const { isLoggedIn, profile } = useUser();

  return (
    <section className="py-24 px-4 bg-muted/50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              See Droplink in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the power of Droplink with our interactive demo. See how your bio page could look, explore the dashboard, and discover the features that make Droplink the best link-in-bio tool for Pi Network creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-hero hover:bg-secondary transform transition hover:scale-105 duration-200">
                <Link to="/demo" className="flex items-center gap-2">
                  Try the Demo <ArrowRight size={16} />
                </Link>
              </Button>
              {isLoggedIn && profile ? (
                <Button asChild variant="outline" className="hover:bg-muted/50 transition-colors">
                  <Link to={`/${profile.username}`}>View Your Profile</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="hover:bg-muted/50 transition-colors">
                  <Link to="/signup">Create Your Own</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="transform hover:-rotate-2 transition-transform duration-300 hover:scale-105">
              <DemoPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

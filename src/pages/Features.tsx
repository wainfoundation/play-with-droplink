import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi } from "@/utils/pi-sdk";
import FeaturesTable from "@/components/features/FeaturesTable";
import UserWelcomeSection from "@/components/features/UserWelcomeSection";
import LoginPromptSection from "@/components/features/LoginPromptSection";
import { featuresList } from "@/data/featuresData";
import GoToTop from '@/components/GoToTop';

const Features = () => {
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<Date | null>(null);
  
  useEffect(() => {
    // Simulate checking subscription from storage
    const storedPlan = localStorage.getItem("userPlan");
    const storedUsername = localStorage.getItem("username");
    const storedExpiration = localStorage.getItem("subscriptionEnd");
    
    if (storedPlan) {
      setUserPlan(storedPlan);
      setIsLoggedIn(true);
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    if (storedExpiration) {
      setSubscriptionEnd(new Date(storedExpiration));
    }
  }, []);
  
  const handlePiLogin = async () => {
    try {
      const auth = await authenticateWithPi(["username"]);
      if (auth && auth.user.username) {
        setIsLoggedIn(true);
        setUsername(auth.user.username);
        
        // Store in localStorage
        localStorage.setItem("username", auth.user.username);
        
        toast({
          title: "Logged in successfully",
          description: `Welcome, ${auth.user.username}!`,
        });
      }
    } catch (error) {
      console.error("Pi authentication failed:", error);
      toast({
        title: "Authentication failed",
        description: "Could not log in with Pi Network",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Features & Capabilities</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Discover all the powerful features available with Droplink and choose the plan that's right for you
            </p>
            
            {isLoggedIn && username && (
              <UserWelcomeSection 
                username={username}
                userPlan={userPlan}
                subscriptionEnd={subscriptionEnd}
              />
            )}
            
            {!isLoggedIn && (
              <LoginPromptSection onPiLogin={handlePiLogin} />
            )}
          </div>
          
          <FeaturesTable features={featuresList} />
          
          <div className="mt-16 text-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-gradient-hero hover:bg-secondary">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Features;

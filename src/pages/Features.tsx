import { useState, useEffect } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { authenticateWithPi } from "@/utils/pi-sdk";

interface FeatureItem {
  name: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
  description: string;
}

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

  const featuresList: FeatureItem[] = [
    {
      name: "Unlimited Links",
      starter: true,
      pro: true,
      premium: true,
      description: "Add as many links as you need to your profile"
    },
    {
      name: "Connect All Social Profiles",
      starter: true,
      pro: true,
      premium: true,
      description: "Link to all your social media accounts"
    },
    {
      name: "Sell Products with Pi Payments",
      starter: true,
      pro: true,
      premium: true,
      description: "Accept Pi payments for your products"
    },
    {
      name: "Basic Analytics",
      starter: true,
      pro: true,
      premium: true,
      description: "See how many people visit your profile"
    },
    {
      name: "Email Support",
      starter: true,
      pro: true,
      premium: true,
      description: "Get help via email"
    },
    {
      name: "Community Forums Access",
      starter: true,
      pro: true,
      premium: true,
      description: "Join our community discussion forums"
    },
    {
      name: "Multi-Factor Authentication",
      starter: false,
      pro: true,
      premium: true,
      description: "Enhanced security for your account"
    },
    {
      name: "QR Codes for Offline Traffic",
      starter: false,
      pro: true,
      premium: true,
      description: "Generate QR codes for your profile"
    },
    {
      name: "Schedule Links",
      starter: false,
      pro: true,
      premium: true,
      description: "Schedule when links appear or disappear"
    },
    {
      name: "Link Animations",
      starter: false,
      pro: true,
      premium: true,
      description: "Add animations to your links"
    },
    {
      name: "Custom Button Styles",
      starter: false,
      pro: true,
      premium: true,
      description: "Customize the look of your buttons"
    },
    {
      name: "Spotlight Links",
      starter: false,
      pro: true,
      premium: true,
      description: "Highlight important links"
    },
    {
      name: "Performance Analytics",
      starter: false,
      pro: true,
      premium: true,
      description: "Track clicks and conversions"
    },
    {
      name: "Custom Themes",
      starter: false,
      pro: true,
      premium: true,
      description: "Access premium themes"
    },
    {
      name: "Location Analytics",
      starter: false,
      pro: true,
      premium: true,
      description: "See where your visitors are from"
    },
    {
      name: "Email/Phone Collection",
      starter: false,
      pro: true,
      premium: true,
      description: "Collect contact information from visitors"
    },
    {
      name: "SEO & Pi Integrations",
      starter: false,
      pro: true,
      premium: true,
      description: "Optimize for search engines"
    },
    {
      name: "Community Rewards",
      starter: false,
      pro: true,
      premium: true,
      description: "Earn rewards for contributing to the community"
    },
    {
      name: "Tailored Onboarding",
      starter: false,
      pro: false,
      premium: true,
      description: "Get personalized setup assistance"
    },
    {
      name: "Priority Support (4-Hour)",
      starter: false,
      pro: false,
      premium: true,
      description: "Get faster support response"
    },
    {
      name: "Historical Insights",
      starter: false,
      pro: false,
      premium: true,
      description: "Access long-term analytics data"
    },
    {
      name: "Data Export",
      starter: false,
      pro: false,
      premium: true,
      description: "Export your analytics data"
    },
    {
      name: "Whitelabel Option",
      starter: false,
      pro: false,
      premium: true,
      description: "Remove Droplink branding"
    },
    {
      name: "Advanced Pi Payments",
      starter: false,
      pro: false,
      premium: true,
      description: "Advanced payment features and analytics"
    },
    {
      name: "Community Contributor Status",
      starter: false,
      pro: false,
      premium: true,
      description: "Get recognized in the community"
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
              <div className="mt-8 p-4 bg-gradient-hero text-white rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-xl font-semibold">Welcome, @{username}!</h2>
                {userPlan && (
                  <>
                    <p className="mt-2">Your current plan: <span className="font-bold">{userPlan}</span></p>
                    {subscriptionEnd && (
                      <p className="text-sm mt-1">Renews on: {formatDate(subscriptionEnd)}</p>
                    )}
                  </>
                )}
                {!userPlan && (
                  <div className="mt-3">
                    <p className="mb-2">You're currently on the Free plan</p>
                    <Link to="/pricing">
                      <Button className="bg-white text-primary hover:bg-opacity-90">
                        Upgrade Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {!isLoggedIn && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-primary mb-3">Sign in to access features</h2>
                <Button 
                  onClick={handlePiLogin}
                  className="bg-gradient-hero hover:bg-secondary"
                >
                  Sign in with Pi Network
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  New to Droplink? <Link to="/signup" className="text-primary underline">Create an account</Link>
                </p>
              </div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-12">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-4 text-left border-b-2 border-blue-200 w-1/4">Feature</th>
                  <th className="p-4 text-center border-b-2 border-blue-200">Starter<br/><span className="text-sm font-normal">6π/month</span></th>
                  <th className="p-4 text-center border-b-2 border-blue-200 bg-blue-100">Pro<br/><span className="text-sm font-normal">10π/month</span></th>
                  <th className="p-4 text-center border-b-2 border-blue-200">Premium<br/><span className="text-sm font-normal">15π/month</span></th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 border-b border-gray-200">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    </td>
                    <td className="p-4 text-center border-b border-gray-200">
                      {feature.starter ? 
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="p-4 text-center border-b border-gray-200 bg-blue-50">
                      {feature.pro ? 
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="p-4 text-center border-b border-gray-200">
                      {feature.premium ? 
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
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
    </div>
  );
};

export default Features;

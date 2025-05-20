
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingCard = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  ctaText = "Get Started",
  ctaLink = "/signup"
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 border ${isPopular ? 'border-primary' : 'border-gray-200'} relative`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-gray-500">/month</span>
      </div>
      <p className="text-gray-600 mb-6">Billed annually</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-primary"><CheckIcon size={18} /></span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button asChild className={`w-full ${isPopular ? 'bg-gradient-hero hover:bg-secondary' : 'bg-white border border-primary text-primary hover:bg-muted'}`}>
        <Link to={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const starterFeatures = [
    "Unlimited Links",
    "Connect All Social Profiles",
    "Sell Products with Pi Payments",
    "Basic Analytics",
    "Email Support",
    "Community Forums Access"
  ];
  
  const proFeatures = [
    "Everything in Starter",
    "Multi-Factor Authentication",
    "QR Codes for Offline Traffic",
    "Schedule Links",
    "Link Animations",
    "Custom Button Styles",
    "Spotlight Links",
    "Performance Analytics",
    "Custom Themes",
    "Location Analytics",
    "Email/Phone Collection",
    "SEO & Pi Integrations",
    "Community Rewards"
  ];
  
  const premiumFeatures = [
    "Everything in Pro",
    "Tailored Onboarding",
    "Priority Support (4-Hour)",
    "Historical Insights",
    "Data Export",
    "Whitelabel Option",
    "Advanced Pi Payments",
    "Community Contributor Status"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Pricing Plans</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Choose a plan to amplify your presence and join our community-driven ecosystem.
            </p>
            
            <div className="mt-6 inline-flex items-center p-1 bg-muted rounded-lg">
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  annual ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                Annual (Save 20%)
              </button>
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  !annual ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price={annual ? "6π" : "8π"}
              features={starterFeatures}
            />
            
            <PricingCard
              title="Pro"
              price={annual ? "10π" : "12π"}
              features={proFeatures}
              isPopular={true}
              ctaText="Try Free for 7 Days"
            />
            
            <PricingCard
              title="Premium"
              price={annual ? "15π" : "18π"}
              features={premiumFeatures}
            />
          </div>
          
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="text-left space-y-6 mt-8">
              <div>
                <h3 className="font-bold text-lg">Do I need a Pi account to use Droplink?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, you'll need a Pi Network account to receive payments and tips through your Droplink page.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">Can I switch between plans?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What happens after my Pro trial ends?</h3>
                <p className="text-gray-600 mt-2">
                  After your 7-day trial, you'll be automatically subscribed to the Pro plan unless you downgrade to Starter.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">How does Droplink support the Pi community?</h3>
                <p className="text-gray-600 mt-2">
                  Droplink is built by and for the Pi community. We contribute back through community rewards, special events, and by creating tools that help creators thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;


import { useState } from "react";
import { CheckIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUser } from "@/context/UserContext";
import { createPiPayment } from "@/services/piPaymentService";
import { useToast } from "@/hooks/use-toast";

const PricingCard = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  ctaText = "Get Started",
  ctaAction,
  currentPlan = false,
  processingPayment = false
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 border ${currentPlan ? 'border-green-500' : isPopular ? 'border-primary' : 'border-gray-200'} relative`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      {currentPlan && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Your Plan
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
      
      <Button 
        onClick={ctaAction}
        className={`w-full ${currentPlan ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed' : isPopular ? 'bg-gradient-hero hover:bg-secondary' : 'bg-white border border-primary text-primary hover:bg-muted'}`}
        disabled={currentPlan || processingPayment}
      >
        {processingPayment ? "Processing..." : currentPlan ? "Current Plan" : ctaText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const { isLoggedIn, user, subscription, showAds } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  const handleSubscribe = async (plan: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Calculate amount based on plan and billing cycle
      let amount = 0;
      if (plan === "Starter") {
        amount = annual ? 6 : 8;
      } else if (plan === "Pro") {
        amount = annual ? 10 : 12;
      } else if (plan === "Premium") {
        amount = annual ? 15 : 18;
      }
      
      // Create payment through Pi Network
      const paymentData = {
        amount,
        memo: `${plan} Plan Subscription (${annual ? 'Annual' : 'Monthly'})`,
        metadata: {
          isSubscription: true,
          plan: plan.toLowerCase(),
          duration: annual ? 'annual' : 'monthly'
        }
      };
      
      await createPiPayment(paymentData, user);
      
      // The payment flow will be handled by callbacks in piPaymentService
      toast({
        title: "Payment Processing",
        description: "Follow the Pi payment flow to complete your subscription",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };
  
  const isPlanActive = (plan: string): boolean => {
    if (!subscription) return false;
    return subscription.plan.toLowerCase() === plan.toLowerCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6">
        <div className="container mx-auto">
          {/* Show Pi Ads for Starter plan users */}
          {showAds && (
            <div className="mb-8">
              <PiAdsNetwork placementId="pricing-top" />
            </div>
          )}
          
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
            
            {isLoggedIn && subscription && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
                <p className="text-sm text-blue-800">
                  You're currently on the <span className="font-bold">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                  </span> plan
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price={annual ? "6π" : "8π"}
              features={starterFeatures}
              ctaText={isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => handleSubscribe("Starter")}
              currentPlan={isPlanActive("starter")}
              processingPayment={processingPayment}
            />
            
            <PricingCard
              title="Pro"
              price={annual ? "10π" : "12π"}
              features={proFeatures}
              isPopular={true}
              ctaText={isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => handleSubscribe("Pro")}
              currentPlan={isPlanActive("pro")}
              processingPayment={processingPayment}
            />
            
            <PricingCard
              title="Premium"
              price={annual ? "15π" : "18π"}
              features={premiumFeatures}
              ctaText={isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => handleSubscribe("Premium")}
              currentPlan={isPlanActive("premium")}
              processingPayment={processingPayment}
            />
          </div>
          
          {/* Show another ad in the middle for Starter users */}
          {showAds && (
            <div className="my-16">
              <PiAdsNetwork placementId="pricing-middle" />
            </div>
          )}
          
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
                <h3 className="font-bold text-lg">What happens when I cancel my subscription?</h3>
                <p className="text-gray-600 mt-2">
                  If you cancel your subscription, you'll keep premium access until the end of your current billing period. After that, your account will revert to the free tier features. Please note there are no refunds for canceled subscriptions.
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
          
          {/* Show another ad at the bottom for Starter users */}
          {showAds && (
            <div className="mt-16">
              <PiAdsNetwork placementId="pricing-bottom" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

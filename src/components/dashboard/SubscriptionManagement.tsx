
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, CalendarCheck } from "lucide-react";

interface SubscriptionManagementProps {
  subscription: any;
  handleSubscribe: (plan: string) => Promise<void>;
  processingPayment: boolean;
  setConfirmCancelOpen: (open: boolean) => void;
}

const SubscriptionManagement = ({ 
  subscription, 
  handleSubscribe, 
  processingPayment,
  setConfirmCancelOpen 
}: SubscriptionManagementProps) => {
  const [isYearly, setIsYearly] = useState(true);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>
          Manage your current plan and billing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Current Plan</h3>
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-bold text-primary">
                  {subscription 
                    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) 
                    : "Free"}
                </span>
                {subscription && (
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <CalendarCheck className="h-4 w-4 mr-1" />
                    Renews on {formatDate(subscription.expires_at)}
                  </p>
                )}
              </div>
              {subscription && (
                <Button 
                  variant="outline" 
                  className="mt-3 md:mt-0"
                  onClick={() => setConfirmCancelOpen(true)}
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          </div>
          
          {!subscription && (
            <div>
              <h3 className="text-lg font-medium mb-4">Choose a Plan</h3>
              
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      isYearly ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Annual (Save 20%)
                  </button>
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      !isYearly ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SubscriptionPlanCard 
                  title="Starter"
                  price={isYearly ? "6π" : "8π"}
                  billingPeriod={isYearly ? "Billed annually (72π)" : "Billed monthly (8π)"}
                  features={[
                    "Unlimited Links",
                    "Pi Payments",
                    "Basic Analytics"
                  ]}
                  isPopular={false}
                  handleSubscribe={() => handleSubscribe("Starter")}
                  processingPayment={processingPayment}
                />
                
                <SubscriptionPlanCard 
                  title="Pro"
                  price={isYearly ? "10π" : "12π"}
                  billingPeriod={isYearly ? "Billed annually (120π)" : "Billed monthly (12π)"}
                  features={[
                    "Everything in Starter",
                    "Custom Themes",
                    "Performance Analytics"
                  ]}
                  isPopular={true}
                  handleSubscribe={() => handleSubscribe("Pro")}
                  processingPayment={processingPayment}
                />
                
                <SubscriptionPlanCard 
                  title="Premium"
                  price={isYearly ? "15π" : "18π"}
                  billingPeriod={isYearly ? "Billed annually (180π)" : "Billed monthly (18π)"}
                  features={[
                    "Everything in Pro",
                    "Priority Support (4-Hour)",
                    "Advanced Pi Payments"
                  ]}
                  isPopular={false}
                  handleSubscribe={() => handleSubscribe("Premium")}
                  processingPayment={processingPayment}
                />
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2">Payment History</h3>
            {subscription ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span>Last payment</span>
                  <span>{subscription.amount} π</span>
                </div>
                <div className="text-sm text-gray-600">
                  {subscription.expires_at && (
                    <p>Next payment will be on {formatDate(subscription.expires_at)}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg text-center text-gray-500">
                No payment history available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SubscriptionPlanCardProps {
  title: string;
  price: string;
  billingPeriod: string;
  features: string[];
  isPopular: boolean;
  handleSubscribe: () => void;
  processingPayment: boolean;
}

const SubscriptionPlanCard = ({ 
  title, 
  price, 
  billingPeriod, 
  features,
  isPopular,
  handleSubscribe,
  processingPayment
}: SubscriptionPlanCardProps) => {
  return (
    <div className={`${isPopular ? 'border-2 border-primary' : 'border'} rounded-lg p-4 text-center ${isPopular ? 'relative' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-primary text-white text-sm rounded-full">
          Most Popular
        </div>
      )}
      <h4 className="font-bold text-primary text-xl mb-2">{title}</h4>
      <div className="text-3xl font-bold mb-1">
        {price}<span className="text-sm font-normal text-gray-500">/month</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        {billingPeriod}
      </p>
      <Button 
        className={`w-full mb-4 ${isPopular ? 'bg-gradient-hero hover:bg-secondary' : 'bg-primary hover:bg-primary/90'}`}
        onClick={handleSubscribe}
        disabled={processingPayment}
      >
        {processingPayment ? "Processing..." : "Subscribe"}
      </Button>
      <ul className="text-left text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start mb-2">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionManagement;

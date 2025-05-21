
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authenticateWithPi, createPiPayment } from "@/services/piPaymentService";
import { CheckIcon, XIcon, Calendar, CalendarCheck } from "lucide-react";
import { useUser } from "@/context/UserContext";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    user, 
    profile, 
    subscription, 
    isLoading, 
    isLoggedIn,
    refreshUserData,
    cancelSubscription
  } = useUser();
  
  const [isYearly, setIsYearly] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  
  // Analytics data (simulated)
  const [pageViews, setPageViews] = useState(0);
  const [linkClicks, setLinkClicks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    if (isLoggedIn && profile) {
      // Simulate analytics data
      const randomViews = Math.floor(Math.random() * 1000) + 100;
      const randomClicks = Math.floor(randomViews * (Math.random() * 0.7 + 0.1));
      const randomRate = +(randomClicks / randomViews * 100).toFixed(1);
      
      setPageViews(randomViews);
      setLinkClicks(randomClicks);
      setConversionRate(randomRate);
    }
  }, [isLoading, isLoggedIn, profile, navigate]);
  
  const handlePiLogin = async () => {
    try {
      const auth = await authenticateWithPi(["username", "payments"]);
      if (auth) {
        refreshUserData();
        
        toast({
          title: "Logged in successfully",
          description: `Welcome, ${auth.user.username || "User"}!`,
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
  
  const handleSubscribe = async (plan: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe",
        variant: "destructive", 
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Calculate amount based on plan and billing cycle
      let amount = 0;
      if (plan === "Starter") {
        amount = isYearly ? 6 : 8;
      } else if (plan === "Pro") {
        amount = isYearly ? 10 : 12;
      } else if (plan === "Premium") {
        amount = isYearly ? 15 : 18;
      }
      
      // Create payment through Pi Network
      const paymentData = {
        amount,
        memo: `${plan} Plan Subscription (${isYearly ? 'Annual' : 'Monthly'})`,
        metadata: {
          isSubscription: true,
          plan: plan.toLowerCase(),
          duration: isYearly ? 'annual' : 'monthly'
        }
      };
      
      await createPiPayment(paymentData, user);
      
      // The payment flow will be handled by callbacks in piPaymentService
      toast({
        title: "Payment Processing",
        description: "Follow the Pi payment flow to complete your subscription",
      });
      
      // After a successful payment, refresh user data to get updated subscription
      setTimeout(() => {
        refreshUserData();
      }, 5000);
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
  
  const handleCancelSubscriptionConfirm = async () => {
    const success = await cancelSubscription();
    if (success) {
      setConfirmCancelOpen(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-primary">Loading dashboard...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {isLoggedIn && profile ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                  <p className="text-gray-600">Welcome back, @{profile.username || "user"}</p>
                </div>
                
                {subscription && (
                  <div className="mt-4 md:mt-0 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-primary">
                        {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {subscription.expires_at && (
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Renews {formatDate(subscription.expires_at)}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="links">My Links</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Page Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{pageViews}</div>
                        <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Link Clicks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{linkClicks}</div>
                        <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{conversionRate}%</div>
                        <p className="text-xs text-gray-500 mt-1">Clicks per view</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <Button className="bg-primary hover:bg-primary/90">
                          Add New Link
                        </Button>
                        <Button variant="outline">
                          Edit Profile
                        </Button>
                        <Button variant="outline" onClick={() => navigate(`/u/${profile.username}`)}>
                          View My Page
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Plan: {subscription ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) : "Free"}</CardTitle>
                        <CardDescription>
                          {subscription ? (
                            <span>Your subscription renews on {formatDate(subscription.expires_at)}</span>
                          ) : (
                            "You are currently using the free version."
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {!subscription && (
                          <div className="text-sm mb-4">
                            <p>Upgrade to access premium features like:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              <li>Custom themes</li>
                              <li>Analytics</li>
                              <li>Pi payments</li>
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        {subscription ? (
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setConfirmCancelOpen(true)}
                          >
                            Manage Subscription
                          </Button>
                        ) : (
                          <Link to="/pricing" className="w-full">
                            <Button className="w-full bg-gradient-hero hover:bg-secondary">
                              Upgrade Now
                            </Button>
                          </Link>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="links">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Links</CardTitle>
                      <CardDescription>
                        Manage and organize all your links in one place
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <h3 className="text-lg font-medium mb-2">No links yet</h3>
                        <p className="text-gray-600 mb-4">Start by adding your first link below</p>
                        <Button className="bg-primary hover:bg-primary/90">
                          Add Your First Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics & Insights</CardTitle>
                      <CardDescription>
                        {subscription && (subscription.plan === "pro" || subscription.plan === "premium")
                          ? "Track detailed performance metrics of your page and links" 
                          : "Upgrade to Pro or Premium to access detailed analytics"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {subscription && (subscription.plan === "pro" || subscription.plan === "premium") ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h3 className="font-medium text-primary mb-1">Top Referrers</h3>
                              <ol className="list-decimal pl-5 text-sm">
                                <li>Direct visits</li>
                                <li>Instagram</li>
                                <li>Pi Browser</li>
                              </ol>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h3 className="font-medium text-primary mb-1">Visitors by Device</h3>
                              <ol className="list-decimal pl-5 text-sm">
                                <li>Mobile (78%)</li>
                                <li>Desktop (18%)</li>
                                <li>Tablet (4%)</li>
                              </ol>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h3 className="font-medium text-primary mb-1">Top Locations</h3>
                              <ol className="list-decimal pl-5 text-sm">
                                <li>United States</li>
                                <li>United Kingdom</li>
                                <li>Germany</li>
                              </ol>
                            </div>
                          </div>
                          
                          <div className="border border-blue-200 p-6 rounded-lg flex justify-center items-center">
                            <div className="text-center">
                              <p className="text-gray-500 mb-2">Detailed charts and reports available soon!</p>
                              <Button variant="outline">Export Report</Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                          <h3 className="font-medium mb-2">Premium Feature</h3>
                          <p className="text-gray-600 mb-4">Detailed analytics are available on Pro and Premium plans</p>
                          <Link to="/pricing">
                            <Button className="bg-gradient-hero hover:bg-secondary">
                              Upgrade Now
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="subscription">
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
                              <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold text-primary text-xl mb-2">Starter</h4>
                                <div className="text-3xl font-bold mb-1">
                                  {isYearly ? "6π" : "8π"}<span className="text-sm font-normal text-gray-500">/month</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">
                                  {isYearly ? "Billed annually (72π)" : "Billed monthly (8π)"}
                                </p>
                                <Button 
                                  className="w-full mb-4 bg-primary hover:bg-primary/90"
                                  onClick={() => handleSubscribe("Starter")}
                                  disabled={processingPayment}
                                >
                                  {processingPayment ? "Processing..." : "Subscribe"}
                                </Button>
                                <ul className="text-left text-sm">
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Unlimited Links</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Pi Payments</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Basic Analytics</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="border-2 border-primary rounded-lg p-4 text-center relative">
                                <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-primary text-white text-sm rounded-full">
                                  Most Popular
                                </div>
                                <h4 className="font-bold text-primary text-xl mb-2">Pro</h4>
                                <div className="text-3xl font-bold mb-1">
                                  {isYearly ? "10π" : "12π"}<span className="text-sm font-normal text-gray-500">/month</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">
                                  {isYearly ? "Billed annually (120π)" : "Billed monthly (12π)"}
                                </p>
                                <Button 
                                  className="w-full mb-4 bg-gradient-hero hover:bg-secondary"
                                  onClick={() => handleSubscribe("Pro")}
                                  disabled={processingPayment}
                                >
                                  {processingPayment ? "Processing..." : "Subscribe"}
                                </Button>
                                <ul className="text-left text-sm">
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Everything in Starter</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Custom Themes</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Performance Analytics</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold text-primary text-xl mb-2">Premium</h4>
                                <div className="text-3xl font-bold mb-1">
                                  {isYearly ? "15π" : "18π"}<span className="text-sm font-normal text-gray-500">/month</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">
                                  {isYearly ? "Billed annually (180π)" : "Billed monthly (18π)"}
                                </p>
                                <Button 
                                  className="w-full mb-4 bg-primary hover:bg-primary/90"
                                  onClick={() => handleSubscribe("Premium")}
                                  disabled={processingPayment}
                                >
                                  {processingPayment ? "Processing..." : "Subscribe"}
                                </Button>
                                <ul className="text-left text-sm">
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Everything in Pro</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Priority Support (4-Hour)</span>
                                  </li>
                                  <li className="flex items-start mb-2">
                                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Advanced Pi Payments</span>
                                  </li>
                                </ul>
                              </div>
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
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Please Log In to Access Your Dashboard</h2>
              <Button onClick={handlePiLogin} className="bg-gradient-hero hover:bg-secondary">
                Sign in with Pi Network
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                New to Droplink? <Link to="/signup" className="text-primary underline">Create an account</Link>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Confirmation Dialog for Subscription Cancellation */}
      <ConfirmationDialog
        open={confirmCancelOpen}
        onOpenChange={setConfirmCancelOpen}
        title="Cancel Subscription?"
        description="Are you sure you want to cancel your subscription? You won't be refunded for the current billing period and will need to subscribe again to regain premium access in the future."
        confirmText="Yes, Cancel Subscription"
        cancelText="No, Keep Subscription"
        onConfirm={handleCancelSubscriptionConfirm}
        variant="destructive"
      />
    </div>
  );
};

export default Dashboard;

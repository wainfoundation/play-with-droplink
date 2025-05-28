
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, Star, Zap, Crown, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Complete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const plan = searchParams.get("freeEntryPoint") ? "Free" :
              searchParams.get("basicEntryPoint") ? "Starter" :
              searchParams.get("proEntryPoint") ? "Pro" : "Premium";

  const planIcons = {
    "Free": <Star className="w-5 h-5" />,
    "Starter": <Zap className="w-5 h-5" />,
    "Pro": <Crown className="w-5 h-5" />,
    "Premium": <Shield className="w-5 h-5" />
  };

  const planColors = {
    "Free": "from-gray-500 to-gray-600",
    "Starter": "from-blue-500 to-blue-600", 
    "Pro": "from-purple-500 to-purple-600",
    "Premium": "from-yellow-500 to-orange-500"
  };

  const handleContinueBuilding = () => {
    navigate("/dashboard");
  };

  const handleViewProfile = () => {
    navigate("/@username"); // Replace with actual username
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Setup Complete - Droplink</title>
      </Helmet>
      
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl mb-2">🎉 You're All Set!</CardTitle>
            <p className="text-gray-600 text-lg">Your Droplink profile is ready to share with the world</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Profile Preview Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" />
                Your Profile is Live
              </h3>
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <div>
                  <p className="font-medium">droplink.space/@username</p>
                  <p className="text-sm text-gray-500">Your public profile URL</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewProfile}>
                  View Profile
                </Button>
              </div>
            </div>
            
            {/* Plan Info Card */}
            <div className={`bg-gradient-to-r ${planColors[plan as keyof typeof planColors]} rounded-xl p-6 text-white`}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                {planIcons[plan as keyof typeof planIcons]}
                {plan} Plan Active
              </h3>
              <p className="text-white/90 mb-4">
                {plan === "Free" && "You're on our free plan with 1 link. Upgrade anytime for unlimited links and more features."}
                {plan === "Starter" && "Perfect! You have unlimited links, .pi domain access, and Pi tips enabled."}
                {plan === "Pro" && "Excellent choice! You can now sell digital products and access advanced analytics."}
                {plan === "Premium" && "Amazing! You have access to all features including custom CSS and API access."}
              </p>
              <Button variant="secondary" size="sm" onClick={() => navigate("/pricing")}>
                {plan === "Free" ? "Upgrade Plan" : "Manage Subscription"}
              </Button>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">🚀 What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Customize Your Profile</p>
                    <p className="text-sm text-gray-600">Add more links, change themes, upload a better photo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Share Your Profile</p>
                    <p className="text-sm text-gray-600">Start sharing your link on social media and bio sections</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Connect Pi Network</p>
                    <p className="text-sm text-gray-600">Enable Pi tips and get your .pi domain</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Check Analytics</p>
                    <p className="text-sm text-gray-600">Track clicks and optimize your profile performance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleContinueBuilding} 
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 text-lg py-3"
                size="lg"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleViewProfile}
                className="flex-1 text-lg py-3"
                size="lg"
              >
                View My Profile
              </Button>
            </div>
            
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-500 mb-2">
                Welcome to the Pi Network creator community! 🎉
              </p>
              <p className="text-xs text-gray-400">
                Need help? Visit our help center or contact support anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Complete;

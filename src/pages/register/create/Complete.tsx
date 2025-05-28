import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Complete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get plan from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const userPlan = urlParams.get('freeEntryPoint') ? 'free' : 
                   urlParams.get('basicEntryPoint') ? 'starter' : 
                   urlParams.get('proEntryPoint') ? 'pro' : 
                   urlParams.get('premiumEntryPoint') ? 'premium' : 'free';

  const handleContinueBuilding = () => {
    // Navigate to admin dashboard instead of regular dashboard
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Setup Complete - Droplink</title>
      </Helmet>
      
      <div className="max-w-5xl w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-4">
              <CheckCircle className="w-8 h-8 mr-2 inline-block align-middle text-green-500" />
              Setup Complete!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Your Droplink profile is now live! Start sharing your link everywhere.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Next Steps:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Customize your profile in the dashboard</li>
                <li>Add more links and platforms</li>
                <li>Explore premium features</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleContinueBuilding}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full"
              size="lg"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Complete;

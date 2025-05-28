
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Complete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const plan = searchParams.get("freeEntryPoint") ? "Free" :
              searchParams.get("basicEntryPoint") ? "Basic" :
              searchParams.get("proEntryPoint") ? "Pro" : "Premium";

  const handleContinueBuilding = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Setup Complete - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Looking good!</CardTitle>
          <p className="text-gray-600">Your Droplink is off to a great start. Continue building to make it even better.</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Your Profile Preview</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">droplink.space/@username</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Selected Plan: {plan}</h3>
            <p className="text-sm text-gray-600">
              You can upgrade or change your plan anytime from your dashboard.
            </p>
          </div>
          
          <Button onClick={handleContinueBuilding} className="w-full" size="lg">
            Continue Building
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Welcome to the Pi Network creator community! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Complete;

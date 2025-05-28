
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const YourInformation = () => {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState<string>("");

  const intents = [
    {
      id: "creator",
      title: "Creator",
      description: "Monetize audience",
      icon: <User className="w-6 h-6" />
    },
    {
      id: "business", 
      title: "Business",
      description: "Reach more customers",
      icon: <Building className="w-6 h-6" />
    },
    {
      id: "personal",
      title: "Personal", 
      description: "Share links with friends",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  const handleContinue = () => {
    if (selectedIntent) {
      navigate("/register/select-categories");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Your Goals - Droplink</title>
      </Helmet>
      
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Which best describes your goal for using Droplink?</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {intents.map((intent) => (
            <div
              key={intent.id}
              onClick={() => setSelectedIntent(intent.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedIntent === intent.id 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                {intent.icon}
                <div>
                  <h3 className="font-medium">{intent.title}</h3>
                  <p className="text-sm text-gray-600">{intent.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={handleContinue}
            disabled={!selectedIntent}
            className="w-full mt-6"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourInformation;

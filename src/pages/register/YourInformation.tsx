
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

const YourInformation = () => {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState<string>("");

  const intents = [
    {
      id: "creator",
      title: "Creator",
      description: "Monetize audience & build community",
      icon: <User className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "business", 
      title: "Business",
      description: "Reach more customers & sell products",
      icon: <Building className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "personal",
      title: "Personal", 
      description: "Share links with friends & family",
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const handleContinue = () => {
    if (selectedIntent) {
      navigate("/register/select-categories");
    }
  };

  // Generate preview data based on selected intent
  const getPreviewData = () => {
    const intentData = {
      creator: {
        title: "Creative Pro",
        bio: "🎨 Content Creator | 📱 Digital Artist | 🌟 Follow my creative journey",
        username: "creativeuser"
      },
      business: {
        title: "Business Name",
        bio: "💼 Professional Services | 🚀 Growing Business | 📈 Let's connect",
        username: "mybusiness"
      },
      personal: {
        title: "Your Name",
        bio: "😊 Sharing my interests | 🌟 Personal links | 💬 Let's be friends",
        username: "yourname"
      }
    };

    return selectedIntent ? intentData[selectedIntent as keyof typeof intentData] : undefined;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Your Goals - Droplink</title>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Form Section */}
        <Card className="w-full max-w-lg mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What's your main goal with Droplink?</CardTitle>
            <p className="text-gray-600">This helps us customize your experience</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {intents.map((intent) => (
              <div
                key={intent.id}
                onClick={() => setSelectedIntent(intent.id)}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                  selectedIntent === intent.id 
                    ? "border-primary bg-gradient-to-r from-primary/10 to-blue-500/10 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${intent.color} text-white`}>
                    {intent.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{intent.title}</h3>
                    <p className="text-sm text-gray-600">{intent.description}</p>
                  </div>
                  {selectedIntent === intent.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedIntent}
              className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600"
            >
              Continue
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview Section */}
        <div className="flex justify-center">
          <DemoPreview profileData={getPreviewData()} />
        </div>
      </div>
    </div>
  );
};

export default YourInformation;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import DemoPreview from "@/components/DemoPreview";

const SelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const templates = [
    { 
      id: "modern", 
      name: "Modern Gradient", 
      preview: "🎨",
      description: "Clean gradients with modern spacing",
      popular: true
    },
    { 
      id: "minimal", 
      name: "Minimal Clean", 
      preview: "⚪",
      description: "Simple and elegant design",
      popular: false
    },
    { 
      id: "creative", 
      name: "Creative Bold", 
      preview: "🌈",
      description: "Vibrant colors and animations",
      popular: false
    },
    { 
      id: "business", 
      name: "Professional", 
      preview: "💼",
      description: "Corporate and trustworthy",
      popular: false
    },
    { 
      id: "social", 
      name: "Social Media", 
      preview: "📱",
      description: "Perfect for influencers",
      popular: true
    },
    { 
      id: "portfolio", 
      name: "Creative Portfolio", 
      preview: "🖼️",
      description: "Showcase your work beautifully",
      popular: false
    }
  ];

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate("/register/create/select-platforms");
    }
  };

  const getPreviewData = () => {
    return {
      title: "Your Name",
      bio: "🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey",
      username: "username",
      selectedTemplate: selectedTemplate
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Choose Template - Droplink</title>
      </Helmet>
      
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-gray-600">Select from 100+ professionally designed templates to match your style</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Template Selection */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`cursor-pointer transition-all transform hover:scale-105 relative ${
                    selectedTemplate === template.id 
                      ? "border-primary border-2 shadow-lg" 
                      : "border-gray-200 hover:shadow-md"
                  }`}
                >
                  {template.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-primary">
                      Popular
                    </Badge>
                  )}
                  
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{template.preview}</div>
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-500">{template.description}</p>
                    
                    {selectedTemplate === template.id && (
                      <div className="mt-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-gray-600">
                You can customize colors, fonts, and layouts after setup. Templates are just starting points!
              </p>
            </div>
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="w-full bg-gradient-to-r from-primary to-blue-600"
              size="lg"
            >
              Continue with {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : "Template"}
            </Button>
          </div>

          {/* Live Preview Section */}
          <div className="flex justify-center">
            <DemoPreview profileData={getPreviewData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;

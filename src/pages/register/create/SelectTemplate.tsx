
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const SelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const templates = [
    { id: "modern", name: "Modern", preview: "🎨" },
    { id: "minimal", name: "Minimal", preview: "⚪" },
    { id: "creative", name: "Creative", preview: "🌈" },
    { id: "business", name: "Business", preview: "💼" },
    { id: "social", name: "Social", preview: "📱" },
    { id: "portfolio", name: "Portfolio", preview: "🖼️" }
  ];

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate("/register/create/select-platforms");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Choose Template - Droplink</title>
      </Helmet>
      
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-gray-600">Select from 100+ professionally designed templates</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? "border-primary shadow-lg scale-105" 
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">{template.preview}</div>
                <h3 className="font-medium">{template.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={handleContinue}
            disabled={!selectedTemplate}
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;

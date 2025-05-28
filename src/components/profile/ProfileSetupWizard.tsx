
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Upload, Globe, Palette, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ProfileSetupWizardProps {
  onComplete: () => void;
}

const ProfileSetupWizard = ({ onComplete }: ProfileSetupWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    username: "",
    piDomain: "",
    template: "blue-gradient"
  });
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Basic Info", icon: <LinkIcon className="w-5 h-5" /> },
    { id: 2, title: "Customize", icon: <Palette className="w-5 h-5" /> },
    { id: 3, title: "Pi Domain", icon: <Globe className="w-5 h-5" /> },
    { id: 4, title: "Complete", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const templates = [
    { id: "blue-gradient", name: "Ocean Blue", colors: ["#00aaff", "#00d4ff"] },
    { id: "purple-gradient", name: "Purple Dreams", colors: ["#5433ff", "#20bdff"] },
    { id: "orange-gradient", name: "Sunset", colors: ["#ff7e5f", "#feb47b"] },
    { id: "green-gradient", name: "Forest", colors: ["#48c6ef", "#6f86d6"] }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup
      toast({
        title: "Profile Setup Complete!",
        description: "Your Droplink profile is ready to go.",
      });
      onComplete();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Your full name"
                value={profileData.displayName}
                onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                id="username"
                placeholder="username"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">This will be your profile URL: droplink.gg/username</p>
            </div>
            
            <div>
              <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell people about yourself and what you do..."
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="mt-2 h-24"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-4 block">Choose Your Template</Label>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                      profileData.template === template.id 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setProfileData({ ...profileData, template: template.id })}
                  >
                    <div 
                      className="h-24 rounded-t-lg"
                      style={{
                        background: `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
                      }}
                    />
                    <div className="p-3 text-center">
                      <p className="text-sm font-medium">{template.name}</p>
                    </div>
                    {profileData.template === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">Upload Profile Picture</h4>
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
              <p className="text-xs text-gray-500 mt-2">Recommended: 400x400px, PNG or JPG</p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="piDomain" className="text-sm font-medium">Pi Domain (Optional)</Label>
              <Input
                id="piDomain"
                placeholder="your-pi-domain"
                value={profileData.piDomain}
                onChange={(e) => setProfileData({ ...profileData, piDomain: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Custom Pi Network domain for your profile</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <h4 className="font-medium mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Pi Network Integration Benefits
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Custom Pi domain (yourname.pi)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Receive Pi payments & tips
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Pi Ad Network integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Verified Pi Network member badge
                </li>
              </ul>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Profile Setup Complete!</h3>
              <p className="text-gray-600">
                Your Droplink profile is ready. You can now start adding links and customizing your page.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-medium mb-3">What's Next?</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                  Add your social media links
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                  Set up Pi payment receiving
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                  Choose your subscription plan
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                  Share your profile with the world
                </li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center gap-2 ${
                  currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.icon}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <CardTitle className="text-2xl">
            {steps.find(s => s.id === currentStep)?.title} Setup
          </CardTitle>
          <Badge variant="outline" className="mx-auto">
            Step {currentStep} of {steps.length}
          </Badge>
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6"
            >
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              className="px-6 bg-gradient-hero hover:bg-secondary"
            >
              {currentStep === 4 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetupWizard;

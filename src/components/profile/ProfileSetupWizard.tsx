
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import SetupProgressIndicator from "./setup/SetupProgressIndicator";
import BasicInfoStep from "./setup/BasicInfoStep";
import CustomizeStep from "./setup/CustomizeStep";
import PiDomainStep from "./setup/PiDomainStep";
import CompleteStep from "./setup/CompleteStep";

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
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Customize" },
    { id: 3, title: "Pi Domain" },
    { id: 4, title: "Complete" }
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
          <BasicInfoStep 
            profileData={profileData}
            setProfileData={setProfileData}
          />
        );
      
      case 2:
        return (
          <CustomizeStep 
            selectedTemplate={profileData.template}
            onTemplateSelect={(templateId) => setProfileData({ ...profileData, template: templateId })}
          />
        );
      
      case 3:
        return (
          <PiDomainStep 
            piDomain={profileData.piDomain}
            setPiDomain={(domain) => setProfileData({ ...profileData, piDomain: domain })}
          />
        );
      
      case 4:
        return <CompleteStep />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <SetupProgressIndicator currentStep={currentStep} />
          
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

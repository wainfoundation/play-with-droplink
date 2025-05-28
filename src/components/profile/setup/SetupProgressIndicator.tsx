
import React from "react";
import { CheckCircle, ArrowRight, Upload, Globe, Palette, Link as LinkIcon } from "lucide-react";

interface SetupProgressIndicatorProps {
  currentStep: number;
}

const SetupProgressIndicator = ({ currentStep }: SetupProgressIndicatorProps) => {
  const steps = [
    { id: 1, title: "Basic Info", icon: <LinkIcon className="w-5 h-5" /> },
    { id: 2, title: "Customize", icon: <Palette className="w-5 h-5" /> },
    { id: 3, title: "Pi Domain", icon: <Globe className="w-5 h-5" /> },
    { id: 4, title: "Complete", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  return (
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
  );
};

export default SetupProgressIndicator;

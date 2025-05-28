
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const CompleteStep = () => {
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
};

export default CompleteStep;

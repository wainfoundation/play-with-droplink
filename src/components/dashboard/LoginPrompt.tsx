
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface LoginPromptProps {
  handlePiLogin: () => Promise<void>;
}

const LoginPrompt = ({ handlePiLogin }: LoginPromptProps) => {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-lg p-8 mx-4">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          🔧 Development Mode Active
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          Full access granted for development and testing. No authentication required.
        </p>
      </div>
      
      <div className="space-y-6">
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
          size="lg"
        >
          Continue to Dashboard
        </Button>
        
        <p className="text-sm text-gray-500 leading-relaxed">
          🚀 Ready for development with premium features enabled
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;

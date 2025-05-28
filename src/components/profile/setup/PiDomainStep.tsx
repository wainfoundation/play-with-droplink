
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Globe } from "lucide-react";

interface PiDomainStepProps {
  piDomain: string;
  setPiDomain: (domain: string) => void;
}

const PiDomainStep = ({ piDomain, setPiDomain }: PiDomainStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="piDomain" className="text-sm font-medium">Pi Domain (Optional)</Label>
        <Input
          id="piDomain"
          placeholder="your-pi-domain"
          value={piDomain}
          onChange={(e) => setPiDomain(e.target.value)}
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
};

export default PiDomainStep;

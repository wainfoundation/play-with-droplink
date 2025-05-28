
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Check } from "lucide-react";

interface LockedFeatureCardProps {
  title: string;
  description: string;
  requiredPlan: string;
  features?: string[];
  onUpgrade?: () => void;
}

const LockedFeatureCard = ({ 
  title, 
  description, 
  requiredPlan, 
  features = [
    "Enhanced functionality",
    "Advanced features",
    "Priority support",
    "Detailed analytics"
  ],
  onUpgrade 
}: LockedFeatureCardProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-gray-600">{description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 border">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Available in {requiredPlan} Plan
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Upgrade to {requiredPlan} to unlock this feature and more
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={onUpgrade || (() => window.location.href = '/pricing')}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to {requiredPlan}
              </Button>
              
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LockedFeatureCard;

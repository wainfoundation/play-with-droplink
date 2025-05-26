
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap, AlertTriangle } from "lucide-react";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useNavigate } from "react-router-dom";

interface FreePlanLimitationsProps {
  feature?: string;
  showUpgradeButton?: boolean;
}

const FreePlanLimitations = ({ feature, showUpgradeButton = true }: FreePlanLimitationsProps) => {
  const { plan, limits } = useUserPlan();
  const navigate = useNavigate();

  if (plan !== 'free') {
    return null; // Don't show for paid plans
  }

  const limitationMessages = [
    "Limited to 1 basic template only",
    "Droplink badge required (upgrade to remove)",
    "No .pi domain connection",
    "No custom themes or animations", 
    "No QR code generation",
    "Community support only",
    "Basic analytics only"
  ];

  return (
    <Alert className="border-amber-200 bg-amber-50 mb-6">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="space-y-3">
        <div className="flex items-start gap-2">
          <Lock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800 mb-2">
              {feature ? `${feature} requires a paid plan` : "Free Plan Limitations"}
            </p>
            <ul className="text-sm text-amber-700 space-y-1">
              {limitationMessages.map((message, index) => (
                <li key={index}>• {message}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {showUpgradeButton && (
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button 
              onClick={() => navigate('/pricing')}
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              <Crown className="w-3 h-3 mr-1" />
              Upgrade Now (Starting 6π/month)
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate('/features')}
            >
              <Zap className="w-3 h-3 mr-1" />
              View All Features
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default FreePlanLimitations;

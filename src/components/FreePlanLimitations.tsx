
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap, AlertTriangle, Ban, Wifi } from "lucide-react";
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
    "⚠️ Only 1 link allowed (upgrade for unlimited)",
    "🎨 Limited to 1 basic template only",
    "🏷️ Droplink badge required (cannot be removed)",
    "🚫 No .pi domain integration available",
    "📊 No analytics or performance insights",
    "💰 Cannot withdraw Pi tips (view only)",
    "🎯 No custom themes or animations", 
    "📱 No QR code generation",
    "🎪 Pi Ad Network displays (helps support free users)",
    "💬 Community support only"
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
            <div className="text-sm text-amber-700 space-y-1 mb-3">
              {limitationMessages.map((message, index) => (
                <div key={index} className="flex items-start gap-1">
                  <span className="text-xs">•</span>
                  <span>{message}</span>
                </div>
              ))}
            </div>
            
            {/* Special callout for Pi domain restriction */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Ban className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-red-800">Pi Domain Integration Blocked</span>
              </div>
              <p className="text-sm text-red-700">
                Free accounts cannot connect .pi domains. Upgrade to Starter (10π/month) to unlock Pi Network integration.
              </p>
            </div>
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
              Upgrade Now (Starting 10π/month)
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


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Globe, Crown } from "lucide-react";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useNavigate } from "react-router-dom";

interface PiDomainRestrictionProps {
  onUpgradeClick?: () => void;
}

const PiDomainRestriction = ({ onUpgradeClick }: PiDomainRestrictionProps) => {
  const { plan, limits } = useUserPlan();
  const navigate = useNavigate();

  if (limits.hasPiDomain) {
    return null; // Don't show restriction if user has access
  }

  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Lock className="w-5 h-5" />
          .pi Domain Access Restricted
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Globe className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-amber-800 font-medium">
              Connect your .pi domain and unlock professional branding
            </p>
            <p className="text-sm text-amber-700">
              .pi domain connection is available for Starter, Pro, and Premium subscribers. 
              Stand out with your personalized Pi Network domain!
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/70 rounded-lg p-3 border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-1">
              <Crown className="w-4 h-4" />
              What you'll get with .pi domain:
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Professional yourname.pi web address</li>
              <li>• Enhanced credibility in Pi Network</li>
              <li>• Better SEO and discoverability</li>
              <li>• Custom branding opportunities</li>
              <li>• Seamless Pi Network integration</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleUpgradeClick}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="sm"
          >
            Upgrade to Connect .pi Domain
          </Button>
        </div>
        
        <p className="text-xs text-amber-600 text-center">
          Starting from just 10π/month with Starter plan
        </p>
      </CardContent>
    </Card>
  );
};

export default PiDomainRestriction;

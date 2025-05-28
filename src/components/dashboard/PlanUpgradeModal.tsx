
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock, Zap, Star } from "lucide-react";

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  currentPlan: string;
}

const PlanUpgradeModal = ({ isOpen, onClose, feature, currentPlan }: PlanUpgradeModalProps) => {
  const navigate = useNavigate();

  const featureRequirements: Record<string, { plan: string; description: string }> = {
    'product_sales': { plan: 'Pro', description: 'Sell digital products with Pi payments' },
    'analytics': { plan: 'Starter', description: 'Track your audience and performance' },
    'seo_tools': { plan: 'Pro', description: 'Optimize your profile for search engines' },
    'scheduling': { plan: 'Pro', description: 'Schedule your links and content' },
    'team_access': { plan: 'Premium', description: 'Collaborate with your team' },
    'social_planner': { plan: 'Premium', description: 'Plan and schedule social content' },
    'instagram_reply': { plan: 'Premium', description: 'Automated Instagram responses' },
    'link_shortener': { plan: 'Pro', description: 'Create branded short links' },
    'custom_css': { plan: 'Premium', description: 'Fully customize your profile design' }
  };

  const requirement = feature ? featureRequirements[feature] : null;

  const handleUpgrade = () => {
    navigate("/pricing");
    onClose();
  };

  const planIcons = {
    'Starter': <Zap className="w-5 h-5" />,
    'Pro': <Crown className="w-5 h-5" />,
    'Premium': <Star className="w-5 h-5" />
  };

  const planColors = {
    'Starter': 'from-blue-500 to-blue-600',
    'Pro': 'from-purple-500 to-purple-600',
    'Premium': 'from-yellow-500 to-orange-500'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <DialogTitle>Feature Locked</DialogTitle>
          </div>
          <DialogDescription>
            {requirement ? (
              <>
                <strong>{requirement.description}</strong> requires the{" "}
                <Badge className={`bg-gradient-to-r ${planColors[requirement.plan as keyof typeof planColors]} text-white`}>
                  {planIcons[requirement.plan as keyof typeof planIcons]}
                  {requirement.plan}
                </Badge>{" "}
                plan or higher.
              </>
            ) : (
              "This feature requires a premium plan to access."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Why upgrade?</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Unlock advanced features and tools</li>
              <li>• Increase your earning potential with Pi</li>
              <li>• Get priority support and updates</li>
              <li>• Remove platform limitations</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={handleUpgrade} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanUpgradeModal;

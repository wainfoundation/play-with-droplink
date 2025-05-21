
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const UpgradeModal = ({ isOpen, onClose, featureName = "this feature" }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate('/pricing');
    onClose();
  };

  const handleViewPlansClick = () => {
    navigate('/pricing');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-amber-100 rounded-full p-3 mb-4 text-amber-600">
            <Lock className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl">Unlock Premium Features</DialogTitle>
          <DialogDescription className="pt-2 text-center">
            🔒 {featureName} is only available on Starter (8π/mo), Pro, or Premium plans. 
            Upgrade now to unlock your full link-in-bio potential.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-center">
          <Button 
            onClick={handleUpgradeClick} 
            className="w-full sm:w-auto bg-gradient-hero hover:bg-secondary"
          >
            Upgrade Now
          </Button>
          <Button 
            variant="outline" 
            onClick={handleViewPlansClick}
            className="w-full sm:w-auto"
          >
            View Plans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;

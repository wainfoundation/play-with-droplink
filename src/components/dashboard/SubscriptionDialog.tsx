
import { useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";

interface SubscriptionDialogProps {
  confirmCancelOpen: boolean;
  setConfirmCancelOpen: (open: boolean) => void;
  handleCancelSubscriptionConfirm: () => Promise<void>;
}

const SubscriptionDialog = ({ 
  confirmCancelOpen, 
  setConfirmCancelOpen, 
  handleCancelSubscriptionConfirm 
}: SubscriptionDialogProps) => {
  return (
    <ConfirmationDialog
      open={confirmCancelOpen}
      onOpenChange={setConfirmCancelOpen}
      title="Cancel Subscription?"
      description="Are you sure you want to cancel your subscription? You won't be refunded for the current billing period and will need to subscribe again to regain premium access in the future."
      confirmText="Yes, Cancel Subscription"
      cancelText="No, Keep Subscription"
      onConfirm={handleCancelSubscriptionConfirm}
      variant="destructive"
    />
  );
};

export default SubscriptionDialog;

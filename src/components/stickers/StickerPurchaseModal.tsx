
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Sticker {
  id: string;
  name: string;
  description: string;
  animation_url: string;
  price_pi: number;
  category: string;
}

interface StickerPurchaseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sticker: Sticker;
  onSuccess: () => void;
}

const StickerPurchaseModal = ({ isOpen, onOpenChange, sticker, onSuccess }: StickerPurchaseModalProps) => {
  const [processing, setProcessing] = useState(false);
  const { user } = useUser();

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase stickers",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Simulate Pi Network payment processing
      // In a real implementation, this would integrate with Pi SDK
      const paymentId = `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const transactionId = `tx-${Date.now()}`;

      // Record the purchase in user_stickers table
      const { error } = await supabase
        .from('user_stickers')
        .insert({
          user_id: user.id,
          sticker_id: sticker.id,
          pi_payment_id: paymentId,
          pi_transaction_id: transactionId,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Owned",
            description: "You already own this sticker!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Purchase Successful!",
        description: `You've unlocked the ${sticker.name} sticker!`,
      });

      onSuccess();
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Sticker</DialogTitle>
          <DialogDescription>
            Unlock this animated sticker for your profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sticker Preview */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
              <img
                src={sticker.animation_url}
                alt={sticker.name}
                className="w-16 h-16 object-contain animate-pulse"
              />
            </div>
            <h3 className="text-lg font-semibold">{sticker.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{sticker.description}</p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {sticker.category}
            </Badge>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price:</span>
              <div className="flex items-center gap-1">
                <span className="text-2xl">π</span>
                <span className="text-xl font-bold text-primary">{sticker.price_pi}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={processing}
              className="flex-1"
            >
              {processing ? "Processing..." : `Buy for ${sticker.price_pi}π`}
            </Button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500 text-center">
            This is a one-time purchase. Once unlocked, you can use this sticker on your profile forever.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StickerPurchaseModal;

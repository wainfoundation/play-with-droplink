
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface StickerPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickerId: string;
  stickerName: string;
  price: number;
}

const StickerPurchaseModal = ({ 
  isOpen, 
  onClose, 
  stickerId, 
  stickerName, 
  price 
}: StickerPurchaseModalProps) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      // TODO: Implement sticker purchase when user_stickers table is available
      toast({
        title: "Feature Coming Soon",
        description: "Sticker purchases will be available soon!",
      });
      onClose();
    } catch (error) {
      console.error('Error purchasing sticker:', error);
      toast({
        title: "Purchase Failed",
        description: "Could not complete sticker purchase",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Sticker</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p>Purchase "{stickerName}" for π{price}?</p>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={loading}>
              {loading ? 'Processing...' : `Purchase for π${price}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StickerPurchaseModal;

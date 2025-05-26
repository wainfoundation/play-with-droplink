
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, Mail, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DigitalProduct } from "@/hooks/useDigitalProducts";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment } from "@/utils/pi-sdk";
import type { PiPaymentData, PaymentCallbacks } from "@/utils/pi-types";

interface PurchaseModalProps {
  product: DigitalProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseModal = ({ product, open, onOpenChange }: PurchaseModalProps) => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { user } = useUser();
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!product || !user) return;

    setIsProcessing(true);
    try {
      // Create order first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          buyer_id: user.id,
          seller_id: product.user_id,
          product_id: product.id,
          amount: product.price,
          currency: "Pi",
          status: "pending",
          buyer_email: buyerEmail || undefined,
          max_downloads: product.max_downloads || 3,
          access_token: crypto.randomUUID()
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create Pi payment
      const paymentData: PiPaymentData = {
        amount: product.price,
        memo: `Purchase: ${product.title}`,
        metadata: {
          type: 'product_purchase',
          orderId: order.id,
          productId: product.id,
          productTitle: product.title
        }
      };

      const callbacks: PaymentCallbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log("Payment ready for approval:", paymentId);
          await supabase
            .from('orders')
            .update({ pi_payment_id: paymentId })
            .eq('id', order.id);
        },
        
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log("Payment completed:", paymentId, txid);
          
          // Calculate download expiry
          const expiryHours = product.download_expires_hours || 168; // 7 days default
          const expiresAt = new Date(Date.now() + (expiryHours * 60 * 60 * 1000));
          
          // Complete the order
          await supabase
            .from('orders')
            .update({ 
              status: 'completed',
              pi_transaction_id: txid,
              download_expires_at: expiresAt.toISOString()
            })
            .eq('id', order.id);

          // Update product download count
          await supabase
            .from('digital_products')
            .update({ download_count: product.download_count + 1 })
            .eq('id', product.id);

          // Generate secure download URL
          const downloadUrl = `${window.location.origin}/api/secure-download?order_id=${order.id}&token=${order.access_token}`;
          setDownloadUrl(downloadUrl);

          toast({
            title: "Purchase Successful! 🎉",
            description: "Your download link is ready. You can download the product up to 3 times.",
          });
        },
        
        onCancel: async (paymentId: string) => {
          console.log("Payment cancelled:", paymentId);
          await supabase
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', order.id);
          
          toast({
            title: "Purchase Cancelled",
            description: "Your payment was cancelled.",
            variant: "destructive",
          });
        },
        
        onError: async (error: Error) => {
          console.error("Payment error:", error);
          await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', order.id);

          toast({
            title: "Payment Failed",
            description: error.message || "There was an error processing your payment.",
            variant: "destructive",
          });
        },
      };

      await createPiPayment(paymentData, callbacks);

    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Failed to initiate purchase",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = product?.title || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetModal = () => {
    setBuyerEmail("");
    setDownloadUrl(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Purchase Product
          </DialogTitle>
        </DialogHeader>

        {downloadUrl ? (
          // Download ready state
          <div className="space-y-4">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                Your purchase is complete! Download your product below.
              </AlertDescription>
            </Alert>
            
            <div className="text-center space-y-4">
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download {product.title}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                You can download this product up to {product.max_downloads || 3} times within{" "}
                {Math.floor((product.download_expires_hours || 168) / 24)} days.
              </p>
            </div>
          </div>
        ) : (
          // Purchase form
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center gap-1 mt-2 text-lg font-bold text-primary">
                <span>{product.price}</span>
                <span className="text-sm">π</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyer-email">
                <Mail className="h-4 w-4 inline mr-1" />
                Email (optional)
              </Label>
              <Input
                id="buyer-email"
                type="email"
                placeholder="your@email.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll send your download link to this email as backup
              </p>
            </div>

            <Alert>
              <AlertDescription>
                You'll be redirected to Pi Network to complete the payment using your Pi wallet.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button 
                onClick={handlePurchase} 
                disabled={isProcessing || !user}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay {product.price}π
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>

            {!user && (
              <Alert>
                <AlertDescription>
                  Please log in with Pi Network to purchase products.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pi, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createPiPayment } from "@/services/piPaymentService";
import { useUser } from "@/context/UserContext";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface DonationButtonProps {
  recipientId: string;
  recipientName: string;
  suggestedAmount?: number;
  className?: string;
}

const DonationButton = ({
  recipientId,
  recipientName,
  suggestedAmount = 1,
  className = ""
}: DonationButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const isPiBrowser = isRunningInPiBrowser();

  const handleDonation = async () => {
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "Please open this app in Pi Browser to send Pi donations",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please connect with Pi Network to send donations",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      
      const paymentData = {
        amount: suggestedAmount,
        memo: `Tip for ${recipientName} on Droplink`,
        metadata: {
          type: 'tip',
          recipientId,
          recipientName
        }
      };

      await createPiPayment(paymentData, user);
      
      toast({
        title: "Donation Sent!",
        description: `You've sent ${suggestedAmount} Pi to ${recipientName}`,
      });
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "Donation Failed",
        description: "Unable to process Pi donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isPiBrowser) {
    return (
      <Button 
        variant="outline" 
        disabled
        className={`flex items-center gap-2 ${className}`}
        onClick={() => window.open('https://minepi.com/download', '_blank')}
      >
        <Pi className="h-4 w-4" />
        Open in Pi Browser to Tip
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleDonation}
      disabled={isProcessing}
      className={`flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 ${className}`}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Processing...
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          <Pi className="h-4 w-4" />
          Tip {suggestedAmount} π
        </>
      )}
    </Button>
  );
};

export default DonationButton;

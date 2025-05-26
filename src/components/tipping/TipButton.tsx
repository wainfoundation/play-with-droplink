
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pi, Heart } from "lucide-react";
import { usePiTipping } from "@/hooks/usePiTipping";
import TipDialog from "./TipDialog";

interface TipButtonProps {
  recipientId: string;
  recipientUsername: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

const TipButton = ({ 
  recipientId, 
  recipientUsername, 
  className = "",
  variant = "default",
  size = "default"
}: TipButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const { sendTip, isProcessing } = usePiTipping();

  const handleTipSubmit = async (amount: number, message: string) => {
    const success = await sendTip({
      recipientId,
      recipientUsername,
      amount,
      message
    });

    if (success) {
      setShowDialog(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        variant={variant}
        size={size}
        className={`${className} bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0`}
        disabled={isProcessing}
      >
        <Pi className="w-4 h-4 mr-2" />
        <Heart className="w-3 h-3 mr-1" />
        Tip
      </Button>

      <TipDialog
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        recipientUsername={recipientUsername}
        onSubmit={handleTipSubmit}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default TipButton;

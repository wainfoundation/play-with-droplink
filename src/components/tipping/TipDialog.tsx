
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Pi, Heart } from "lucide-react";

interface TipDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recipientUsername: string;
  onSubmit: (amount: number, message: string) => void;
  isProcessing: boolean;
}

const TipDialog = ({
  isOpen,
  onOpenChange,
  recipientUsername,
  onSubmit,
  isProcessing,
}: TipDialogProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleSubmit = () => {
    if (amount > 0) {
      onSubmit(amount, message);
    }
  };

  const predefinedAmounts = [1, 5, 10, 25, 50];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pi className="h-5 w-5 text-yellow-500" />
            <Heart className="h-4 w-4 text-red-500" />
            Tip @{recipientUsername}
          </DialogTitle>
          <DialogDescription>
            Send Pi cryptocurrency as a tip to support @{recipientUsername}. 
            Your tip will be transferred directly through the Pi Network.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (Pi)
            </label>
            <Input
              id="amount"
              type="number"
              min="0.1"
              step="0.1"
              value={amount}
              onChange={handleAmountChange}
              disabled={isProcessing}
              className="text-lg"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedAmounts.map((presetAmount) => (
                <Badge
                  key={presetAmount}
                  variant="outline"
                  className="cursor-pointer hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                  onClick={() => setAmount(presetAmount)}
                >
                  {presetAmount} Pi
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (optional)
            </label>
            <Textarea
              id="message"
              placeholder="Add a personal message with your tip..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isProcessing}
              maxLength={200}
            />
            <p className="text-xs text-gray-500">{message.length}/200 characters</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Tips are processed through Pi Network's secure payment system. 
              You'll be redirected to complete the payment in Pi Browser.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={amount <= 0 || isProcessing}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Pi className="mr-2 h-4 w-4" />
                Send {amount} Pi
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TipDialog;

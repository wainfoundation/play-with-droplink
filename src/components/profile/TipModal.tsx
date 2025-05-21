
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
import { Loader2, Pi } from "lucide-react";

interface TipModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  onSubmit: (amount: number, message: string) => void;
  isProcessing: boolean;
}

const TipModal = ({
  isOpen,
  onOpenChange,
  username,
  onSubmit,
  isProcessing,
}: TipModalProps) => {
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

  const predefinedAmounts = [1, 5, 10, 25];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pi className="h-5 w-5" /> Tip @{username}
          </DialogTitle>
          <DialogDescription>
            Support {username} with Pi cryptocurrency. The funds will be transferred directly to their wallet.
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
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedAmounts.map((presetAmount) => (
                <Badge
                  key={presetAmount}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
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
              placeholder="Add a message with your tip..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={amount <= 0 || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Send {amount} Pi</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TipModal;

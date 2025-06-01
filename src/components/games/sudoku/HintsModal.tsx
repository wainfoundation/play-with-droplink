
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Pi, Zap } from 'lucide-react';
import RewardedAdButton from '@/components/RewardedAdButton';

interface HintsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchAd: () => void;
  onPayPi: () => void;
  isLoading: boolean;
}

const HintsModal: React.FC<HintsModalProps> = ({
  isOpen,
  onClose,
  onWatchAd,
  onPayPi,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Out of Hints!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            You need more hints to continue playing. Choose an option below:
          </p>
          
          <div className="space-y-3">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Watch Ad</h3>
                    <p className="text-sm text-green-600">Get 3 hints for free</p>
                  </div>
                  <RewardedAdButton
                    reward={{ type: "credits", amount: 3, description: "3 Sudoku hints" }}
                    onAdComplete={onWatchAd}
                    onAdError={(error) => console.error('Ad error:', error)}
                    buttonText="Watch Ad"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-orange-800">Pay with Pi</h3>
                    <p className="text-sm text-orange-600">Get 3 hints instantly</p>
                  </div>
                  <Button
                    onClick={onPayPi}
                    disabled={isLoading}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Pi className="w-4 h-4 mr-2" />
                    1 Pi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="ghost" onClick={onClose} className="text-gray-500">
              Cancel (Exit Game)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HintsModal;

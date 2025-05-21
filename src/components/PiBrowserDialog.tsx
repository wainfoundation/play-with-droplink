
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface PiBrowserDialogProps {
  title?: string;
  description?: string;
  redirectUrl?: string;
  showOnMount?: boolean;
  onClose?: () => void;
}

const PiBrowserDialog = ({
  title = "Please Use Pi Browser",
  description = "Please open this app in the Pi Browser to continue using Droplink.",
  redirectUrl = "https://pinet.com/@droplink",
  showOnMount = true,
  onClose
}: PiBrowserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Directly check Pi Browser status on each render to ensure it's current
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    console.log("PiBrowserDialog - isPiBrowser:", isPiBrowser, "showOnMount:", showOnMount);
    // Only show dialog if not in Pi Browser and showOnMount is true
    if (!isPiBrowser && showOnMount) {
      console.log("Opening Pi Browser dialog");
      setIsOpen(true);
    }
    
    // Listen for custom event to open dialog
    const handleOpenDialog = () => {
      console.log("Custom event received: open-pi-browser-dialog");
      if (!isPiBrowser) {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('open-pi-browser-dialog', handleOpenDialog);
    
    return () => {
      window.removeEventListener('open-pi-browser-dialog', handleOpenDialog);
    };
  }, [isPiBrowser, showOnMount]);

  const handleClose = () => {
    console.log("Closing Pi Browser dialog");
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const redirectToPiBrowser = () => {
    console.log("Redirecting to:", redirectUrl);
    window.location.href = redirectUrl;
  };

  // Debug check
  console.log("PiBrowserDialog rendering - isPiBrowser:", isPiBrowser, "isOpen:", isOpen);

  // Don't render anything if in Pi Browser
  if (isPiBrowser) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          <img 
            src="/placeholder.svg" 
            alt="Pi Browser Logo" 
            className="w-16 h-16 mb-4"
            style={{ filter: "hue-rotate(140deg)" }}
          />
          <p className="text-sm text-muted-foreground text-center">
            Get the best experience with full access to all Pi features
          </p>
        </div>
        
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button 
            onClick={redirectToPiBrowser}
            className="w-full sm:w-auto bg-gradient-hero hover:bg-secondary"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Pi Browser
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Continue anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PiBrowserDialog;


import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomStickerCreator from "./CustomStickerCreator";

interface CustomStickerDialogProps {
  onStickerCreated: () => void;
}

const CustomStickerDialog = ({ onStickerCreated }: CustomStickerDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStickerCreated = () => {
    onStickerCreated();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Sticker
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Custom Sticker</DialogTitle>
        </DialogHeader>
        <CustomStickerCreator
          onClose={() => setIsOpen(false)}
          onStickerCreated={handleStickerCreated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomStickerDialog;

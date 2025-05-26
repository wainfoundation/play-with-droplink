
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StickerGrid from "./StickerGrid";

interface UserSticker {
  id: string;
  sticker_id: string;
  stickers_effects: {
    id: string;
    name: string;
    animation_url: string;
    category: string;
  };
}

interface StickerManagementDialogProps {
  userStickers: UserSticker[];
  selectedStickers: string[];
  loading: boolean;
  onToggleSticker: (stickerId: string) => void;
  onClearAll: () => void;
  onSaveChanges: () => void;
}

const StickerManagementDialog = ({
  userStickers,
  selectedStickers,
  loading,
  onToggleSticker,
  onClearAll,
  onSaveChanges
}: StickerManagementDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4">
          <Settings className="h-4 w-4 mr-2" />
          Manage Stickers
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Profile Stickers</DialogTitle>
          <DialogDescription>
            Choose which stickers to display on your profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <StickerGrid
            userStickers={userStickers}
            selectedStickers={selectedStickers}
            onToggleSticker={onToggleSticker}
            loading={loading}
          />

          {userStickers.length > 0 && (
            <>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={onClearAll}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button onClick={onSaveChanges} className="flex-1">
                  Save Changes
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Selected stickers will appear on your profile. You can select multiple stickers.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StickerManagementDialog;

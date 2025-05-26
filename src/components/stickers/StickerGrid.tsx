
import React from "react";
import { Badge } from "@/components/ui/badge";

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

interface StickerGridProps {
  userStickers: UserSticker[];
  selectedStickers: string[];
  onToggleSticker: (stickerId: string) => void;
  loading: boolean;
}

const StickerGrid = ({ userStickers, selectedStickers, onToggleSticker, loading }: StickerGridProps) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (userStickers.length === 0) {
    return (
      <p className="text-center text-gray-500 py-4">
        You don't have any stickers yet. Visit the Stickers page to purchase some!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto">
      {userStickers.map((userSticker) => (
        <div
          key={userSticker.id}
          className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
            selectedStickers.includes(userSticker.sticker_id)
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onToggleSticker(userSticker.sticker_id)}
        >
          <div className="text-center">
            <img
              src={userSticker.stickers_effects.animation_url}
              alt={userSticker.stickers_effects.name}
              className="w-8 h-8 object-contain mx-auto mb-1 animate-pulse"
            />
            <p className="text-xs font-medium truncate">
              {userSticker.stickers_effects.name}
            </p>
            <Badge variant="secondary" className="text-xs mt-1">
              {userSticker.stickers_effects.category}
            </Badge>
          </div>
          {selectedStickers.includes(userSticker.sticker_id) && (
            <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StickerGrid;


import React from "react";
import AnimatedSticker from "./AnimatedSticker";

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

interface StickerDisplayProps {
  stickers: UserSticker[];
}

const StickerDisplay = ({ stickers }: StickerDisplayProps) => {
  if (stickers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {stickers.map((userSticker) => (
        <div
          key={userSticker.id}
          className="relative group"
        >
          <AnimatedSticker
            src={userSticker.stickers_effects.animation_url}
            alt={userSticker.stickers_effects.name}
            className="w-8 h-8 object-contain hover:animate-bounce cursor-pointer"
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
        </div>
      ))}
    </div>
  );
};

export default StickerDisplay;

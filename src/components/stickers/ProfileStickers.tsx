
import React from "react";
import StickerDisplay from "./StickerDisplay";
import StickerManagementDialog from "./StickerManagementDialog";
import { useProfileStickers } from "@/hooks/useProfileStickers";

interface ProfileStickersProps {
  userId: string;
  activeStickers?: string[];
  isOwnProfile?: boolean;
}

const ProfileStickers = ({ userId, activeStickers = [], isOwnProfile = false }: ProfileStickersProps) => {
  const {
    userStickers,
    selectedStickers,
    loading,
    displayStickers,
    toggleSticker,
    saveChanges,
    clearAll
  } = useProfileStickers(userId, activeStickers);

  if (!isOwnProfile && displayStickers.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Display Active Stickers */}
      <StickerDisplay stickers={displayStickers} />

      {/* Sticker Management for Own Profile */}
      {isOwnProfile && userStickers.length > 0 && (
        <StickerManagementDialog
          userStickers={userStickers}
          selectedStickers={selectedStickers}
          loading={loading}
          onToggleSticker={toggleSticker}
          onClearAll={clearAll}
          onSaveChanges={saveChanges}
        />
      )}
    </div>
  );
};

export default ProfileStickers;

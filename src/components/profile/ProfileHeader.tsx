
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2, QrCode } from "lucide-react";
import ActiveStickers from "./ActiveStickers";

interface ProfileHeaderProps {
  username: string;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  activeStickerIds?: string[];
  onShareClick: () => void;
  onQrCodeClick: () => void;
}

const ProfileHeader = ({
  username,
  displayName,
  bio,
  avatarUrl,
  activeStickerIds = [],
  onShareClick,
  onQrCodeClick,
}: ProfileHeaderProps) => {
  const fallbackName = displayName || username;

  return (
    <div className="text-center mb-8 relative">
      <div className="relative inline-block mb-4">
        <Avatar className="w-24 h-24 mx-auto relative">
          <AvatarImage 
            src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`} 
            alt={fallbackName}
          />
          <AvatarFallback className="text-2xl">
            {fallbackName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Active stickers overlay */}
        <ActiveStickers 
          activeStickerIds={activeStickerIds}
          className="absolute inset-0 w-24 h-24"
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">
        {displayName || `@${username}`}
      </h1>
      
      {bio && (
        <p className="text-gray-600 mb-4 max-w-sm mx-auto">
          {bio}
        </p>
      )}
      
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onShareClick}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onQrCodeClick}
          className="flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          QR Code
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;


import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2, QrCode } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  onShareClick: () => void;
  onQrCodeClick: () => void;
}

const ProfileHeader = ({
  username,
  displayName,
  bio,
  avatarUrl,
  onShareClick,
  onQrCodeClick
}: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Cover background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-hero rounded-t-xl -mx-8"></div>
      
      {/* Profile content with proper spacing */}
      <Avatar className="w-24 h-24 mt-20 border-4 border-white z-10 shadow-md">
        <AvatarImage 
          src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
          alt={`${username}'s profile`} 
        />
        <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <h1 className="text-2xl font-bold mt-4 mb-1">
        {displayName || `@${username}`}
      </h1>
      <p className="text-gray-500 mb-2">@{username}</p>
      <p className="text-gray-700 text-center mb-6">{bio || "Digital creator & Pi pioneer"}</p>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 hover:bg-muted/50 transition-colors"
          onClick={onShareClick}
        >
          <Share2 className="w-4 h-4" /> Share
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 hover:bg-muted/50 transition-colors"
          onClick={onQrCodeClick}
        >
          <QrCode className="w-4 h-4" /> QR Code
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import TipButton from "@/components/tipping/TipButton";
import ProfileStickers from "@/components/stickers/ProfileStickers";
import ProfileHeader from "./ProfileHeader";
import ProfileQrCode from "./ProfileQrCode";
import LinksList from "./LinksList";
import TipModal from "./TipModal";
import RecentTips from "./RecentTips";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface PiLink {
  title: string;
  url: string;
}

interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  imported_pi_avatar?: string | null;
  imported_pi_bio?: string | null;
  imported_pi_links?: PiLink[] | null;
  pi_profile_last_synced?: string | null;
  active_sticker_ids?: string[] | null;
  links: Link[];
}

interface ProfileContentProps {
  profileData: ProfileData;
  onLinkClick: (link: Link) => void;
  onTipSubmit: (amount: number, message: string) => void;
  onShareProfile: () => void;
  processingTip: boolean;
}

const ProfileContent = ({
  profileData,
  onLinkClick,
  onTipSubmit,
  onShareProfile,
  processingTip
}: ProfileContentProps) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const { user, showAds } = useUser();
  const navigate = useNavigate();

  const profileUrl = `https://droplink.space/@${profileData.username}`;
  const displayAvatar = profileData.imported_pi_avatar || profileData.avatar_url;
  const displayBio = profileData.imported_pi_bio || profileData.bio || "Digital creator & Pi pioneer";
  const isOwnProfile = user?.id === profileData.id;

  const handleTipClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a tip",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setShowTipModal(true);
  };

  return (
    <>
      <Helmet>
        <title>{profileData.display_name || `@${profileData.username}`} | Droplink</title>
        <meta name="description" content={displayBio} />
        <meta property="og:title" content={`${profileData.display_name || `@${profileData.username}`} | Droplink`} />
        <meta property="og:description" content={displayBio} />
        <meta property="og:image" content={displayAvatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`} />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:type" content="profile" />
      </Helmet>
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ProfileHeader 
              username={profileData.username}
              displayName={profileData.display_name}
              bio={displayBio}
              avatarUrl={displayAvatar}
              onShareClick={onShareProfile}
              onQrCodeClick={() => setShowQRCode(!showQRCode)}
            />
            
            {/* Profile Stickers */}
            <ProfileStickers
              userId={profileData.id}
              activeStickers={profileData.active_sticker_ids || []}
              isOwnProfile={isOwnProfile}
            />
            
            {/* Pi Network Verification Badge */}
            {(profileData.imported_pi_avatar || profileData.imported_pi_bio || (profileData.imported_pi_links && profileData.imported_pi_links.length > 0)) && (
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  <span className="text-lg">π</span>
                  <span>Pi Network Verified</span>
                </div>
              </div>
            )}
            
            <ProfileQrCode 
              url={profileUrl}
              visible={showQRCode}
            />
            
            {/* Only show ads for starter plan users if they're logged in */}
            {showAds && (
              <div className="w-full mb-6">
                <PiAdsNetwork placementId="profile-page" />
              </div>
            )}
            
            {/* Add tip button before links */}
            {profileData.id && (
              <div className="mb-6">
                <TipButton
                  recipientId={profileData.id}
                  recipientUsername={profileData.username}
                  className="w-full"
                  size="lg"
                />
              </div>
            )}
            
            <LinksList 
              links={profileData.links}
              onLinkClick={onLinkClick}
              processingTip={processingTip}
              onTipClick={handleTipClick}
            />
            
            {/* Display recent tips if available */}
            {profileData.id && (
              <div className="mt-6">
                <RecentTips userId={profileData.id} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <TipModal
        isOpen={showTipModal}
        onOpenChange={setShowTipModal}
        username={profileData.username}
        onSubmit={onTipSubmit}
        isProcessing={processingTip}
      />
    </>
  );
};

export default ProfileContent;

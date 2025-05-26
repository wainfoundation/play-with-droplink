
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { processPayment } from "@/services/piPaymentService";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import TipButton from "@/components/tipping/TipButton";
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

interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  links: Link[];
  active_sticker_ids: string[];
}

interface ProfileContentProps {
  profileData: ProfileData;
  onLinkClick: (link: Link) => void;
}

const ProfileContent = ({ profileData, onLinkClick }: ProfileContentProps) => {
  const [processingTip, setProcessingTip] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  
  const { user, showAds } = useUser();
  const navigate = useNavigate();

  const handleTipSubmit = async (amount: number, message: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a tip",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setProcessingTip(true);
    
    try {
      const paymentData = {
        amount: amount,
        memo: message || `Tip to @${profileData?.username}`,
        metadata: {
          recipientId: profileData?.id,
          type: 'tip',
          message: message
        }
      };
      
      await processPayment(paymentData, user);
      
      toast({
        title: "Sending Tip",
        description: "Follow the Pi payment flow to complete your tip",
      });
      
      setShowTipModal(false);
    } catch (error) {
      console.error("Tip error:", error);
      toast({
        title: "Tip failed",
        description: "There was an error processing your tip",
        variant: "destructive",
      });
    } finally {
      setProcessingTip(false);
    }
  };

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

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData?.display_name || profileData?.username}'s Profile`,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile URL copied to clipboard",
      });
    }
  };

  const profileUrl = `https://droplink.space/@${profileData.username}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <ProfileHeader 
        username={profileData.username}
        displayName={profileData.display_name}
        bio={profileData.bio}
        avatarUrl={profileData.avatar_url}
        activeStickerIds={profileData.active_sticker_ids}
        onShareClick={handleShareProfile}
        onQrCodeClick={() => setShowQRCode(!showQRCode)}
      />
      
      <ProfileQrCode 
        url={profileUrl}
        visible={showQRCode}
      />
      
      {showAds && (
        <div className="w-full mb-6">
          <PiAdsNetwork placementId="profile-page" />
        </div>
      )}
      
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
      
      {profileData.id && (
        <div className="mt-6">
          <RecentTips userId={profileData.id} />
        </div>
      )}
      
      <TipModal
        isOpen={showTipModal}
        onOpenChange={setShowTipModal}
        username={profileData.username}
        onSubmit={handleTipSubmit}
        isProcessing={processingTip}
      />
    </div>
  );
};

export default ProfileContent;

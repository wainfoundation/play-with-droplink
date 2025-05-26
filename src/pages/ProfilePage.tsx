
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";
import ProfileContent from "@/components/profile/ProfileContent";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileActions } from "@/hooks/useProfileActions";

const ProfilePage = () => {
  const { username } = useParams();
  const { loading, error, profileData } = useProfileData(username);
  const {
    processingTip,
    handleLinkClick,
    handleTipSubmit,
    handleShareProfile
  } = useProfileActions(profileData?.id);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState username={username} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ProfileContent
        profileData={profileData}
        onLinkClick={handleLinkClick}
        onTipSubmit={(amount, message) => handleTipSubmit(amount, message, profileData.username)}
        onShareProfile={() => handleShareProfile(profileData.username)}
        processingTip={processingTip}
      />
      <Footer />
    </div>
  );
};

export default ProfilePage;

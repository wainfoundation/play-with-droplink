
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";
import ProfileContent from "@/components/profile/ProfileContent";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileActions } from "@/hooks/useProfileActions";
import GoToTop from '@/components/GoToTop';

const ProfilePage = () => {
  const { username } = useParams();
  const { profile, links, loading, error } = useProfileData(username);
  const {
    processingTip,
    handleLinkClick,
    handleTipSubmit,
    handleShareProfile
  } = useProfileActions(profile?.id);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profile) {
    return <ErrorState username={username} />;
  }

  // Create the profile data with required properties
  const profileData = {
    ...profile,
    bio: profile.bio || "Digital creator & Pi pioneer",
    avatar_url: profile.avatar_url || "/placeholder.svg",
    links: links || []
  };

  return (
    <>
      <Navbar />
      <ProfileContent
        profileData={profileData}
        onLinkClick={(link) => handleLinkClick(link.id, link.url)}
        onTipSubmit={(amount, message) => handleTipSubmit(amount, message, profileData.username)}
        onShareProfile={() => handleShareProfile(profileData.username)}
        processingTip={processingTip}
      />
      <Footer />
      <GoToTop />
    </>
  );
};

export default ProfilePage;

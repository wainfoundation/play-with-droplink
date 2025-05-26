
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";
import ProfileContent from "@/components/profile/ProfileContent";
import { useProfileData } from "@/hooks/useProfileData";

const ProfilePage = () => {
  const { loading, error, profileData, handleLinkClick } = useProfileData();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState username={profileData?.username} />;
  }

  const profileUrl = `https://droplink.space/@${profileData.username}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{profileData.display_name || `@${profileData.username}`} | Droplink</title>
        <meta name="description" content={profileData.bio || `Check out ${profileData.username}'s profile on Droplink`} />
        <meta property="og:title" content={`${profileData.display_name || `@${profileData.username}`} | Droplink`} />
        <meta property="og:description" content={profileData.bio || `Check out ${profileData.username}'s profile on Droplink`} />
        <meta property="og:image" content={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`} />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:type" content="profile" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-md mx-auto">
          <ProfileContent 
            profileData={profileData}
            onLinkClick={handleLinkClick}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

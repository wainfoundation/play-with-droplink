import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment } from "@/services/piPaymentService";
import { Helmet } from "react-helmet-async";

// Import refactored components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileQrCode from "@/components/profile/ProfileQrCode";
import LinksList from "@/components/profile/LinksList";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";
import TipModal from "@/components/profile/TipModal";
import RecentTips from "@/components/profile/RecentTips";

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
}

const ProfilePage = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [processingTip, setProcessingTip] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  
  const { user, showAds } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        if (!username) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();
        
        if (profileError || !profileData) {
          setError("User profile not found");
          setLoading(false);
          return;
        }
        
        // Fetch links data
        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        if (linksError) {
          console.error("Failed to fetch links:", linksError);
        }
        
        // Register page view in analytics
        if (profileData.id) {
          await supabase
            .from('analytics')
            .insert({
              user_id: profileData.id,
              page_view: true,
              referrer: document.referrer,
              user_agent: navigator.userAgent,
            })
            .select();
        }
        
        // Process links to categorize them
        const processedLinks = linksData ? linksData.map(link => {
          // Determine link type based on URL or position
          let type: "featured" | "social" | "regular" | undefined = undefined;
          
          // Check if it's a social link
          if (
            link.url.includes('instagram.com') ||
            link.url.includes('twitter.com') ||
            link.url.includes('facebook.com') ||
            link.url.includes('linkedin.com') ||
            link.url.includes('youtube.com') ||
            link.icon.toLowerCase() === 'instagram' ||
            link.icon.toLowerCase() === 'twitter' ||
            link.icon.toLowerCase() === 'facebook' ||
            link.icon.toLowerCase() === 'linkedin' ||
            link.icon.toLowerCase() === 'youtube'
          ) {
            type = "social";
          } 
          // First two links are featured by default
          else if (linksData.indexOf(link) < 2) {
            type = "featured";
          }
          // Everything else is regular
          else {
            type = "regular";
          }
          
          return { ...link, type };
        }) : [];
        
        // Default links if none found
        const defaultLinks = [
          { id: 'default-1', title: "Tip in Pi", url: "#tip-in-pi", icon: "💰", clicks: 0 },
        ];
        
        setProfileData({
          ...profileData,
          links: processedLinks && processedLinks.length > 0 ? processedLinks : defaultLinks,
        });
        
        setLoading(false);
        
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [username]);

  const handleLinkClick = async (link: Link) => {
    // Register link click in analytics
    if (profileData?.id) {
      try {
        // Update click count
        await supabase
          .from('links')
          .update({ clicks: link.clicks + 1 })
          .eq('id', link.id)
          .select();
        
        // Register analytics
        await supabase
          .from('analytics')
          .insert({
            user_id: profileData.id,
            link_id: link.id,
            link_click: true,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          })
          .select();
          
        // Open the URL
        window.open(link.url, '_blank');
      } catch (err) {
        console.error("Failed to register link click:", err);
      }
    }
  };

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
      // Create a tip payment
      const paymentData = {
        amount: amount,
        memo: message || `Tip to @${profileData?.username}`,
        metadata: {
          recipientId: profileData?.id,
          type: 'tip',
          message: message
        }
      };
      
      await createPiPayment(paymentData, user);
      
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
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile URL copied to clipboard",
      });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState username={username} />;
  }

  const profileUrl = `https://${window.location.host}/@${profileData.username}`;
  
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ProfileHeader 
              username={profileData.username}
              displayName={profileData.display_name}
              bio={profileData.bio}
              avatarUrl={profileData.avatar_url}
              onShareClick={handleShareProfile}
              onQrCodeClick={() => setShowQRCode(!showQRCode)}
            />
            
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
            
            <LinksList 
              links={profileData.links}
              onLinkClick={handleLinkClick}
              processingTip={processingTip}
              onTipClick={handleTipClick}
            />
            
            {/* Display recent tips if available - fix the prop name to match the component */}
            {profileData.id && (
              <div className="mt-6">
                <RecentTips userId={profileData.id} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
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

export default ProfilePage;

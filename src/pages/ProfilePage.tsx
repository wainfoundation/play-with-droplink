
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment } from "@/services/piPaymentService";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [processingTip, setProcessingTip] = useState(false);
  
  const { user, showAds } = useUser();

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
        
        // If no links found, use default links
        const defaultLinks = [
          { id: 'default-1', title: "Tip in Pi", url: "#tip-in-pi", icon: "💰", clicks: 0 },
        ];
        
        setProfileData({
          ...profileData,
          links: linksData && linksData.length > 0 ? linksData : defaultLinks,
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
        // Handle special links like "Tip in Pi"
        if (link.url === "#tip-in-pi") {
          handleTipInPi();
          return;
        }
        
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

  const handleTipInPi = async () => {
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
        amount: 1, // Default tip amount
        memo: `Tip to @${profileData?.username}`,
        metadata: {
          recipientId: profileData?.id,
          type: 'tip'
        }
      };
      
      await createPiPayment(paymentData, user);
      
      toast({
        title: "Sending Tip",
        description: "Follow the Pi payment flow to complete your tip",
      });
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-primary">Loading profile...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Profile not found</h2>
            <p className="text-gray-600 mb-6">The user @{username} doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")} variant="outline">
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img 
                  src={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">@{profileData.username}</h1>
              <p className="text-gray-500 mb-6">{profileData.bio || "Digital creator & Pi pioneer"}</p>
              
              {/* Only show ads for starter plan users if they're logged in */}
              {showAds && (
                <div className="w-full mb-6">
                  <PiAdsNetwork placementId="profile-page" />
                </div>
              )}
              
              <div className="w-full space-y-3">
                {profileData.links.map((link, index) => (
                  <button 
                    key={link.id || index} 
                    onClick={() => handleLinkClick(link)}
                    disabled={link.url === "#tip-in-pi" && processingTip}
                    className={index < 2 
                      ? "block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md" 
                      : "block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm"
                    }
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{link.icon}</span> 
                      {link.url === "#tip-in-pi" && processingTip ? "Processing..." : link.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUserPlan } from "@/hooks/use-user-plan";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{
    username: string;
    bio: string;
    links: Array<{ title: string; url: string; icon: string }>;
  } | null>(null);
  
  const { isLoggedIn, plan, showAds } = useUserPlan();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call to fetch user data
        // For now, we're simulating a successful profile retrieval
        // Use localStorage to check if the profile belongs to current user
        const currentUsername = localStorage.getItem('piUsername') || localStorage.getItem('username');
        
        // Simulate profile data (in a real app, this would come from backend)
        const mockProfileData = {
          username: username || "",
          bio: "Digital creator & Pi pioneer",
          links: [
            { title: "Tip in Pi", url: "#", icon: "💰" },
            { title: "Buy eBook", url: "#", icon: "📚" },
            { title: "YouTube Channel", url: "#", icon: "📺" },
            { title: "Twitter", url: "#", icon: "🐦" },
            { title: "Instagram", url: "#", icon: "📷" }
          ]
        };
        
        setTimeout(() => {
          setProfileData(mockProfileData);
          setLoading(false);
        }, 500); // Simulate network delay
        
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    
    if (username) {
      fetchUserProfile();
    } else {
      setError("User not found");
      setLoading(false);
    }
  }, [username]);

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
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-1">@{profileData.username}</h1>
              <p className="text-gray-500 mb-6">{profileData.bio}</p>
              
              {/* Only show ads for starter plan users if they're logged in */}
              {showAds && (
                <div className="w-full mb-6">
                  <PiAdsNetwork placementId="profile-page" />
                </div>
              )}
              
              <div className="w-full space-y-3">
                {profileData.links.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    className={index < 2 
                      ? "block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md" 
                      : "block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm"
                    }
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{link.icon}</span> {link.title}
                    </span>
                  </a>
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

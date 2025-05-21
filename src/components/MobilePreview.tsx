
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const MobilePreview = () => {
  const navigate = useNavigate();
  const { profile, isLoggedIn } = useUser();
  
  // Username from profile or demo username if not logged in
  const displayUsername = profile?.username || "username";
  
  const handleProfileClick = () => {
    if (isLoggedIn && profile) {
      navigate(`/u/${profile.username}`);
    } else {
      navigate('/signup');
    }
  };
  
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Your Droplink Profile</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          One elegant page to showcase your links, products, and Pi earnings.
        </p>
        
        <div className="max-w-xs mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-3 shadow-2xl">
          <div className="bg-white rounded-[32px] h-[540px] overflow-hidden relative">
            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img 
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${displayUsername}`}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-1">@{displayUsername}</h3>
              <p className="text-sm text-gray-500 mb-6">
                {profile?.bio || "Digital creator & Pi pioneer"}
              </p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={handleProfileClick}
                  className="block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>👤</span> {isLoggedIn ? "View Your Profile" : "Create Your Profile"}
                  </span>
                </button>
                <a href="#" className="block w-full bg-primary text-white font-medium py-3 px-4 rounded-lg transition-all hover:bg-secondary hover:scale-[1.02] shadow-md">
                  <span className="flex items-center justify-center gap-2">
                    <span>💰</span> Tip in Pi
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>📺</span> YouTube Channel
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>🐦</span> Twitter
                  </span>
                </a>
                <a href="#" className="block w-full bg-white text-primary border border-primary font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:scale-[1.02] shadow-sm">
                  <span className="flex items-center justify-center gap-2">
                    <span>📷</span> Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;

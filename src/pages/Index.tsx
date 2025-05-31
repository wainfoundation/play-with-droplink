
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { playSound, sounds } from "@/utils/sounds";
import TutorialSection from "@/components/home/TutorialSection";
import FeatureCards from "@/components/home/FeatureCards";
import PiNetworkBenefits from "@/components/home/PiNetworkBenefits";
import BackgroundAnimation from "@/components/home/BackgroundAnimation";
import HomeHeader from "@/components/home/HomeHeader";
import FloatingElements from "@/components/home/FloatingElements";

const Index = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (soundEnabled) {
      playSound(sounds.setupComplete, 0.3);
    }
  }, [soundEnabled]);

  const handleStartPlaying = () => {
    if (soundEnabled) {
      playSound(sounds.setupComplete, 0.4);
    }
    navigate("/play");
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <>
      <Helmet>
        <title>Droplink Gaming - Pi Network Game Platform</title>
        <meta name="description" content="Play 50+ interactive games on Pi Network. Earn Pi through ads, unlock premium content, and enjoy the ultimate gaming experience!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <BackgroundAnimation />

        <HomeHeader 
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            <TutorialSection 
              soundEnabled={soundEnabled}
              onStartPlaying={handleStartPlaying}
            />

            <FeatureCards />

            <PiNetworkBenefits />
          </div>
        </div>

        <FloatingElements 
          soundEnabled={soundEnabled}
          onStartPlaying={handleStartPlaying}
        />
      </div>
    </>
  );
};

export default Index;

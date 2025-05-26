
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Ensure the component stays mounted during the entire splash duration
    const timer = setTimeout(() => {
      if (isMounted) {
        setIsVisible(false);
        // Add a small delay before calling onComplete to ensure smooth transition
        setTimeout(() => {
          if (isMounted) {
            onComplete();
          }
        }, 100);
      }
    }, 2000); // Show splash for 2 seconds

    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, [onComplete, isMounted]);

  // Don't render anything if not visible (prevents DOM manipulation issues)
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center z-50">
      <div className="text-center space-y-8 px-4">
        <div className="relative">
          <img 
            src="/lovable-uploads/2c117775-cd88-4aec-819b-0723e4f0dbe5.png" 
            alt="Droplink Logo" 
            className="w-24 h-24 mx-auto animate-pulse"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Droplink
          </h1>
          <p className="text-xl text-blue-100">
            Drop All Your Links
          </p>
          <p className="text-lg text-blue-200">
            Pi Network Integration
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;


import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import SplashScreen from './components/SplashScreen.tsx'
import Welcome from './pages/Welcome.tsx'
import PlayWithMascot from './pages/PlayWithMascot.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import PiLogger from './utils/pi-logger'
import './index.css'

const Root = () => {
  const [currentPage, setCurrentPage] = useState<'splash' | 'welcome' | 'play'>('splash');
  
  const handleSplashComplete = () => {
    setCurrentPage('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentPage('play');
  };

  useEffect(() => {
    // Preload Pi SDK for better performance in Pi Browser
    try {
      preloadPiSDK();
      PiLogger.info('app_init', { environment: import.meta.env.MODE });
    } catch (error) {
      PiLogger.error('app_init_error', error);
    }
  }, []);
  
  return (
    <React.StrictMode>
      <HelmetProvider>
        {currentPage === 'splash' && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        {currentPage === 'welcome' && (
          <Welcome onEnter={handleWelcomeComplete} />
        )}
        {currentPage === 'play' && (
          <PlayWithMascot />
        )}
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);


import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import SplashScreen from './components/SplashScreen.tsx'
import Welcome from './pages/Welcome.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import PiLogger from './utils/pi-logger'

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Check if this is first visit
    const hasVisited = localStorage.getItem('droplink_visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('droplink_visited', 'true');
    }
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
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
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : showWelcome ? (
          <Welcome onEnter={handleWelcomeComplete} />
        ) : (
          <App />
        )}
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

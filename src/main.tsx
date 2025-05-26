
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import SplashScreen from './components/SplashScreen.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import PiLogger from './utils/pi-logger'

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  const handleSplashComplete = () => {
    // Use a state update that's more React-friendly
    setShowSplash(false);
    setIsReady(true);
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
        ) : isReady ? (
          <App />
        ) : null}
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);


import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import SplashScreen from './components/SplashScreen.tsx'

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  
  return (
    <React.StrictMode>
      <HelmetProvider>
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <App />
        )}
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

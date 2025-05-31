
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SplashScreen from './components/SplashScreen.tsx'
import Welcome from './pages/Welcome.tsx'
import App from './App.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import PiLogger from './utils/pi-logger'
import './index.css'

const queryClient = new QueryClient();

const Root = () => {
  const [currentPage, setCurrentPage] = useState<'splash' | 'welcome' | 'app'>('splash');
  
  const handleSplashComplete = () => {
    setCurrentPage('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentPage('app');
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
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Router>
            {currentPage === 'splash' && (
              <SplashScreen onComplete={handleSplashComplete} />
            )}
            {currentPage === 'welcome' && (
              <Welcome onEnter={handleWelcomeComplete} />
            )}
            {currentPage === 'app' && (
              <App />
            )}
          </Router>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

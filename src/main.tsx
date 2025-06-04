
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import { startMainTheme } from './utils/sounds'
import PiLogger from './utils/pi-logger'
import './index.css'

// Initialize Pi SDK and logging immediately
try {
  preloadPiSDK();
  PiLogger.info('app_init', { environment: import.meta.env.MODE });
  
  // Start background music immediately (will wait for user interaction)
  startMainTheme();
  
  // Also try to start after a short delay in case the first attempt fails
  setTimeout(() => {
    startMainTheme();
  }, 2000);
} catch (error) {
  PiLogger.error('app_init_error', error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

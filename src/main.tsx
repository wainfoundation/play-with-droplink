
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { preloadPiSDK } from './utils/pi-sdk-loader'
import PiLogger from './utils/pi-logger'
import './index.css'

const Root = () => {
  React.useEffect(() => {
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
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

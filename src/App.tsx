
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { HelmetProvider } from 'react-helmet-async';

import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import CharacterHome from "./pages/CharacterHome";

// Placeholder components for other pages
const ComingSoonPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
    <div className="text-center space-y-6 p-8">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-4xl font-bold text-primary">{pageName}</h1>
      <p className="text-xl text-gray-600 max-w-md">Coming Soon!</p>
      <p className="text-gray-500">We're working hard to bring you this feature.</p>
      <div className="space-y-2">
        <p className="text-sm text-gray-400">For now, enjoy your character experience:</p>
        <a 
          href="/character" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          🏠 Go to Character Home
        </a>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main gaming workflow */}
              <Route path="/" element={<Index />} />
              <Route path="/welcome" element={<Welcome onEnter={() => window.location.href = '/character'} />} />
              <Route path="/character" element={<CharacterHome />} />
              
              {/* Redirect common routes to character */}
              <Route path="/play" element={<Navigate to="/character" replace />} />
              <Route path="/dashboard" element={<Navigate to="/character" replace />} />
              <Route path="/games" element={<Navigate to="/character" replace />} />
              
              {/* Coming soon pages */}
              <Route path="/pricing" element={<ComingSoonPage pageName="Pricing Plans" />} />
              <Route path="/features" element={<ComingSoonPage pageName="Features" />} />
              <Route path="/about" element={<ComingSoonPage pageName="About Us" />} />
              <Route path="/contact" element={<ComingSoonPage pageName="Contact" />} />
              <Route path="/profile/*" element={<ComingSoonPage pageName="User Profiles" />} />
              <Route path="/register/*" element={<ComingSoonPage pageName="Registration" />} />
              <Route path="/login" element={<ComingSoonPage pageName="Login" />} />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

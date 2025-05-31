
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';

import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import PlayWithMascot from "./pages/PlayWithMascot";
import GameWorkflow from "./pages/GameWorkflow";

// Placeholder components for other pages
const ComingSoonPage = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
    <div className="text-center space-y-6 p-8">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-4xl font-bold text-primary">{pageName}</h1>
      <p className="text-xl text-gray-600 max-w-md">Coming Soon!</p>
      <p className="text-gray-500">We're working hard to bring you this feature.</p>
      <div className="space-y-2">
        <p className="text-sm text-gray-400">For now, enjoy our amazing games:</p>
        <a 
          href="/play" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          🎮 Play Games
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
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main gaming workflow */}
                <Route path="/" element={<Index />} />
                <Route path="/play" element={<PlayWithMascot />} />
                <Route path="/workflow" element={<GameWorkflow />} />
                
                {/* Redirect common routes to play */}
                <Route path="/dashboard" element={<Navigate to="/play" replace />} />
                <Route path="/games" element={<Navigate to="/play" replace />} />
                
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
        </UserProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

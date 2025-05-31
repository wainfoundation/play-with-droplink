
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';

import SplashScreen from "@/components/SplashScreen";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Playhouse from "./pages/Playhouse";
import GamePlay from "./pages/GamePlay";
import Monetization from "./pages/Monetization";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import MascotCare from "./pages/MascotCare";
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
          href="/welcome" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          🎮 Start Gaming
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
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/playhouse" element={<Playhouse />} />
                <Route path="/gameplay" element={<GamePlay />} />
                <Route path="/monetization" element={<Monetization />} />
                <Route path="/leaderboards" element={<Leaderboards />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mascot" element={<MascotCare />} />
                
                {/* Legacy routes for compatibility */}
                <Route path="/index" element={<Index />} />
                <Route path="/play" element={<PlayWithMascot />} />
                <Route path="/workflow" element={<GameWorkflow />} />
                
                {/* Game routes */}
                <Route path="/games/free" element={<Playhouse />} />
                <Route path="/games/premium" element={<Playhouse />} />
                <Route path="/games/paid" element={<Playhouse />} />
                <Route path="/rewards" element={<ComingSoonPage pageName="Rewards Center" />} />
                
                {/* Coming soon pages */}
                <Route path="/pricing" element={<ComingSoonPage pageName="Pricing Plans" />} />
                <Route path="/features" element={<ComingSoonPage pageName="Features" />} />
                <Route path="/about" element={<ComingSoonPage pageName="About Us" />} />
                <Route path="/contact" element={<ComingSoonPage pageName="Contact" />} />
                <Route path="/help" element={<ComingSoonPage pageName="Help Center" />} />
                <Route path="/community" element={<ComingSoonPage pageName="Community" />} />
                <Route path="/forums" element={<ComingSoonPage pageName="Forums" />} />
                <Route path="/register/*" element={<ComingSoonPage pageName="Registration" />} />
                
                {/* Catch all - redirect to welcome */}
                <Route path="*" element={<Navigate to="/welcome" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

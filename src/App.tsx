
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import Welcome from "@/pages/Welcome";
import Play from "@/pages/Play";
import Help from "@/pages/Help";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState<'splash' | 'welcome' | 'app'>('splash');
  
  const handleSplashComplete = () => {
    setCurrentPage('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentPage('app');
  };

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('selectedCharacter');
    if (hasCompletedOnboarding) {
      setCurrentPage('app');
    }
  }, []);

  if (currentPage === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentPage === 'welcome') {
    return <Welcome onEnter={handleWelcomeComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Play />} />
          <Route path="/play" element={<Play />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

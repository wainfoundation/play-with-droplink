
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import Welcome from "@/pages/Welcome";
import Play from "@/pages/Play";
import Help from "@/pages/Help";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import SudokuInfinite from "@/pages/games/SudokuInfinite";
import DroplinkRunner from "@/pages/games/DroplinkRunner";

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

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {currentPage === 'splash' && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        {currentPage === 'welcome' && (
          <Welcome onEnter={handleWelcomeComplete} />
        )}
        {currentPage === 'app' && (
          <Routes>
            <Route path="/" element={<Play />} />
            <Route path="/play" element={<Play />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Game Routes */}
            <Route path="/game/sudoku-infinite" element={<SudokuInfinite />} />
            <Route path="/game/droplink-runner" element={<DroplinkRunner />} />
            <Route path="/game/block-connect" element={<SudokuInfinite />} />
            <Route path="/game/word-puzzle" element={<SudokuInfinite />} />
            <Route path="/game/target-rush" element={<DroplinkRunner />} />
            <Route path="/game/quick-tap" element={<DroplinkRunner />} />
            <Route path="/game/pi-collector" element={<DroplinkRunner />} />
          </Routes>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;

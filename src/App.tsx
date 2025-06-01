
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
import SudokuClassic from "@/pages/games/SudokuClassic";
import DroplinkRunner from "@/pages/games/DroplinkRunner";
import BlockConnect from "@/pages/games/BlockConnect";
import WordPuzzle from "@/pages/games/WordPuzzle";
import TargetRush from "@/pages/games/TargetRush";
import QuickTap from "@/pages/games/QuickTap";
import PiCollector from "@/pages/games/PiCollector";
import { GameManagerProvider } from "@/components/games/GameManager";

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
      // Add a small delay to show splash briefly even for returning users
      setTimeout(() => {
        setCurrentPage('app');
      }, 1000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GameManagerProvider>
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
              <Route path="/game/sudoku-classic" element={<SudokuClassic />} />
              <Route path="/game/droplink-runner" element={<DroplinkRunner />} />
              <Route path="/game/block-connect" element={<BlockConnect />} />
              <Route path="/game/word-puzzle" element={<WordPuzzle />} />
              <Route path="/game/target-rush" element={<TargetRush />} />
              <Route path="/game/quick-tap" element={<QuickTap />} />
              <Route path="/game/pi-collector" element={<PiCollector />} />
            </Routes>
          )}
        </Router>
      </GameManagerProvider>
    </QueryClientProvider>
  );
}

export default App;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Enhanced9x9SudokuEngine from '@/components/games/engines/Enhanced9x9SudokuEngine';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SudokuClassic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character } = location.state || {};

  const handleGameComplete = (score: number) => {
    console.log('Sudoku Classic completed with score:', score);
  };

  const handleBack = () => {
    navigate('/play');
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/play')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sudoku Classic 9x9 | Droplink Games</title>
        <meta name="description" content="Master the classic 9x9 Sudoku puzzle with multiple difficulty levels!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-6xl">
          <Enhanced9x9SudokuEngine onBack={handleBack} onGameComplete={handleGameComplete} />
        </div>
      </div>
    </>
  );
};

export default SudokuClassic;

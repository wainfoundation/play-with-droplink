
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WordPuzzleEngine from '@/components/games/engines/WordPuzzleEngine';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const WordPuzzle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character } = location.state || {};

  const handleGameComplete = (score: number) => {
    console.log('Word Puzzle completed with score:', score);
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
        <title>Word Puzzle Master | Droplink Games</title>
        <meta name="description" content="Challenge your vocabulary and earn Pi rewards!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <WordPuzzleEngine onBack={handleBack} onGameComplete={handleGameComplete} />
        </div>
      </div>
    </>
  );
};

export default WordPuzzle;

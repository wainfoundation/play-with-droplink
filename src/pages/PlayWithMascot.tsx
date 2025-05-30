
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { 
  Home, 
  Gamepad2, 
  Brain, 
  MessageCircle, 
  Trophy,
  RefreshCw,
  Star,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PlayWithMascot = () => {
  const [currentGame, setCurrentGame] = useState('welcome');
  const [score, setScore] = useState(0);
  const [mascotMood, setMascotMood] = useState('happy');
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<any>({});

  // Word guessing game
  const words = ['DROPLINK', 'PINETWORK', 'CREATOR', 'PROFILE', 'SOCIAL', 'TIPPING'];
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  // Quiz questions
  const quizQuestions = [
    {
      question: "What network powers Droplink?",
      options: ["Bitcoin", "Pi Network", "Ethereum", "Solana"],
      correct: 1
    },
    {
      question: "What can you accept on Droplink?",
      options: ["Pi Tips", "Donations", "Payments", "All of the above"],
      correct: 3
    },
    {
      question: "What type of profiles can you create?",
      options: ["Professional", "Personal", "Business", "All of the above"],
      correct: 3
    }
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (currentGame === 'word-guess') {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setGuessedLetters([]);
      setWrongGuesses(0);
    }
  }, [currentGame]);

  const handleLetterGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);
      
      if (!currentWord.includes(letter)) {
        setWrongGuesses(prev => prev + 1);
        setMascotMood('sad');
        setTimeout(() => setMascotMood('happy'), 1000);
      } else {
        setMascotMood('excited');
        setTimeout(() => setMascotMood('happy'), 1000);
      }
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
      setScore(prev => prev + 10);
      setMascotMood('excited');
    } else {
      setMascotMood('sad');
    }
    
    setTimeout(() => {
      setMascotMood('happy');
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setCurrentGame('results');
      }
    }, 1500);
  };

  const renderMascot = () => {
    const getMascotExpression = () => {
      switch (mascotMood) {
        case 'excited':
          return {
            eyes: (
              <>
                <circle cx="120" cy="165" r="9" fill="#fff" />
                <circle cx="180" cy="165" r="9" fill="#fff" />
                <circle cx="120" cy="165" r="6" fill="#333" />
                <circle cx="180" cy="165" r="6" fill="#333" />
              </>
            ),
            mouth: (
              <path
                d="M115 210 Q150 250 185 210"
                stroke="#fff"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
            ),
            thought: "Awesome! 🎉"
          };
        case 'sad':
          return {
            eyes: (
              <>
                <path d="M110 160 Q120 165 130 160" stroke="#333" strokeWidth="3" fill="none" />
                <path d="M170 160 Q180 165 190 160" stroke="#333" strokeWidth="3" fill="none" />
              </>
            ),
            mouth: (
              <path
                d="M120 230 Q150 210 180 230"
                stroke="#fff"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
            ),
            thought: "Oops! Try again! 🤔"
          };
        default:
          return {
            eyes: (
              <>
                <circle cx="120" cy="165" r="9" fill="#fff" />
                <circle cx="180" cy="165" r="9" fill="#fff" />
                <circle cx="123" cy="168" r="4.5" fill="#333" />
                <circle cx="183" cy="168" r="4.5" fill="#333" />
              </>
            ),
            mouth: (
              <path
                d="M120 210 Q150 240 180 210"
                stroke="#fff"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
            ),
            thought: "Let's play together! 😊"
          };
      }
    };

    const expression = getMascotExpression();

    return (
      <div className="flex justify-center mb-6">
        <svg width="300" height="360" viewBox="0 0 300 360" className="animate-bounce-gentle">
          {/* Droplet shape */}
          <path
            d="M150 30 C90 90, 52.5 150, 52.5 210 C52.5 277.5, 97.5 330, 150 330 C202.5 330, 247.5 277.5, 247.5 210 C247.5 150, 210 90, 150 30 Z"
            fill="url(#mascotGradient)"
            className="animate-pulse-gentle"
          />
          
          <defs>
            <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aaff" />
              <stop offset="50%" stopColor="#0099ee" />
              <stop offset="100%" stopColor="#0077cc" />
            </linearGradient>
          </defs>
          
          {/* Highlight */}
          <ellipse cx="112.5" cy="105" rx="18" ry="27" fill="rgba(255, 255, 255, 0.6)" />
          
          {/* Face */}
          {expression.eyes}
          {expression.mouth}
          
          {/* Thought bubble */}
          <g className="animate-float">
            <path
              d="M200 60 Q200 40 220 40 L280 40 Q300 40 300 60 L300 100 Q300 120 280 120 L240 120 L220 140 L240 120 L220 120 Q200 120 200 100 Z"
              fill="#fff"
              stroke="#0099ee"
              strokeWidth="2"
              className="drop-shadow-md"
            />
            <text x="250" y="80" textAnchor="middle" className="text-xs font-medium fill-primary">
              {expression.thought}
            </text>
          </g>
        </svg>
      </div>
    );
  };

  const renderWordGuessGame = () => {
    const displayWord = currentWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
    
    const isWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
    const isLost = wrongGuesses >= 6;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Guess the Word!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-mono tracking-wider mb-4">{displayWord}</div>
            <p className="text-sm text-muted-foreground">Wrong guesses: {wrongGuesses}/6</p>
          </div>

          {!isWon && !isLost && (
            <div className="grid grid-cols-6 gap-2">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <Button
                  key={letter}
                  variant={guessedLetters.includes(letter) ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleLetterGuess(letter)}
                  disabled={guessedLetters.includes(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>
          )}

          {(isWon || isLost) && (
            <div className="text-center space-y-4">
              <p className="text-lg">
                {isWon ? '🎉 Congratulations! You won!' : '😔 Game over! The word was: ' + currentWord}
              </p>
              <Button onClick={() => setCurrentGame('word-guess')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderQuizGame = () => {
    const question = quizQuestions[currentQuestion];
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Droplink Quiz
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-medium">{question.question}</div>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start"
                onClick={() => handleQuizAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <Badge variant="secondary">Score: {quizScore}/{quizQuestions.length}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderGameMenu = () => (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentGame('word-guess')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Word Guessing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Guess Droplink-related words letter by letter!</p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentGame('quiz')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Droplink Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Test your knowledge about Droplink and Pi Network!</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderResults = () => (
    <Card className="max-w-2xl mx-auto text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Quiz Complete!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-2xl font-bold">Final Score: {quizScore}/{quizQuestions.length}</div>
        <div className="space-y-2">
          <Button onClick={() => { setCurrentGame('quiz'); setCurrentQuestion(0); setQuizScore(0); }}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => setCurrentGame('welcome')}>
            <Home className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Play with Droplink Mascot - Interactive Games & Activities</title>
        <meta name="description" content="Have fun with the Droplink mascot! Play word guessing games, take quizzes, and enjoy interactive activities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Score: {score}
              </Badge>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Play with Droplink!
            </h1>
            <p className="text-xl text-muted-foreground">
              Have fun with our friendly mascot through interactive games and activities
            </p>
          </div>
        </div>

        {/* Mascot */}
        {renderMascot()}

        {/* Game Content */}
        <div className="max-w-6xl mx-auto">
          {currentGame === 'welcome' && renderGameMenu()}
          {currentGame === 'word-guess' && renderWordGuessGame()}
          {currentGame === 'quiz' && renderQuizGame()}
          {currentGame === 'results' && renderResults()}
        </div>

        {/* Navigation */}
        {currentGame !== 'welcome' && (
          <div className="max-w-6xl mx-auto mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setCurrentGame('welcome')}
              className="mr-4"
            >
              <Gamepad2 className="h-4 w-4 mr-2" />
              All Games
            </Button>
          </div>
        )}

        <style>
          {`
          @keyframes bounce-gentle {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-8px); }
          }
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default PlayWithMascot;

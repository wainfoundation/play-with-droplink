
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Helmet } from 'react-helmet-async';
import { 
  GamepadIcon, 
  BrainIcon, 
  MessageSquareIcon, 
  TrophyIcon, 
  StarIcon, 
  HeartIcon,
  RefreshCwIcon,
  SendIcon,
  SparklesIcon,
  ZapIcon,
  SmileIcon,
  PuzzleIcon
} from 'lucide-react';

const PlayWithMascot = () => {
  // Mascot emotions with different states
  const emotions = [
    { name: "happy", eyes: "happy", mouth: "smile", thought: "I'm so happy to play with you! 😊" },
    { name: "excited", eyes: "excited", mouth: "big-smile", thought: "This is amazing! Let's play more! 🎉" },
    { name: "thinking", eyes: "thinking", mouth: "neutral", thought: "Hmm... let me think about this 🤔" },
    { name: "surprised", eyes: "wide", mouth: "open", thought: "Wow! That's incredible! 😲" },
    { name: "sleepy", eyes: "sleepy", mouth: "yawn", thought: "I'm getting a bit sleepy... 😴" },
    { name: "loving", eyes: "hearts", mouth: "gentle-smile", thought: "You're the best friend ever! 💕" },
    { name: "confused", eyes: "crossed", mouth: "puzzled", thought: "I'm a bit confused... 🤨" },
    { name: "playful", eyes: "wink", mouth: "grin", thought: "Let's have some fun! 😄" },
    { name: "proud", eyes: "bright", mouth: "proud-smile", thought: "You did amazing! I'm so proud! 🌟" },
    { name: "mischievous", eyes: "sly", mouth: "smirk", thought: "I have a fun idea... 😏" }
  ];

  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [gameMode, setGameMode] = useState('menu');
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Word Guessing Game
  const words = [
    { word: "DROPLINK", hint: "Our platform name" },
    { word: "MASCOT", hint: "A character that represents a brand" },
    { word: "BLOCKCHAIN", hint: "Technology behind Pi Network" },
    { word: "GAMES", hint: "What we're playing right now" },
    { word: "COMMUNITY", hint: "People working together" },
    { word: "INNOVATION", hint: "Creating new ideas" }
  ];
  
  const [currentWord, setCurrentWord] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // Quiz Game
  const quizQuestions = [
    {
      question: "What does Droplink help you create?",
      options: ["Social Media Posts", "Professional Profile", "Shopping Cart", "Video Games"],
      correct: 1
    },
    {
      question: "Which network powers Droplink?",
      options: ["Bitcoin", "Ethereum", "Pi Network", "Dogecoin"],
      correct: 2
    },
    {
      question: "What can you accept on Droplink?",
      options: ["Only likes", "Pi payments", "Traditional payments only", "None of the above"],
      correct: 1
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Memory Game
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Chat with Droplink
  const [chatMessages, setChatMessages] = useState([
    { sender: 'droplink', message: 'Hi there! I\'m Droplink, your friendly mascot! What would you like to talk about?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Emotion responses for chat
  const chatResponses = [
    "That's so interesting! Tell me more! 🤗",
    "Wow, I never thought about it that way! 💭",
    "You're so smart! I love learning from you! 🌟",
    "That reminds me of something cool about Pi Network! 🚀",
    "Haha, that's funny! You make me laugh! 😄",
    "I'm so glad we can chat like this! 💙",
    "You know what? You're absolutely right! ✨",
    "That's a great point! I'll remember that! 🧠"
  ];

  const renderMascotEyes = (type) => {
    switch (type) {
      case "happy":
        return (
          <>
            <path d="M70 100 Q80 95 90 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "excited":
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="80" cy="105" r="5" fill="#333" />
            <circle cx="120" cy="105" r="5" fill="#333" />
            <circle cx="82" cy="103" r="2" fill="#fff" />
            <circle cx="122" cy="103" r="2" fill="#fff" />
          </>
        );
      case "hearts":
        return (
          <>
            <path d="M70 95 C70 90, 80 90, 80 95 C80 90, 90 90, 90 95 C90 105, 80 110, 80 110 C80 110, 70 105, 70 95 Z" fill="#ff69b4" />
            <path d="M110 95 C110 90, 120 90, 120 95 C120 90, 130 90, 130 95 C130 105, 120 110, 120 110 C120 110, 110 105, 110 95 Z" fill="#ff69b4" />
          </>
        );
      case "wide":
        return (
          <>
            <circle cx="80" cy="105" r="12" fill="#fff" />
            <circle cx="120" cy="105" r="12" fill="#fff" />
            <circle cx="80" cy="105" r="8" fill="#333" />
            <circle cx="120" cy="105" r="8" fill="#333" />
          </>
        );
      case "sleepy":
        return (
          <>
            <path d="M70 110 L90 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 110 L130 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "wink":
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="83" cy="108" r="4" fill="#333" />
            <path d="M110 100 Q120 95 130 100" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <circle cx="80" cy="105" r="8" fill="#fff" />
            <circle cx="120" cy="105" r="8" fill="#fff" />
            <circle cx="83" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
            <circle cx="123" cy="108" r="4" fill="#333" className="animate-gentle-blink" />
          </>
        );
    }
  };

  const renderMascotMouth = (type) => {
    switch (type) {
      case "big-smile":
        return (
          <path
            d="M75 140 Q100 165 125 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "open":
        return (
          <ellipse cx="100" cy="145" rx="12" ry="8" fill="#333" />
        );
      case "yawn":
        return (
          <ellipse cx="100" cy="145" rx="8" ry="12" fill="#333" />
        );
      case "grin":
        return (
          <path
            d="M70 140 Q100 160 130 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "neutral":
        return (
          <ellipse cx="100" cy="145" rx="6" ry="3" fill="#fff" />
        );
      default:
        return (
          <path
            d="M80 140 Q100 155 120 140"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  const changeMascotEmotion = (emotionName) => {
    const emotionIndex = emotions.findIndex(e => e.name === emotionName);
    if (emotionIndex !== -1) {
      setCurrentEmotion(emotionIndex);
    }
  };

  const initializeMemoryGame = () => {
    const symbols = ['🎮', '🎯', '⭐', '💎', '🚀', '🎨', '🔥', '💡'];
    const cards = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setMemoryMoves(0);
  };

  const handleMemoryCardClick = (cardId) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
        changeMascotEmotion('proud');
        if (matchedCards.length + 2 === memoryCards.length) {
          setScore(prev => prev + 100);
          setTotalScore(prev => prev + 100);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          changeMascotEmotion('thinking');
        }, 1000);
      }
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const newMessages = [
      ...chatMessages,
      { sender: 'user', message: chatInput },
      { 
        sender: 'droplink', 
        message: chatResponses[Math.floor(Math.random() * chatResponses.length)]
      }
    ];
    setChatMessages(newMessages);
    setChatInput('');
    changeMascotEmotion('happy');
  };

  const startWordGame = () => {
    setGameMode('word');
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameWon(false);
    setGameLost(false);
    changeMascotEmotion('excited');
  };

  const startQuiz = () => {
    setGameMode('quiz');
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    changeMascotEmotion('thinking');
  };

  const startMemoryGame = () => {
    setGameMode('memory');
    initializeMemoryGame();
    changeMascotEmotion('excited');
  };

  const startChat = () => {
    setGameMode('chat');
    changeMascotEmotion('happy');
  };

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    if (!words[currentWord].word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
      changeMascotEmotion('confused');
      if (wrongGuesses + 1 >= 6) {
        setGameLost(true);
        changeMascotEmotion('sleepy');
      }
    } else {
      changeMascotEmotion('happy');
      // Check if word is complete
      const wordComplete = words[currentWord].word
        .split('')
        .every(l => newGuessedLetters.includes(l));
      
      if (wordComplete) {
        setGameWon(true);
        setScore(prev => prev + 50);
        setTotalScore(prev => prev + 50);
        changeMascotEmotion('proud');
      }
    }
  };

  const answerQuiz = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
      changeMascotEmotion('proud');
    } else {
      changeMascotEmotion('confused');
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        changeMascotEmotion('thinking');
      } else {
        setQuizComplete(true);
        setScore(prev => prev + quizScore * 25);
        setTotalScore(prev => prev + quizScore * 25);
        changeMascotEmotion('happy');
      }
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Play with Droplink - Interactive Games & Fun Activities</title>
        <meta name="description" content="Play interactive games with the Droplink mascot! Word guessing, quizzes, memory games, and chat activities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Play with Droplink!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Have fun with our interactive mascot and exciting games!
            </p>
            
            {/* Score Display */}
            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Session Score: {score}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <StarIcon className="w-5 h-5 mr-2" />
                Total Score: {totalScore}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mascot Display */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <svg
                  width="200"
                  height="240"
                  viewBox="0 0 200 240"
                  className="animate-bounce-gentle"
                >
                  {/* Droplet shape */}
                  <path
                    d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                    fill="url(#playDropletGradient)"
                    className="animate-pulse-gentle"
                  />
                  
                  <defs>
                    <linearGradient id="playDropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00aaff" />
                      <stop offset="50%" stopColor="#0099ee" />
                      <stop offset="100%" stopColor="#0077cc" />
                    </linearGradient>
                  </defs>
                  
                  {/* Highlight */}
                  <ellipse
                    cx="75"
                    cy="70"
                    rx="12"
                    ry="18"
                    fill="rgba(255, 255, 255, 0.6)"
                    className="animate-shimmer"
                  />
                  
                  {/* Face */}
                  {renderMascotEyes(emotions[currentEmotion].eyes)}
                  {renderMascotMouth(emotions[currentEmotion].mouth)}
                </svg>
                
                {/* Thought bubble */}
                <div className="absolute -right-4 -top-4 bg-white rounded-lg p-3 shadow-lg border-2 border-primary/20 max-w-xs animate-float">
                  <p className="text-sm font-medium text-primary">
                    {emotions[currentEmotion].thought}
                  </p>
                </div>
              </div>

              {/* Emotion Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {emotions.slice(0, 10).map((emotion, index) => (
                  <Button
                    key={emotion.name}
                    variant={currentEmotion === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentEmotion(index)}
                    className="text-xs"
                  >
                    {emotion.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Game Area */}
            <div className="space-y-6">
              {gameMode === 'menu' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GamepadIcon className="w-6 h-6" />
                      Choose Your Game!
                    </CardTitle>
                    <CardDescription>
                      Pick a fun activity to play with Droplink
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={startWordGame} className="w-full justify-start gap-3" size="lg">
                      <PuzzleIcon className="w-5 h-5" />
                      Word Guessing Game
                    </Button>
                    <Button onClick={startQuiz} className="w-full justify-start gap-3" size="lg" variant="outline">
                      <BrainIcon className="w-5 h-5" />
                      Droplink Quiz
                    </Button>
                    <Button onClick={startMemoryGame} className="w-full justify-start gap-3" size="lg" variant="outline">
                      <ZapIcon className="w-5 h-5" />
                      Memory Match
                    </Button>
                    <Button onClick={startChat} className="w-full justify-start gap-3" size="lg" variant="outline">
                      <MessageSquareIcon className="w-5 h-5" />
                      Talk to Droplink
                    </Button>
                  </CardContent>
                </Card>
              )}

              {gameMode === 'word' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Word Guessing Game</span>
                      <Button onClick={() => setGameMode('menu')} variant="outline" size="sm">
                        Back to Menu
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Hint: {words[currentWord].hint}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Word Display */}
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-4 tracking-wider">
                        {words[currentWord].word
                          .split('')
                          .map(letter => guessedLetters.includes(letter) ? letter : '_')
                          .join(' ')}
                      </div>
                      <p className="text-sm text-gray-600">Wrong guesses: {wrongGuesses}/6</p>
                    </div>

                    {/* Alphabet */}
                    <div className="grid grid-cols-6 gap-2">
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                        <Button
                          key={letter}
                          variant={guessedLetters.includes(letter) ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => guessLetter(letter)}
                          disabled={guessedLetters.includes(letter) || gameWon || gameLost}
                        >
                          {letter}
                        </Button>
                      ))}
                    </div>

                    {/* Game Status */}
                    {gameWon && (
                      <div className="text-center p-4 bg-green-100 rounded-lg">
                        <p className="text-green-800 font-bold">🎉 You won! +50 points!</p>
                        <Button onClick={startWordGame} className="mt-2">
                          <RefreshCwIcon className="w-4 h-4 mr-2" />
                          Play Again
                        </Button>
                      </div>
                    )}

                    {gameLost && (
                      <div className="text-center p-4 bg-red-100 rounded-lg">
                        <p className="text-red-800 font-bold">😔 Game Over! The word was: {words[currentWord].word}</p>
                        <Button onClick={startWordGame} className="mt-2">
                          <RefreshCwIcon className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {gameMode === 'quiz' && !quizComplete && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Droplink Quiz</span>
                      <Button onClick={() => setGameMode('menu')} variant="outline" size="sm">
                        Back to Menu
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold">{quizQuestions[currentQuestion].question}</h3>
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => answerQuiz(index)}
                          disabled={selectedAnswer !== null}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {gameMode === 'quiz' && quizComplete && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-primary">
                      {quizScore}/{quizQuestions.length}
                    </div>
                    <p className="text-gray-600">
                      You earned {quizScore * 25} points!
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={startQuiz}>
                        <RefreshCwIcon className="w-4 h-4 mr-2" />
                        Play Again
                      </Button>
                      <Button onClick={() => setGameMode('menu')} variant="outline">
                        Back to Menu
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {gameMode === 'memory' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Memory Match</span>
                      <Button onClick={() => setGameMode('menu')} variant="outline" size="sm">
                        Back to Menu
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Moves: {memoryMoves} | Matches: {matchedCards.length / 2}/8
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {memoryCards.map(card => (
                        <Button
                          key={card.id}
                          variant="outline"
                          className="aspect-square text-2xl"
                          onClick={() => handleMemoryCardClick(card.id)}
                          disabled={matchedCards.includes(card.id)}
                        >
                          {flippedCards.includes(card.id) || matchedCards.includes(card.id)
                            ? card.symbol
                            : '?'
                          }
                        </Button>
                      ))}
                    </div>
                    
                    {matchedCards.length === memoryCards.length && (
                      <div className="text-center mt-4 p-4 bg-green-100 rounded-lg">
                        <p className="text-green-800 font-bold">🎉 Perfect! +100 points!</p>
                        <Button onClick={startMemoryGame} className="mt-2">
                          <RefreshCwIcon className="w-4 h-4 mr-2" />
                          Play Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {gameMode === 'chat' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Talk to Droplink</span>
                      <Button onClick={() => setGameMode('menu')} variant="outline" size="sm">
                        Back to Menu
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Have a conversation with your friendly mascot!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-60 overflow-y-auto border rounded-lg p-4 space-y-3">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      />
                      <Button onClick={handleChatSend}>
                        <SendIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

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
          
          @keyframes gentle-blink {
            0%, 85%, 100% { opacity: 1; }
            90%, 95% { opacity: 0.1; }
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
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
          
          .animate-gentle-blink {
            animation: gentle-blink 6s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 2.5s ease-in-out infinite;
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

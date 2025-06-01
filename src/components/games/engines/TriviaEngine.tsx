
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Brain, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { playSoundEffect } from '@/utils/sounds';

interface TriviaEngineProps {
  gameId: string;
  onBack: () => void;
  onGameComplete: (score: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: string;
}

const TriviaEngine: React.FC<TriviaEngineProps> = ({ gameId, onBack, onGameComplete }) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  // Generate questions based on game type
  useEffect(() => {
    const generatedQuestions = generateQuestionsForGame(gameId);
    setQuestions(generatedQuestions);
    setAnsweredQuestions(new Array(generatedQuestions.length).fill(false));
  }, [gameId]);

  // Timer
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameFinished, timeLeft]);

  const generateQuestionsForGame = (gameId: string): Question[] => {
    const questionBases = {
      'general-knowledge': [
        { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
        { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], correct: 2 },
        { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Saturn", "Mars"], correct: 1 },
        { question: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: 1 }
      ],
      'science-quiz': [
        { question: "What is the chemical symbol for gold?", options: ["Go", "Au", "Ag", "Al"], correct: 1 },
        { question: "How many bones are in the human body?", options: ["206", "207", "208", "209"], correct: 0 },
        { question: "What is the speed of light?", options: ["299,792,458 m/s", "300,000,000 m/s", "250,000,000 m/s", "350,000,000 m/s"], correct: 0 },
        { question: "What gas makes up 78% of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: 2 },
        { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Quartz"], correct: 2 }
      ],
      'history-quiz': [
        { question: "Who was the first President of the United States?", options: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"], correct: 1 },
        { question: "In which year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
        { question: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Egyptian", "Persian"], correct: 1 },
        { question: "The Great Wall of China was built to protect against which people?", options: ["Mongols", "Japanese", "Russians", "Koreans"], correct: 0 },
        { question: "Who discovered America in 1492?", options: ["Vasco da Gama", "Christopher Columbus", "Marco Polo", "Ferdinand Magellan"], correct: 1 }
      ],
      'geography-quiz': [
        { question: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], correct: 2 },
        { question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
        { question: "What is the highest mountain in the world?", options: ["K2", "Mount Everest", "Kilimanjaro", "Mont Blanc"], correct: 1 },
        { question: "Which country has the most time zones?", options: ["Russia", "USA", "China", "Canada"], correct: 0 }
      ],
      'sports-trivia': [
        { question: "How many players are on a basketball team on the court?", options: ["4", "5", "6", "7"], correct: 1 },
        { question: "In which sport would you perform a slam dunk?", options: ["Tennis", "Basketball", "Volleyball", "Soccer"], correct: 1 },
        { question: "How often are the Summer Olympics held?", options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"], correct: 2 },
        { question: "What is the maximum score possible in ten-pin bowling?", options: ["200", "250", "300", "350"], correct: 2 },
        { question: "In soccer, what does a red card mean?", options: ["Warning", "Penalty", "Ejection", "Goal"], correct: 2 }
      ]
    };

    const base = questionBases[gameId as keyof typeof questionBases] || questionBases['general-knowledge'];
    return base.map((q, index) => ({
      id: index + 1,
      ...q,
      category: gameId,
      difficulty: 'Medium'
    }));
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    playSoundEffect('newLevel', 0.7);
  };

  const handleTimeUp = () => {
    handleAnswer(-1); // -1 indicates time up
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestionIndex].correct;
    
    if (isCorrect) {
      const points = timeLeft * 10 + (streak * 5);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      playSoundEffect('success', 0.6);
      toast({
        title: "Correct! 🎉",
        description: `+${points} points! Streak: ${streak + 1}`,
      });
    } else {
      setStreak(0);
      playSoundEffect('error', 0.4);
      toast({
        title: "Incorrect 😞",
        description: `The correct answer was: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]}`,
        variant: "destructive"
      });
    }

    // Mark question as answered
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = () => {
    setGameFinished(true);
    setGameStarted(false);
    onGameComplete(score);
    playSoundEffect('gameOver', 0.7);
  };

  const getGameTitle = () => {
    const titles = {
      'general-knowledge': 'General Knowledge Quiz',
      'science-quiz': 'Science Quiz Challenge',
      'history-quiz': 'History Quiz Master',
      'geography-quiz': 'Geography Explorer',
      'sports-trivia': 'Sports Trivia Championship'
    };
    return titles[gameId as keyof typeof titles] || 'Trivia Quiz';
  };

  const getGameEmoji = () => {
    const emojis = {
      'general-knowledge': '🧠',
      'science-quiz': '🔬',
      'history-quiz': '📚',
      'geography-quiz': '🌍',
      'sports-trivia': '⚽'
    };
    return emojis[gameId as keyof typeof emojis] || '🎯';
  };

  if (!gameStarted && !gameFinished) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CardTitle className="flex items-center gap-2">
              <div className="text-2xl">{getGameEmoji()}</div>
              {getGameTitle()}
            </CardTitle>
            <Badge variant="outline">Trivia</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">{getGameEmoji()}</div>
            <h3 className="text-xl font-bold mb-2">{getGameTitle()}</h3>
            <p className="text-gray-600 mb-4">
              Answer {questions.length} questions as quickly as possible!<br/>
              Each question has 30 seconds. Build streaks for bonus points!
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">30s</div>
                <div className="text-sm text-gray-600">Per Question</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">+Streak</div>
                <div className="text-sm text-gray-600">Bonus Points</div>
              </div>
            </div>
            <Button onClick={startGame} size="lg">
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameFinished) {
    const accuracy = Math.round((score / (questions.length * 300)) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Final Score: {score.toLocaleString()}</h3>
            <p className="text-gray-600 mb-6">Accuracy: {accuracy}%</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{score}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={() => window.location.reload()} variant="outline">
                Play Again
              </Button>
              <Button onClick={onBack}>
                Back to Games
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{score.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{streak}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="font-semibold">{timeLeft}s</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Time Progress */}
        <div className="mb-6">
          <Progress value={(timeLeft / 30) * 100} className="h-1" />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "text-left justify-start p-4 h-auto";
              let icon = null;
              
              if (selectedAnswer !== null) {
                if (index === currentQuestion.correct) {
                  buttonClass += " bg-green-100 border-green-500 text-green-800";
                  icon = <CheckCircle className="w-4 h-4 text-green-500" />;
                } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correct) {
                  buttonClass += " bg-red-100 border-red-500 text-red-800";
                  icon = <XCircle className="w-4 h-4 text-red-500" />;
                } else {
                  buttonClass += " opacity-50";
                }
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{String.fromCharCode(65 + index)}. {option}</span>
                    {icon}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriviaEngine;

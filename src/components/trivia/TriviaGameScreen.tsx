
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Coins, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { TriviaQuestion, UserStats } from '@/types/trivia';
import AuthGuard from '@/components/AuthGuard';

interface TriviaGameScreenProps {
  currentQuestion: TriviaQuestion;
  selectedAnswer: string;
  showResult: boolean;
  isCorrect: boolean;
  timeLeft: number;
  userStats: UserStats;
  questionIndex: number;
  onAnswerSelect: (answer: string) => void;
  onAnswerSubmit: () => void;
}

const TriviaGameScreen: React.FC<TriviaGameScreenProps> = ({
  currentQuestion,
  selectedAnswer,
  showResult,
  isCorrect,
  timeLeft,
  userStats,
  questionIndex,
  onAnswerSelect,
  onAnswerSubmit
}) => {
  const safeQuestionNumber = typeof questionIndex === 'number' && questionIndex >= 0 ? questionIndex + 1 : 1;

  return (
    <AuthGuard requireAuth={true}>
      <>
        <Helmet>
          <title>{`Playing Trivia - Question ${safeQuestionNumber}`}</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
          <div className="container mx-auto max-w-2xl">
            {/* Game Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-bold">{userStats.lives}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{userStats.coins}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  <span className="font-bold">L{userStats.level}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-bold text-lg">{timeLeft}s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={(timeLeft / 15) * 100} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{currentQuestion.category}</Badge>
                  <Badge className={
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-500' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      onClick={() => onAnswerSelect(option)}
                      disabled={showResult}
                      className={`h-12 text-left justify-start ${
                        showResult && option === currentQuestion.answer
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : showResult && selectedAnswer === option && option !== currentQuestion.answer
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : ''
                      }`}
                    >
                      <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {!showResult && selectedAnswer && (
                  <Button
                    onClick={onAnswerSubmit}
                    className="w-full mt-4"
                    size="lg"
                  >
                    Submit Answer
                  </Button>
                )}

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <div className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
                    </div>
                    {isCorrect && (
                      <p className="text-green-600 mt-2">+1 coin earned!</p>
                    )}
                    {!isCorrect && (
                      <p className="text-red-600 mt-2">-1 life lost!</p>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Streak Display */}
            {userStats.currentStreak > 0 && (
              <Card className="mb-4">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-orange-600">
                    🔥 {userStats.currentStreak} in a row!
                  </div>
                  {userStats.currentStreak === 4 && (
                    <p className="text-sm text-gray-600">One more for bonus coins!</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </>
    </AuthGuard>
  );
};

export default TriviaGameScreen;

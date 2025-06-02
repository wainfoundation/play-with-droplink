
export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: string;
  difficulty: string;
}

export interface UserStats {
  lives: number;
  coins: number;
  level: number;
  totalCorrect: number;
  currentStreak: number;
}

export type GameState = 'home' | 'playing' | 'gameOver';

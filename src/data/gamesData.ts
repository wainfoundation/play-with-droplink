
export const gamesData = [
  // Free Games - Accessible to all visitors
  {
    id: 'endless-runner',
    name: 'Endless Runner',
    title: 'Endless Runner',
    category: 'infinite',
    difficulty: 'Medium',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Run endlessly through changing landscapes'
  },
  {
    id: 'block-connect',
    name: 'Block Connect',
    title: 'Block Connect',
    category: 'puzzle',
    difficulty: 'Easy',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Connect blocks through millions of levels! Watch ads to play, pay Pi for hints, unlock premium for ad-free gaming.'
  },
  {
    id: 'daily-crossword',
    name: 'Daily Crossword',
    title: 'Daily Crossword',
    category: 'puzzle',
    difficulty: 'Hard',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Solve fresh crossword puzzles daily! Infinite levels, daily challenges, duel mode, Pi hints, and leaderboards.'
  },
  {
    id: 'color-merge',
    name: 'Color Merge',
    title: 'Color Merge',
    category: 'puzzle',
    difficulty: 'Easy',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Blend colors to solve puzzles through infinite levels! Perfect for training creativity and logic!'
  },
  
  // Premium Games - Require Pi payment or subscription
  {
    id: 'infinite-jumper',
    name: 'Infinite Jumper',
    title: 'Infinite Jumper',
    category: 'infinite',
    difficulty: 'Hard',
    is_free: false,
    price_pi: 2,
    premium: true,
    description: 'Jump higher and higher without falling'
  },
  {
    id: 'space-explorer',
    name: 'Space Explorer',
    title: 'Space Explorer',
    category: 'infinite',
    difficulty: 'Medium',
    is_free: false,
    price_pi: 3,
    premium: true,
    description: 'Explore infinite space and discover planets'
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    title: 'Treasure Hunt',
    category: 'infinite',
    difficulty: 'Medium',
    is_free: false,
    price_pi: 1,
    premium: true,
    description: 'Hunt for endless treasures and rewards'
  },
  {
    id: 'survival-mode',
    name: 'Survival Mode',
    title: 'Survival Mode',
    category: 'infinite',
    difficulty: 'Hard',
    is_free: false,
    price_pi: 2,
    premium: true,
    description: 'Survive as long as possible in harsh conditions'
  },
  {
    id: 'puzzle-master',
    name: 'Puzzle Master',
    title: 'Puzzle Master',
    category: 'puzzle',
    difficulty: 'Expert',
    is_free: false,
    price_pi: 4,
    premium: true,
    description: 'Master the most challenging puzzles ever created'
  },
  {
    id: 'action-hero',
    name: 'Action Hero',
    title: 'Action Hero',
    category: 'action',
    difficulty: 'Hard',
    is_free: false,
    price_pi: 3,
    premium: true,
    description: 'Become the ultimate action hero in fast-paced adventures'
  },
  {
    id: 'trivia-champion',
    name: 'Trivia Champion',
    title: 'Trivia Champion',
    category: 'trivia',
    difficulty: 'Expert',
    is_free: false,
    price_pi: 2,
    premium: true,
    description: 'Challenge yourself with expert-level trivia questions'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    title: 'Creative Studio',
    category: 'creative',
    difficulty: 'Medium',
    is_free: false,
    price_pi: 5,
    premium: true,
    description: 'Unleash your creativity with advanced creative tools'
  },

  // Additional Free Games
  {
    id: 'sudoku-classic',
    name: 'Sudoku Classic',
    title: 'Sudoku Classic',
    category: 'puzzle',
    difficulty: 'Medium',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Classic number puzzle with logic-based solving'
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    title: 'Memory Match',
    category: 'puzzle',
    difficulty: 'Easy',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Flip cards to find matching pairs'
  },
  {
    id: 'speed-tap',
    name: 'Speed Tap',
    title: 'Speed Tap',
    category: 'action',
    difficulty: 'Easy',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Tap as fast as you can to beat high scores'
  },
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    title: 'General Knowledge',
    category: 'trivia',
    difficulty: 'Medium',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Test your knowledge across various topics'
  },
  {
    id: 'color-mixer',
    name: 'Color Mixer',
    title: 'Color Mixer',
    category: 'creative',
    difficulty: 'Easy',
    is_free: true,
    price_pi: 0,
    premium: false,
    description: 'Mix and blend colors to create art'
  }
];

// Helper functions for game management
export const getGameById = (id: string) => {
  return gamesData.find(game => game.id === id);
};

export const getFreeGames = () => {
  return gamesData.filter(game => game.is_free);
};

export const getPremiumGames = () => {
  return gamesData.filter(game => !game.is_free);
};

export const getGamesByCategory = (category: string) => {
  return gamesData.filter(game => game.category === category);
};

export const getGamesByDifficulty = (difficulty: string) => {
  return gamesData.filter(game => game.difficulty === difficulty);
};

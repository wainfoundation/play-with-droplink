
import React from 'react';

export interface LevelConfig {
  level: number;
  difficulty: number;
  gridSize: number;
  complexity: number;
  timeLimit?: number;
}

export class InfiniteLevelGenerator {
  // Generate level configuration based on level number
  static generateLevelConfig(gameId: string, level: number): LevelConfig {
    const baseConfig = this.getBaseConfig(gameId);
    const difficulty = this.calculateDifficulty(level);
    
    return {
      level,
      difficulty,
      gridSize: Math.min(baseConfig.maxGridSize, baseConfig.minGridSize + Math.floor(level / 100)),
      complexity: Math.min(10, 1 + Math.floor(level / 50)),
      timeLimit: baseConfig.hasTimeLimit ? Math.max(30, 120 - Math.floor(level / 20)) : undefined
    };
  }

  // Generate grid for block-based games
  static generateBlockGrid(config: LevelConfig): number[][] {
    const { gridSize, complexity } = config;
    const grid: number[][] = [];
    
    for (let i = 0; i < gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        // More complex patterns at higher levels
        const blockType = Math.floor(Math.random() * (2 + complexity));
        grid[i][j] = blockType;
      }
    }
    
    // Ensure the puzzle is solvable by creating some guaranteed matches
    this.ensureSolvable(grid, complexity);
    
    return grid;
  }

  // Generate crossword for word games
  static generateCrosswordData(config: LevelConfig): {
    grid: string[][];
    clues: { across: any[]; down: any[] };
  } {
    const { gridSize, complexity } = config;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    // Simple word placement algorithm
    const words = this.getWordsForLevel(complexity);
    const clues = { across: [], down: [] };
    
    words.forEach((word, index) => {
      if (index % 2 === 0) {
        // Place horizontally
        const row = Math.floor(Math.random() * (gridSize - word.length));
        const col = Math.floor(Math.random() * gridSize);
        
        for (let i = 0; i < word.length && col + i < gridSize; i++) {
          grid[row][col + i] = word[i];
        }
        
        clues.across.push({
          number: index + 1,
          clue: `Clue for ${word}`,
          answer: word,
          row,
          col
        });
      } else {
        // Place vertically
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * (gridSize - word.length));
        
        for (let i = 0; i < word.length && row + i < gridSize; i++) {
          grid[row + i][col] = word[i];
        }
        
        clues.down.push({
          number: index + 1,
          clue: `Clue for ${word}`,
          answer: word,
          row,
          col
        });
      }
    });
    
    return { grid, clues };
  }

  // Generate sudoku grid
  static generateSudokuGrid(config: LevelConfig): number[][] {
    const size = Math.min(9, 4 + Math.floor(config.level / 1000)); // Start with 4x4, grow to 9x9
    const grid = Array(size).fill(null).map(() => Array(size).fill(0));
    
    // Fill with a valid solution first
    this.fillSudokuGrid(grid, size);
    
    // Remove numbers based on difficulty
    const cellsToRemove = Math.floor((size * size) * (0.3 + (config.difficulty * 0.05)));
    this.removeSudokuCells(grid, cellsToRemove);
    
    return grid;
  }

  // Calculate difficulty progression
  private static calculateDifficulty(level: number): number {
    // Difficulty increases every 10 levels, capped at 10
    return Math.min(10, 1 + Math.floor(level / 10));
  }

  // Get base configuration for each game type
  private static getBaseConfig(gameId: string): {
    minGridSize: number;
    maxGridSize: number;
    hasTimeLimit: boolean;
  } {
    const configs = {
      'block-connect': { minGridSize: 5, maxGridSize: 12, hasTimeLimit: false },
      'color-merge': { minGridSize: 4, maxGridSize: 10, hasTimeLimit: false },
      'sudoku-classic': { minGridSize: 4, maxGridSize: 9, hasTimeLimit: true },
      'daily-crossword': { minGridSize: 8, maxGridSize: 15, hasTimeLimit: true },
      'memory-match': { minGridSize: 4, maxGridSize: 8, hasTimeLimit: true }
    };
    
    return configs[gameId] || { minGridSize: 5, maxGridSize: 10, hasTimeLimit: false };
  }

  // Ensure block grid is solvable
  private static ensureSolvable(grid: number[][], complexity: number): void {
    const size = grid.length;
    
    // Create some guaranteed horizontal matches
    for (let i = 0; i < size; i += 2) {
      for (let j = 0; j < size - 1; j += 3) {
        if (j + 1 < size) {
          const blockType = Math.floor(Math.random() * (2 + complexity));
          grid[i][j] = blockType;
          grid[i][j + 1] = blockType;
        }
      }
    }
  }

  // Get word list for crossword generation
  private static getWordsForLevel(complexity: number): string[] {
    const easyWords = ['CAT', 'DOG', 'SUN', 'MOON', 'TREE'];
    const mediumWords = ['HOUSE', 'WATER', 'LIGHT', 'MUSIC', 'HAPPY'];
    const hardWords = ['COMPUTER', 'ADVENTURE', 'KNOWLEDGE', 'CREATIVE', 'INFINITE'];
    
    const allWords = [...easyWords];
    if (complexity >= 3) allWords.push(...mediumWords);
    if (complexity >= 6) allWords.push(...hardWords);
    
    return allWords.slice(0, Math.min(5 + complexity, allWords.length));
  }

  // Fill sudoku grid with valid solution
  private static fillSudokuGrid(grid: number[][], size: number): void {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        grid[i][j] = ((i * size + i / size + j) % size) + 1;
      }
    }
  }

  // Remove cells from solved sudoku
  private static removeSudokuCells(grid: number[][], count: number): void {
    const size = grid.length;
    let removed = 0;
    
    while (removed < count) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (grid[row][col] !== 0) {
        grid[row][col] = 0;
        removed++;
      }
    }
  }
}

export default InfiniteLevelGenerator;

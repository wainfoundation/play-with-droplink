
// Sudoku puzzle generation and validation utilities

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'insane';

export interface SudokuPuzzle {
  puzzle: number[][];
  solution: number[][];
}

// Generate a complete, valid Sudoku solution
export const generateCompleteSudoku = (): number[][] => {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // Fill the board using backtracking
  fillBoard(board);
  return board;
};

// Fill the board with a valid solution
const fillBoard = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle numbers for randomness
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        for (const num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Check if a move is valid according to Sudoku rules
export const isValidMove = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
};

// Validate a Sudoku move (for game play)
export const validateSudokuMove = (board: number[][], row: number, col: number, num: number): boolean => {
  if (num === 0) return true; // Allow clearing cells
  return isValidMove(board, row, col, num);
};

// Check if the Sudoku puzzle is complete
export const checkSudokuComplete = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return false;
      if (!isValidMove(board.map(r => [...r]), row, col, board[row][col])) {
        // Temporarily clear the cell to check validity
        const temp = board[row][col];
        board[row][col] = 0;
        const valid = isValidMove(board, row, col, temp);
        board[row][col] = temp;
        if (!valid) return false;
      }
    }
  }
  return true;
};

// Remove numbers from a complete board to create a puzzle
const createPuzzle = (solution: number[][], cellsToRemove: number): number[][] => {
  const puzzle = solution.map(row => [...row]);
  let removed = 0;
  
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return puzzle;
};

// Get difficulty settings
const getDifficultySettings = (difficulty: Difficulty): { cellsToRemove: number } => {
  switch (difficulty) {
    case 'easy':
      return { cellsToRemove: 35 }; // Remove 35 cells (46 given)
    case 'medium':
      return { cellsToRemove: 45 }; // Remove 45 cells (36 given)
    case 'hard':
      return { cellsToRemove: 52 }; // Remove 52 cells (29 given)
    case 'expert':
      return { cellsToRemove: 58 }; // Remove 58 cells (23 given)
    case 'insane':
      return { cellsToRemove: 64 }; // Remove 64 cells (17 given)
    default:
      return { cellsToRemove: 45 };
  }
};

// Main function to generate a Sudoku puzzle
export const generateSudokuPuzzle = (difficulty: Difficulty = 'medium'): SudokuPuzzle => {
  const solution = generateCompleteSudoku();
  const { cellsToRemove } = getDifficultySettings(difficulty);
  const puzzle = createPuzzle(solution, cellsToRemove);
  
  return {
    puzzle,
    solution
  };
};

// Helper function to count filled cells
export const countFilledCells = (board: number[][]): number => {
  let count = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) count++;
    }
  }
  return count;
};

// Calculate completion percentage
export const getCompletionPercentage = (board: number[][]): number => {
  const filled = countFilledCells(board);
  return Math.round((filled / 81) * 100);
};

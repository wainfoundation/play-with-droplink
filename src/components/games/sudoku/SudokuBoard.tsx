
import React from 'react';

interface SudokuBoardProps {
  board: number[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  theme: 'light' | 'dark' | 'pi';
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, selectedCell, onCellClick, theme }) => {
  if (board.length === 0) return null;

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          board: 'bg-gray-800 border-gray-600',
          cell: 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600',
          selected: 'bg-blue-600 text-white',
          given: 'bg-gray-600 text-gray-300'
        };
      case 'pi':
        return {
          board: 'bg-gradient-to-br from-yellow-100 to-orange-100 border-orange-300',
          cell: 'bg-yellow-50 border-orange-200 text-orange-900 hover:bg-yellow-100',
          selected: 'bg-orange-400 text-white',
          given: 'bg-orange-200 text-orange-800 font-bold'
        };
      default:
        return {
          board: 'bg-white border-gray-300',
          cell: 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
          selected: 'bg-blue-500 text-white',
          given: 'bg-gray-100 text-gray-700 font-bold'
        };
    }
  };

  const styles = getThemeStyles();

  const isGivenNumber = (row: number, col: number): boolean => {
    // In a real implementation, you'd track which numbers were given initially
    // For now, we'll assume non-zero numbers are given
    return board[row][col] !== 0;
  };

  const getCellStyle = (row: number, col: number): string => {
    let cellStyle = `w-12 h-12 border flex items-center justify-center cursor-pointer text-lg font-semibold transition-colors ${styles.cell}`;
    
    // Add thick borders for 3x3 box separation
    if (row % 3 === 0) cellStyle += ' border-t-2';
    if (row === 8) cellStyle += ' border-b-2';
    if (col % 3 === 0) cellStyle += ' border-l-2';
    if (col === 8) cellStyle += ' border-r-2';
    
    // Highlight selected cell
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      cellStyle = cellStyle.replace(styles.cell, styles.selected);
    }
    
    // Style given numbers differently
    if (isGivenNumber(row, col)) {
      cellStyle = cellStyle.replace(styles.cell, styles.given);
    }
    
    return cellStyle;
  };

  return (
    <div className={`inline-block p-4 border-4 rounded-lg ${styles.board}`}>
      <div className="grid grid-cols-9 gap-0">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellStyle(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;

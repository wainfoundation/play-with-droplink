
import { TriviaQuestion } from '@/types/trivia';

export const SAMPLE_QUESTIONS: TriviaQuestion[] = [
  {
    id: '1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    answer: 'Mars',
    category: 'Science',
    difficulty: 'Easy'
  },
  {
    id: '2',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    answer: 'Paris',
    category: 'Geography',
    difficulty: 'Easy'
  },
  {
    id: '3',
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Monet'],
    answer: 'Da Vinci',
    category: 'Art',
    difficulty: 'Medium'
  },
  {
    id: '4',
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippo'],
    answer: 'Blue Whale',
    category: 'Biology',
    difficulty: 'Easy'
  },
  {
    id: '5',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    answer: '1945',
    category: 'History',
    difficulty: 'Medium'
  }
];

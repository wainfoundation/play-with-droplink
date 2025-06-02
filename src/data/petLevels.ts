
export interface PetLevel {
  level: number;
  coinsPerDay: number;
  xpRequired: number;
  title: string;
  description: string;
}

export const petLevelChart: PetLevel[] = [
  { level: 0, coinsPerDay: 1, xpRequired: 10, title: "Newborn", description: "Just starting out!" },
  { level: 1, coinsPerDay: 2, xpRequired: 20, title: "Toddler", description: "Learning the basics" },
  { level: 2, coinsPerDay: 3, xpRequired: 30, title: "Young", description: "Getting more active" },
  { level: 3, coinsPerDay: 5, xpRequired: 50, title: "Playful", description: "Full of energy" },
  { level: 4, coinsPerDay: 7, xpRequired: 75, title: "Smart", description: "Quick learner" },
  { level: 5, coinsPerDay: 10, xpRequired: 100, title: "Clever", description: "Solving problems" },
  { level: 6, coinsPerDay: 13, xpRequired: 150, title: "Wise", description: "Knows what they want" },
  { level: 7, coinsPerDay: 17, xpRequired: 200, title: "Expert", description: "Master of skills" },
  { level: 8, coinsPerDay: 22, xpRequired: 300, title: "Legendary", description: "Truly special" },
  { level: 9, coinsPerDay: 28, xpRequired: 400, title: "Mythical", description: "One of a kind" },
  { level: 10, coinsPerDay: 35, xpRequired: 500, title: "Divine", description: "Perfect companion" }
];

export const getNextLevelInfo = (currentLevel: number) => {
  const nextLevel = petLevelChart.find(l => l.level === currentLevel + 1);
  return nextLevel || petLevelChart[petLevelChart.length - 1];
};

export const getCurrentLevelInfo = (level: number) => {
  return petLevelChart.find(l => l.level === level) || petLevelChart[0];
};

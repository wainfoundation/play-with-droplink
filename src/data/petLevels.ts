
export interface PetLevel {
  level: number;
  name: string;
  requiredStats: number;
  dailyCoins: number;
  description: string;
  unlocks: string[];
}

export const petLevelChart: PetLevel[] = [
  {
    level: 0,
    name: "Newborn",
    requiredStats: 0,
    dailyCoins: 50,
    description: "Your pet is just starting its journey!",
    unlocks: ["Basic care actions"]
  },
  {
    level: 1,
    name: "Happy Baby",
    requiredStats: 100,
    dailyCoins: 60,
    description: "Your pet is learning to be happy!",
    unlocks: ["Room navigation", "Basic shop items"]
  },
  {
    level: 2,
    name: "Energetic Child",
    requiredStats: 200,
    dailyCoins: 70,
    description: "Full of energy and ready to play!",
    unlocks: ["More room themes", "Toy categories"]
  },
  {
    level: 3,
    name: "Healthy Teen",
    requiredStats: 300,
    dailyCoins: 80,
    description: "Growing strong and healthy!",
    unlocks: ["Health items", "Premium food"]
  },
  {
    level: 4,
    name: "Smart Adult",
    requiredStats: 400,
    dailyCoins: 90,
    description: "Your pet is wise and well-cared for!",
    unlocks: ["Luxury items", "Special themes"]
  },
  {
    level: 5,
    name: "Wise Elder",
    requiredStats: 500,
    dailyCoins: 100,
    description: "A perfectly balanced and content pet!",
    unlocks: ["Legendary items", "All content"]
  },
  {
    level: 6,
    name: "Legendary Pet",
    requiredStats: 600,
    dailyCoins: 120,
    description: "Your pet has transcended normal limits!",
    unlocks: ["Mythical items", "Secret rooms"]
  },
  {
    level: 7,
    name: "Mythical Being",
    requiredStats: 700,
    dailyCoins: 150,
    description: "A creature of legend and wonder!",
    unlocks: ["Divine items", "Cosmic themes"]
  },
  {
    level: 8,
    name: "Cosmic Entity",
    requiredStats: 800,
    dailyCoins: 200,
    description: "Your pet commands the very stars!",
    unlocks: ["Universal items", "Reality-bending powers"]
  },
  {
    level: 9,
    name: "Universal Guardian",
    requiredStats: 900,
    dailyCoins: 250,
    description: "Protector of all dimensions!",
    unlocks: ["Omnipotent items", "Multiverse access"]
  },
  {
    level: 10,
    name: "Eternal Companion",
    requiredStats: 1000,
    dailyCoins: 300,
    description: "Beyond time and space - the perfect pet!",
    unlocks: ["Everything", "Infinite possibilities"]
  }
];

export default petLevelChart;

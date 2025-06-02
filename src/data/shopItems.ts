
export interface ShopItem {
  id: string;
  name: string;
  category: 'food' | 'hygiene' | 'play' | 'cosmetic' | 'theme' | 'medicine';
  price: number;
  effect: {
    hunger?: number;
    cleanliness?: number;
    energy?: number;
    happiness?: number;
    health?: number;
    affection?: number;
  };
  description: string;
  emoji: string;
}

export const shopItems: ShopItem[] = [
  // Food Items
  {
    id: "apple",
    name: "Apple",
    category: "food",
    price: 2,
    effect: { hunger: 25 },
    description: "A crispy red apple that restores hunger",
    emoji: "🍎"
  },
  {
    id: "sandwich",
    name: "Sandwich",
    category: "food", 
    price: 4,
    effect: { hunger: 40 },
    description: "A delicious sandwich for bigger appetite",
    emoji: "🥪"
  },
  {
    id: "pizza",
    name: "Pizza Slice",
    category: "food",
    price: 6,
    effect: { hunger: 60, happiness: 10 },
    description: "Tasty pizza that makes pets extra happy",
    emoji: "🍕"
  },

  // Hygiene Items
  {
    id: "soap",
    name: "Soap Bar",
    category: "hygiene",
    price: 3,
    effect: { cleanliness: 30 },
    description: "Basic soap for everyday cleaning",
    emoji: "🧼"
  },
  {
    id: "shampoo",
    name: "Premium Shampoo",
    category: "hygiene",
    price: 5,
    effect: { cleanliness: 50, happiness: 5 },
    description: "Luxury shampoo that smells amazing",
    emoji: "🧴"
  },

  // Play Items
  {
    id: "toy_ball",
    name: "Bouncy Ball",
    category: "play",
    price: 4,
    effect: { energy: 30, happiness: 15 },
    description: "A fun ball that boosts energy and mood",
    emoji: "⚽"
  },
  {
    id: "puzzle_toy",
    name: "Puzzle Toy",
    category: "play",
    price: 8,
    effect: { energy: 40, happiness: 20 },
    description: "Interactive puzzle that stimulates the mind",
    emoji: "🧩"
  },

  // Medicine
  {
    id: "health_potion",
    name: "Health Potion",
    category: "medicine",
    price: 10,
    effect: { health: 50, happiness: 5 },
    description: "Restores health when your pet is sick",
    emoji: "💊"
  },

  // Cosmetics
  {
    id: "rainbow_hat",
    name: "Rainbow Hat",
    category: "cosmetic",
    price: 15,
    effect: { happiness: 10, affection: 10 },
    description: "A colorful hat that makes pets feel special",
    emoji: "🎩"
  },
  {
    id: "bow_tie",
    name: "Elegant Bow Tie",
    category: "cosmetic", 
    price: 12,
    effect: { happiness: 8, affection: 8 },
    description: "Classy bow tie for formal occasions",
    emoji: "🎀"
  },

  // Themes
  {
    id: "forest_theme",
    name: "Forest Theme",
    category: "theme",
    price: 20,
    effect: { happiness: 15, energy: 10 },
    description: "Peaceful forest background with nature sounds",
    emoji: "🌲"
  },
  {
    id: "beach_theme", 
    name: "Beach Theme",
    category: "theme",
    price: 25,
    effect: { happiness: 20, cleanliness: 5 },
    description: "Relaxing beach scene with ocean waves",
    emoji: "🏖️"
  }
];

export const shopCategories = [
  { id: 'food', name: 'Food', emoji: '🍎', color: 'bg-red-100' },
  { id: 'hygiene', name: 'Hygiene', emoji: '🧼', color: 'bg-blue-100' },
  { id: 'play', name: 'Play', emoji: '⚽', color: 'bg-green-100' },
  { id: 'medicine', name: 'Medicine', emoji: '💊', color: 'bg-purple-100' },
  { id: 'cosmetic', name: 'Cosmetics', emoji: '🎩', color: 'bg-pink-100' },
  { id: 'theme', name: 'Themes', emoji: '🌲', color: 'bg-yellow-100' }
];

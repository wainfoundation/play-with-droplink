
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rarity: string;
  emoji?: string;
  effect: {
    hunger?: number;
    happiness?: number;
    energy?: number;
    health?: number;
    cleanliness?: number;
    affection?: number;
  };
  imageUrl?: string;
}

export interface ShopCategory {
  id: string;
  name: string;
  emoji: string;
}

export const shopCategories: ShopCategory[] = [
  { id: 'food', name: 'Food', emoji: '🍎' },
  { id: 'toy', name: 'Toys', emoji: '🎾' },
  { id: 'medicine', name: 'Health', emoji: '💊' },
  { id: 'cleaning', name: 'Cleaning', emoji: '🧼' },
  { id: 'luxury', name: 'Luxury', emoji: '💎' },
  { id: 'theme', name: 'Themes', emoji: '🎨' },
  { id: 'special', name: 'Special', emoji: '✨' }
];

export const shopItems: ShopItem[] = [
  // Food Items
  {
    id: 'apple',
    name: 'Red Apple',
    description: 'A crispy, fresh apple that restores hunger and adds happiness.',
    price: 5,
    category: 'food',
    rarity: 'common',
    emoji: '🍎',
    effect: { hunger: 25, happiness: 5 }
  },
  {
    id: 'pizza',
    name: 'Pizza Slice',
    description: 'Delicious pizza slice! Restores lots of hunger.',
    price: 15,
    category: 'food',
    rarity: 'common',
    emoji: '🍕',
    effect: { hunger: 40, happiness: 10 }
  },
  {
    id: 'cake',
    name: 'Birthday Cake',
    description: 'Special cake that makes your pet very happy!',
    price: 30,
    category: 'food',
    rarity: 'rare',
    emoji: '🎂',
    effect: { hunger: 30, happiness: 25 }
  },

  // Toys
  {
    id: 'ball',
    name: 'Bouncy Ball',
    description: 'A fun ball to play with. Increases energy and happiness.',
    price: 10,
    category: 'toy',
    rarity: 'common',
    emoji: '🎾',
    effect: { happiness: 15, energy: 10 }
  },
  {
    id: 'frisbee',
    name: 'Flying Frisbee',
    description: 'Great for outdoor play! Boosts energy and happiness.',
    price: 20,
    category: 'toy',
    rarity: 'common',
    emoji: '🥏',
    effect: { happiness: 20, energy: 15 }
  },

  // Health Items
  {
    id: 'medicine',
    name: 'Health Potion',
    description: 'Restores health but tastes bitter.',
    price: 25,
    category: 'medicine',
    rarity: 'common',
    emoji: '💊',
    effect: { health: 30, happiness: -5 }
  },
  {
    id: 'vitamin',
    name: 'Energy Vitamin',
    description: 'Boosts energy and health without side effects.',
    price: 40,
    category: 'medicine',
    rarity: 'rare',
    emoji: '💉',
    effect: { health: 20, energy: 25 }
  },

  // Cleaning Items
  {
    id: 'soap',
    name: 'Bubble Soap',
    description: 'Makes bath time fun! Increases cleanliness and happiness.',
    price: 8,
    category: 'cleaning',
    rarity: 'common',
    emoji: '🧼',
    effect: { cleanliness: 30, happiness: 10 }
  },
  {
    id: 'shampoo',
    name: 'Premium Shampoo',
    description: 'Luxury shampoo that makes your pet sparkle clean.',
    price: 35,
    category: 'cleaning',
    rarity: 'rare',
    emoji: '🧴',
    effect: { cleanliness: 50, happiness: 15, health: 5 }
  },

  // Luxury Items
  {
    id: 'diamond_collar',
    name: 'Diamond Collar',
    description: 'Extremely rare luxury item that boosts all stats!',
    price: 500,
    category: 'luxury',
    rarity: 'legendary',
    emoji: '💎',
    effect: { happiness: 30, health: 20, energy: 20, affection: 25 }
  },
  {
    id: 'golden_food_bowl',
    name: 'Golden Food Bowl',
    description: 'Makes every meal special. Permanent happiness boost.',
    price: 200,
    category: 'luxury',
    rarity: 'epic',
    emoji: '🏆',
    effect: { happiness: 20, affection: 15 }
  },

  // Room Themes
  {
    id: 'theme_bedroom_space',
    name: 'Space Bedroom Theme',
    description: 'Transform your bedroom into a cosmic wonderland!',
    price: 100,
    category: 'theme',
    rarity: 'rare',
    emoji: '🚀',
    effect: { happiness: 5, energy: 5 }
  },
  {
    id: 'theme_playroom_rainbow',
    name: 'Rainbow Playroom Theme',
    description: 'Colorful rainbow theme for the playroom!',
    price: 120,
    category: 'theme',
    rarity: 'rare',
    emoji: '🌈',
    effect: { happiness: 10 }
  },
  {
    id: 'theme_bathroom_ocean',
    name: 'Ocean Bathroom Theme',
    description: 'Underwater paradise for bath time!',
    price: 90,
    category: 'theme',
    rarity: 'rare',
    emoji: '🌊',
    effect: { cleanliness: 5, happiness: 5 }
  },

  // Special Items
  {
    id: 'love_potion',
    name: 'Love Potion',
    description: 'Magical potion that boosts affection tremendously!',
    price: 75,
    category: 'special',
    rarity: 'epic',
    emoji: '💖',
    effect: { affection: 40, happiness: 20 }
  },
  {
    id: 'energy_crystal',
    name: 'Energy Crystal',
    description: 'Mystical crystal that provides unlimited energy for a while.',
    price: 150,
    category: 'special',
    rarity: 'epic',
    emoji: '⚡',
    effect: { energy: 50, health: 10 }
  }
];

export default shopItems;


export interface CharacterCustomization {
  id: string;
  name: string;
  color: string;
  background: string;
  accessories: string[];
  stats: CharacterStats;
  tutorial_completed: boolean;
  unlocked_rooms: string[];
  created_at: string;
  updated_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'color' | 'clothes' | 'accessory' | 'eyewear' | 'hat' | 'background' | 'room';
  price: number;
  currency: 'pi' | 'coins' | 'ad';
  preview_url?: string;
  description?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface CharacterStats {
  happiness: number;
  energy: number;
  cleanliness: number;
  hunger: number;
}

export interface PetInteraction {
  type: 'feed' | 'play' | 'clean' | 'sleep';
  happiness_gain: number;
  energy_change: number;
}

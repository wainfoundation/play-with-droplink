
export interface CharacterCustomization {
  id: string;
  name: string;
  color: string;
  clothes: string[];
  accessories: string[];
  eyewear?: string;
  hat?: string;
  background: string;
  room: string;
  created_at: string;
  updated_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'color' | 'clothes' | 'accessory' | 'eyewear' | 'hat' | 'background' | 'room';
  price: number;
  currency: 'pi' | 'ad';
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
  type: 'feed' | 'play' | 'clean' | 'rest';
  timestamp: string;
  happiness_gain: number;
  energy_change: number;
}

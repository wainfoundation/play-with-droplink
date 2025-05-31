
export interface CharacterCustomization {
  id: string;
  name: string;
  color: string;
  clothes: string[];
  accessories: string[];
  background: string;
  room: string;
  created_at: string;
  updated_at: string;
}

export interface CharacterStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  currency: 'coins' | 'pi';
  category: 'hair' | 'clothes' | 'accessories' | 'decoration';
  preview: string;
  description?: string;
}

export interface PetInteraction {
  type: 'feed' | 'play' | 'clean' | 'sleep';
  effect: {
    happiness?: number;
    hunger?: number;
    cleanliness?: number;
    energy?: number;
  };
  coins_earned: number;
}

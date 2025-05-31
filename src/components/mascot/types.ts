
export interface MascotStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  energy: number;
}

export interface MascotProps {
  onMoodChange: (mood: number) => void;
  soundEnabled: boolean;
}

export interface MascotState {
  stats: MascotStats;
  outfit: string;
  isAnimating: boolean;
  lastAction: string;
}

export interface OutfitConfig {
  color: string;
  accessory: string | null;
}

export interface Outfits {
  [key: string]: OutfitConfig;
}


export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  color: string;
  mood: string;
  personality: string;
}

export const characters: Character[] = [
  {
    id: 'droplet-blue',
    name: 'Aqua',
    gender: 'female',
    color: '#3B82F6',
    mood: 'happy',
    personality: 'Cheerful and energetic, loves to play games!'
  },
  {
    id: 'droplet-pink',
    name: 'Rosie',
    gender: 'female',
    color: '#EC4899',
    mood: 'excited',
    personality: 'Sweet and caring, always ready to help!'
  },
  {
    id: 'droplet-green',
    name: 'Sage',
    gender: 'male',
    color: '#10B981',
    mood: 'calm',
    personality: 'Wise and peaceful, enjoys quiet moments.'
  },
  {
    id: 'droplet-purple',
    name: 'Luna',
    gender: 'female',
    color: '#8B5CF6',
    mood: 'mysterious',
    personality: 'Mysterious and magical, full of surprises!'
  },
  {
    id: 'droplet-orange',
    name: 'Sunny',
    gender: 'male',
    color: '#F59E0B',
    mood: 'playful',
    personality: 'Bright and optimistic, spreads joy everywhere!'
  },
  {
    id: 'droplet-red',
    name: 'Blaze',
    gender: 'male',
    color: '#EF4444',
    mood: 'energetic',
    personality: 'Bold and adventurous, always up for challenges!'
  }
];

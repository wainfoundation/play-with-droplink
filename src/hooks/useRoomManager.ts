
import { useState, useEffect, useCallback } from 'react';

interface RoomTheme {
  id: string;
  room: string;
  name: string;
  price_coins: number;
  background_image: string;
  background_color: string;
  isPurchased: boolean;
  isDefault: boolean;
}

interface RoomMood {
  room: string;
  primaryMood: string;
  secondaryMood: string;
  energyModifier: number;
  happinessModifier: number;
}

const defaultThemes: RoomTheme[] = [
  {
    id: 'theme_bedroom_default',
    room: 'bedroom',
    name: 'Cozy Bedroom',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50',
    isPurchased: true,
    isDefault: true
  },
  {
    id: 'theme_playroom_default',
    room: 'playroom',
    name: 'Colorful Playroom',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50',
    isPurchased: true,
    isDefault: true
  },
  {
    id: 'theme_bathroom_default',
    room: 'bathroom',
    name: 'Clean Bathroom',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-50',
    isPurchased: true,
    isDefault: true
  },
  {
    id: 'theme_kitchen_default',
    room: 'kitchen',
    name: 'Warm Kitchen',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50',
    isPurchased: true,
    isDefault: true
  },
  {
    id: 'theme_medicine_default',
    room: 'medicine',
    name: 'Medical Room',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-gray-100 via-white to-blue-50',
    isPurchased: true,
    isDefault: true
  },
  {
    id: 'theme_outside_default',
    room: 'outside',
    name: 'Sunny Garden',
    price_coins: 0,
    background_image: '',
    background_color: 'bg-gradient-to-br from-green-200 via-emerald-50 to-lime-100',
    isPurchased: true,
    isDefault: true
  }
];

const roomMoods: RoomMood[] = [
  {
    room: 'bedroom',
    primaryMood: 'sleepy',
    secondaryMood: 'calm',
    energyModifier: -10,
    happinessModifier: 5
  },
  {
    room: 'playroom',
    primaryMood: 'playful',
    secondaryMood: 'happy',
    energyModifier: 10,
    happinessModifier: 15
  },
  {
    room: 'bathroom',
    primaryMood: 'clean',
    secondaryMood: 'refreshed',
    energyModifier: 5,
    happinessModifier: 10
  },
  {
    room: 'kitchen',
    primaryMood: 'hungry',
    secondaryMood: 'excited',
    energyModifier: 0,
    happinessModifier: 5
  },
  {
    room: 'medicine',
    primaryMood: 'sick',
    secondaryMood: 'healing',
    energyModifier: -5,
    happinessModifier: -5
  },
  {
    room: 'outside',
    primaryMood: 'adventurous',
    secondaryMood: 'energetic',
    energyModifier: 15,
    happinessModifier: 20
  }
];

export const useRoomManager = () => {
  const [currentRoom, setCurrentRoom] = useState('bedroom');
  const [themes, setThemes] = useState<RoomTheme[]>(defaultThemes);
  const [selectedThemes, setSelectedThemes] = useState<{[room: string]: string}>({});

  // Load from localStorage on init
  useEffect(() => {
    const savedRoom = localStorage.getItem('droplet_current_room');
    const savedThemes = localStorage.getItem('droplet_themes');
    const savedSelectedThemes = localStorage.getItem('droplet_selected_themes');
    
    if (savedRoom) setCurrentRoom(savedRoom);
    if (savedThemes) {
      try {
        setThemes(JSON.parse(savedThemes));
      } catch (e) {
        console.log('Error loading themes, using defaults');
      }
    }
    if (savedSelectedThemes) {
      try {
        setSelectedThemes(JSON.parse(savedSelectedThemes));
      } catch (e) {
        console.log('Error loading selected themes, using defaults');
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('droplet_current_room', currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    localStorage.setItem('droplet_themes', JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem('droplet_selected_themes', JSON.stringify(selectedThemes));
  }, [selectedThemes]);

  const changeRoom = useCallback((roomId: string) => {
    setCurrentRoom(roomId);
  }, []);

  const getCurrentTheme = useCallback(() => {
    const selectedThemeId = selectedThemes[currentRoom];
    const theme = themes.find(t => t.id === selectedThemeId) || 
                  themes.find(t => t.room === currentRoom && t.isDefault);
    return theme || defaultThemes[0];
  }, [currentRoom, themes, selectedThemes]);

  const getCurrentMood = useCallback(() => {
    return roomMoods.find(m => m.room === currentRoom) || roomMoods[0];
  }, [currentRoom]);

  const purchaseTheme = useCallback((themeId: string, cost: number) => {
    setThemes(prev => prev.map(theme => 
      theme.id === themeId 
        ? { ...theme, isPurchased: true }
        : theme
    ));
    return true;
  }, []);

  const selectTheme = useCallback((themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme && theme.isPurchased) {
      setSelectedThemes(prev => ({
        ...prev,
        [theme.room]: themeId
      }));
      return true;
    }
    return false;
  }, [themes]);

  return {
    currentRoom,
    themes,
    selectedThemes,
    changeRoom,
    getCurrentTheme,
    getCurrentMood,
    purchaseTheme,
    selectTheme
  };
};

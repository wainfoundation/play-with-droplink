
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePetEconomy } from './usePetEconomy';

export type MascotStage = 'baby' | 'kid' | 'teen' | 'adult' | 'old';

interface MascotState {
  stage: MascotStage;
  ageDays: number;
  xp: number;
  xpToNext: number;
  stats: {
    hunger: number;
    mood: number;
    energy: number;
    hygiene: number;
    social: number;
  };
  roomsUnlocked: string[];
  featuresUnlocked: string[];
  lastFed: string;
  lastPlayed: string;
  lastActivity: string;
}

const STAGE_REQUIREMENTS = {
  baby: { minXP: 0, maxAgeDays: 7 },
  kid: { minXP: 500, maxAgeDays: 30 },
  teen: { minXP: 1500, maxAgeDays: 90 },
  adult: { minXP: 5000, maxAgeDays: 365 },
  old: { minXP: 10000, maxAgeDays: Infinity }
};

const STAGE_FEATURES = {
  baby: ['basic_care', 'bedroom', 'feeding_room'],
  kid: ['link_scheduling', 'qr_codes', 'play_room', 'nature_room'],
  teen: ['analytics', 'custom_themes', 'social_room', 'library'],
  adult: ['product_sales', 'branding_removal', 'work_room', 'business_hub'],
  old: ['community_rewards', 'legacy_badges', 'memory_room', 'garden']
};

export const useMascotProgression = () => {
  const { user } = useAuth();
  const { earnCoins } = usePetEconomy('droplet-blue');
  
  const [mascotState, setMascotState] = useState<MascotState>({
    stage: 'baby',
    ageDays: 0,
    xp: 0,
    xpToNext: 500,
    stats: {
      hunger: 80,
      mood: 85,
      energy: 90,
      hygiene: 95,
      social: 50
    },
    roomsUnlocked: ['bedroom', 'feeding_room'],
    featuresUnlocked: ['basic_care'],
    lastFed: new Date().toISOString(),
    lastPlayed: new Date().toISOString(),
    lastActivity: new Date().toISOString()
  });

  // Load mascot state from localStorage
  useEffect(() => {
    if (!user) return;
    
    const savedState = localStorage.getItem(`mascot_${user.id}`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setMascotState(parsed);
      } catch (error) {
        console.log('Error loading mascot state');
      }
    }
  }, [user]);

  // Save mascot state to localStorage
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`mascot_${user.id}`, JSON.stringify(mascotState));
  }, [mascotState, user]);

  // Calculate age in days
  const calculateAge = useCallback(() => {
    const createdDate = new Date(mascotState.lastActivity);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [mascotState.lastActivity]);

  // Determine mascot stage based on XP and age
  const determineStage = useCallback((xp: number, ageDays: number): MascotStage => {
    if (xp >= STAGE_REQUIREMENTS.old.minXP) return 'old';
    if (xp >= STAGE_REQUIREMENTS.adult.minXP) return 'adult';
    if (xp >= STAGE_REQUIREMENTS.teen.minXP) return 'teen';
    if (xp >= STAGE_REQUIREMENTS.kid.minXP) return 'kid';
    return 'baby';
  }, []);

  // Add XP and check for evolution
  const addXP = useCallback((amount: number, activity: string) => {
    setMascotState(prev => {
      const newXP = prev.xp + amount;
      const currentAge = calculateAge();
      const newStage = determineStage(newXP, currentAge);
      
      // Calculate XP needed for next stage
      const nextStageXP = Object.entries(STAGE_REQUIREMENTS)
        .find(([stage]) => STAGE_REQUIREMENTS[stage as MascotStage].minXP > newXP)?.[1]?.minXP || newXP;
      
      // Check if evolved
      const hasEvolved = newStage !== prev.stage;
      
      // Unlock new features if evolved
      const newFeatures = hasEvolved ? STAGE_FEATURES[newStage] : prev.featuresUnlocked;
      const newRooms = hasEvolved ? 
        [...prev.roomsUnlocked, ...STAGE_FEATURES[newStage].filter(f => f.includes('room'))] :
        prev.roomsUnlocked;

      return {
        ...prev,
        xp: newXP,
        xpToNext: nextStageXP - newXP,
        stage: newStage,
        ageDays: currentAge,
        featuresUnlocked: [...new Set([...prev.featuresUnlocked, ...newFeatures])],
        roomsUnlocked: [...new Set(newRooms)],
        lastActivity: new Date().toISOString()
      };
    });

    // Award coins for XP gain
    earnCoins(Math.floor(amount / 10));
    
    return `Gained ${amount} XP from ${activity}!`;
  }, [calculateAge, determineStage, earnCoins]);

  // Droplink activity XP rewards
  const droplinkActivity = {
    addLink: () => addXP(50, 'adding a new link'),
    updateProfile: () => addXP(25, 'updating profile'),
    shareLink: () => addXP(75, 'sharing a link'),
    getLinkClick: () => addXP(10, 'link click received'),
    dailyLogin: () => addXP(100, 'daily login'),
    communityEngagement: () => addXP(150, 'community engagement'),
    completeProfile: () => addXP(200, 'completing profile setup')
  };

  // Pet care activities
  const petCareActivity = {
    feedPet: () => {
      setMascotState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          hunger: Math.min(100, prev.stats.hunger + 25),
          mood: Math.min(100, prev.stats.mood + 10)
        },
        lastFed: new Date().toISOString()
      }));
      return addXP(20, 'feeding pet');
    },
    
    playWithPet: () => {
      setMascotState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          mood: Math.min(100, prev.stats.mood + 20),
          energy: Math.max(0, prev.stats.energy - 10),
          social: Math.min(100, prev.stats.social + 15)
        },
        lastPlayed: new Date().toISOString()
      }));
      return addXP(30, 'playing with pet');
    },
    
    bathePet: () => {
      setMascotState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          hygiene: Math.min(100, prev.stats.hygiene + 30),
          mood: Math.min(100, prev.stats.mood + 5)
        }
      }));
      return addXP(25, 'bathing pet');
    },
    
    restPet: () => {
      setMascotState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy: Math.min(100, prev.stats.energy + 40)
        }
      }));
      return addXP(15, 'resting pet');
    }
  };

  // Check if feature is unlocked
  const hasFeature = useCallback((feature: string) => {
    return mascotState.featuresUnlocked.includes(feature);
  }, [mascotState.featuresUnlocked]);

  // Check if room is unlocked
  const hasRoom = useCallback((room: string) => {
    return mascotState.roomsUnlocked.includes(room);
  }, [mascotState.roomsUnlocked]);

  // Get stage info
  const getStageInfo = useCallback(() => {
    return {
      current: mascotState.stage,
      requirements: STAGE_REQUIREMENTS[mascotState.stage],
      features: STAGE_FEATURES[mascotState.stage],
      nextStage: Object.keys(STAGE_REQUIREMENTS).find(stage => 
        STAGE_REQUIREMENTS[stage as MascotStage].minXP > mascotState.xp
      ) as MascotStage
    };
  }, [mascotState]);

  return {
    mascotState,
    droplinkActivity,
    petCareActivity,
    hasFeature,
    hasRoom,
    getStageInfo,
    addXP
  };
};

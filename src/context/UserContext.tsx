
import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  pi_domain?: string;
  custom_domain?: string;
  plan?: string;
  pi_wallet_address?: string;
  total_score?: number;
  games_played?: number;
  created_at?: string;
  updated_at?: string;
}

interface UserContextType {
  user: UserProfile | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  isAdmin: boolean;
  showAds: boolean;
  subscription: any;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  setIsAdmin: (isAdmin: boolean) => void;
  signOut: () => Promise<void>;
}

// Mock dev user for development mode
const DEV_USER: UserProfile = {
  id: 'dev-user-123',
  username: 'dev_user',
  display_name: 'Development User',
  plan: 'premium',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const UserContext = createContext<UserContextType>({
  user: DEV_USER,
  profile: DEV_USER,
  isLoggedIn: true,
  loading: false,
  isAdmin: true,
  showAds: false,
  subscription: { plan: 'premium', is_active: true },
  isLoading: false,
  refreshUser: async () => {},
  refreshUserData: async () => {},
  setIsAdmin: () => {},
  signOut: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  const refreshUser = async () => {
    // Development mode - no actual refresh needed
  };

  const signOut = async () => {
    // Development mode - no actual sign out
  };

  return (
    <UserContext.Provider 
      value={{ 
        user: DEV_USER,
        profile: DEV_USER,
        isLoggedIn: true,
        loading: false,
        isAdmin,
        showAds: false, // No ads in dev mode
        subscription: { plan: 'premium', is_active: true },
        isLoading: false,
        refreshUser,
        refreshUserData: refreshUser,
        setIsAdmin,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

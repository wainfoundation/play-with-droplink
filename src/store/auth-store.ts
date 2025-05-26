
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PiUser {
  uid: string;
  username: string;
  accessToken?: string;
  walletAddress?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  piUser: PiUser | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPiUser: (user: PiUser) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      piUser: null,
      isLoading: false,
      error: null,
      
      setPiUser: (user: PiUser) => set({
        piUser: user,
        isAuthenticated: true,
        error: null
      }),
      
      clearAuth: () => set({
        piUser: null,
        isAuthenticated: false,
        error: null
      }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      setError: (error: string | null) => set({ error })
    }),
    {
      name: 'pi-auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        piUser: state.piUser
      })
    }
  )
);

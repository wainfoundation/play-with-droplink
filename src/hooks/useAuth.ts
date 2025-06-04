
import { useState } from 'react';

interface User {
  id: string;
  email?: string;
  username?: string;
}

// Mock dev user
const DEV_USER: User = {
  id: 'dev-user-123',
  email: 'dev@example.com',
  username: 'dev_user'
};

export const useAuth = () => {
  const [user] = useState<User | null>(DEV_USER);
  const [loading] = useState(false);

  const signOut = async () => {
    // Development mode - no actual sign out
    return true;
  };

  const refreshSession = async () => {
    // Development mode - no actual refresh needed
  };

  return { 
    user, 
    loading, 
    signOut, 
    refreshSession 
  };
};

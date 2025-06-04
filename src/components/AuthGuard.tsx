
import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Development mode - always allow access without authentication
  return <>{children}</>;
};

export default AuthGuard;

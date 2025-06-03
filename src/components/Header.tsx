
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Coins } from 'lucide-react';

const Header: React.FC = () => {
  const { isLoggedIn, user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Droplet Pet</Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Button 
              variant="outline"
              onClick={() => navigate('/coin-store')}
              className="flex items-center gap-1"
            >
              <Coins className="w-4 h-4 text-yellow-500" />
              Coins
            </Button>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user?.username || 'User'}</span>
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

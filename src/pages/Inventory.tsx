
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';
import NavigationBar from '@/components/pet/NavigationBar';
import PetInventory from '@/components/pet/PetInventory';

const Inventory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Inventory - Manage Your Items</title>
        <meta name="description" content="View and manage your pet's items and accessories" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <IconButton
              icon={ArrowLeft}
              label="Back"
              onClick={() => navigate(-1)}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
            <h1 className="text-3xl font-bold">🎒 Inventory</h1>
            <IconButton
              icon={Home}
              label="Home"
              onClick={() => navigate('/play')}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
          </div>
        </div>
        
        <PetInventory onBack={() => navigate('/play')} />
        <NavigationBar />
      </div>
    </>
  );
};

export default Inventory;

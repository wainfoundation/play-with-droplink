
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';
import NavigationBar from '@/components/pet/NavigationBar';
import EnhancedItemShop from '@/components/shop/EnhancedItemShop';

const Shop: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Pet Shop - Buy Items for Your Droplet</title>
        <meta name="description" content="Purchase food, toys, and accessories for your virtual pet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pb-20">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <IconButton
              icon={ArrowLeft}
              label="Back"
              onClick={() => navigate(-1)}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
            <h1 className="text-3xl font-bold">🛍️ Pet Shop</h1>
            <IconButton
              icon={Home}
              label="Home"
              onClick={() => navigate('/play')}
              className="bg-white/20 hover:bg-white/30"
              size="sm"
            />
          </div>
        </div>
        
        <EnhancedItemShop onBack={() => navigate('/play')} />
        <NavigationBar />
      </div>
    </>
  );
};

export default Shop;

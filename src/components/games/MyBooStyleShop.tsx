
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Palette } from 'lucide-react';

interface MyBooStyleShopProps {
  character: any;
  onPurchase: (item: any) => void;
  userCoins: number;
}

const MyBooStyleShop: React.FC<MyBooStyleShopProps> = ({
  character,
  onPurchase,
  userCoins
}) => {
  const [selectedTab, setSelectedTab] = useState('hair');

  const shopCategories = [
    {
      id: 'hair',
      name: 'Hair',
      icon: '💇',
      color: 'bg-pink-500',
      items: [
        { id: 1, name: 'Blonde Hair', preview: '👱', price: 800, originalPrice: 800, discount: 0 },
        { id: 2, name: 'Brown Hair', preview: '🧑', price: 830, originalPrice: 830, discount: 0 },
        { id: 3, name: 'Red Hair', preview: '👩‍🦰', price: 300, originalPrice: 300, discount: 0 }
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: '👓',
      color: 'bg-purple-500', 
      items: [
        { id: 4, name: 'Cool Glasses', preview: '🕶️', price: 500, originalPrice: 500, discount: 0 },
        { id: 5, name: 'Hat', preview: '🎩', price: 750, originalPrice: 750, discount: 0 },
        { id: 6, name: 'Crown', preview: '👑', price: 1200, originalPrice: 1200, discount: 0 }
      ]
    }
  ];

  const currentCategory = shopCategories.find(cat => cat.id === selectedTab);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-3xl border-4 border-white shadow-2xl inline-block">
          <h2 className="text-white font-bold text-2xl tracking-wider drop-shadow-lg flex items-center gap-2">
            <Palette className="w-6 h-6" />
            STYLE
          </h2>
        </div>
      </div>

      {/* Character Preview */}
      <Card className="bg-gradient-to-b from-pink-200 to-purple-200 border-4 border-white shadow-2xl rounded-3xl">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">
            😊
          </div>
          <h3 className="font-bold text-2xl text-gray-800 mb-2">{character.name}</h3>
          
          {/* Style Categories */}
          <div className="flex justify-center gap-2 mb-4">
            <Button className="bg-cyan-500 text-white rounded-2xl px-4 py-2 border-2 border-white shadow-lg">
              <span className="text-sm">👕 Clothes</span>
            </Button>
            <Button className="bg-yellow-500 text-white rounded-2xl px-4 py-2 border-2 border-white shadow-lg relative">
              <span className="text-sm">🎨 Decorations</span>
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shop Section */}
      <Card className="bg-gradient-to-b from-purple-400 to-pink-400 border-4 border-white shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-2xl border-2 border-white shadow-lg inline-block">
              <span className="text-white font-bold text-xl">🛍️ The Shop</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Daily Sales Banner */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-2xl border-2 border-white shadow-lg mb-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white">50% OFF</Badge>
                <span className="font-bold">Daily Sales</span>
              </div>
              <div className="text-sm">21:51:18</div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4">
            {shopCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedTab(category.id)}
                className={`
                  ${selectedTab === category.id ? category.color : 'bg-gray-400'}
                  text-white rounded-2xl px-4 py-2 border-2 border-white shadow-lg
                `}
              >
                <span className="text-sm">
                  {category.icon} {category.name}
                </span>
              </Button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-3 gap-4">
            {currentCategory?.items.map((item) => (
              <Card key={item.id} className="bg-white border-2 border-gray-300 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-3 text-center">
                  <div className="text-3xl mb-2">{item.preview}</div>
                  <h4 className="font-bold text-xs text-gray-800 mb-2">{item.name}</h4>
                  
                  <div className="space-y-1">
                    {item.originalPrice > item.price && (
                      <div className="text-xs text-gray-500 line-through">
                        💰 {item.originalPrice}
                      </div>
                    )}
                    <div className="text-sm font-bold text-green-600">
                      💰 {item.price}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onPurchase(item)}
                    disabled={userCoins < item.price}
                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white text-xs py-1 rounded-xl"
                  >
                    Buy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBooStyleShop;

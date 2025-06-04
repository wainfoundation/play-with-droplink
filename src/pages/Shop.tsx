
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingBag, Palette, Shirt, Apple, Gamepad2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const Shop: React.FC = () => {
  const navigate = useNavigate();

  const shopCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: Apple,
      items: ['Apple', 'Bread', 'Fish', 'Cake'],
      priceRange: '2-50 coins',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'hygiene',
      name: 'Hygiene',
      icon: Palette,
      items: ['Soap', 'Shampoo', 'Towel', 'Toothbrush'],
      priceRange: '5-30 coins',
      color: 'bg-cyan-500 hover:bg-cyan-600'
    },
    {
      id: 'toys',
      name: 'Toys',
      icon: Gamepad2,
      items: ['Ball', 'Blocks', 'Puzzle', 'Frisbee'],
      priceRange: '10-100 coins',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'themes',
      name: 'Themes',
      icon: Palette,
      items: ['Beach Theme', 'Space Theme', 'Forest Theme'],
      priceRange: '200-5000 coins',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'skins',
      name: 'Skins',
      icon: Shirt,
      items: ['Summer Outfit', 'Winter Coat', 'Party Hat'],
      priceRange: '50-1000 coins',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Shop - Play with Droplink</title>
        <meta name="description" content="Buy items, food, toys, and themes for your pet droplet!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              🛒 Pet Shop
            </h1>
            <p className="text-lg text-gray-600">
              Buy everything your pet needs to stay happy and healthy!
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Your Coins: 150</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center mb-8">
            <IconButton
              icon={Home}
              label="Back Home"
              onClick={() => navigate('/play')}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>

          {/* Shop Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {shopCategories.map((category) => (
              <IconButton
                key={category.id}
                icon={category.icon}
                label={category.name}
                onClick={() => console.log(`Navigate to ${category.name}`)}
                className={category.color}
                size="lg"
              />
            ))}
          </div>

          {/* Detailed Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">
                      Price Range: {category.priceRange}
                    </p>
                    <div className="space-y-2">
                      {category.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{item}</span>
                          <Button size="sm" variant="outline">
                            Buy
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

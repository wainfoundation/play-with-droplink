
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingBag, Palette, Shirt } from 'lucide-react';

const Shop: React.FC = () => {
  const shopCategories = [
    {
      id: 'food',
      name: 'Food',
      icon: <ShoppingBag className="h-6 w-6" />,
      items: ['Apple', 'Bread', 'Fish', 'Cake'],
      priceRange: '2-50 coins'
    },
    {
      id: 'hygiene',
      name: 'Hygiene',
      icon: <Palette className="h-6 w-6" />,
      items: ['Soap', 'Shampoo', 'Towel', 'Toothbrush'],
      priceRange: '5-30 coins'
    },
    {
      id: 'toys',
      name: 'Toys',
      icon: <ShoppingBag className="h-6 w-6" />,
      items: ['Ball', 'Blocks', 'Puzzle', 'Frisbee'],
      priceRange: '10-100 coins'
    },
    {
      id: 'themes',
      name: 'Themes',
      icon: <Palette className="h-6 w-6" />,
      items: ['Beach Theme', 'Space Theme', 'Forest Theme'],
      priceRange: '200-5000 coins'
    },
    {
      id: 'skins',
      name: 'Skins',
      icon: <Shirt className="h-6 w-6" />,
      items: ['Summer Outfit', 'Winter Coat', 'Party Hat'],
      priceRange: '50-1000 coins'
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Pet Shop
            </h1>
            <p className="text-lg text-gray-600">
              Buy everything your pet needs to stay happy and healthy!
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Your Coins: 150</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {category.icon}
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

          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
              className="mr-4"
            >
              Back to Game
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              View Inventory
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

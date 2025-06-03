
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Shirt, Apple, Toy } from 'lucide-react';

const Inventory: React.FC = () => {
  const inventoryItems = [
    { id: 1, name: 'Apple', type: 'food', quantity: 5, icon: <Apple className="h-5 w-5" /> },
    { id: 2, name: 'Ball', type: 'toy', quantity: 2, icon: <Toy className="h-5 w-5" /> },
    { id: 3, name: 'Summer Outfit', type: 'clothing', quantity: 1, icon: <Shirt className="h-5 w-5" /> },
  ];

  return (
    <>
      <Helmet>
        <title>Inventory - Play with Droplink</title>
        <meta name="description" content="Manage your pet items and equipment" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Your Inventory
            </h1>
            <p className="text-lg text-gray-600">
              Manage and use your items to care for your pet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventoryItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {item.icon}
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      Type: {item.type}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Use
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Equip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {inventoryItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Your inventory is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Visit the shop to buy items for your pet!
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                Go to Shop
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Back to Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;

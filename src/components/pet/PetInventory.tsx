
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Shirt, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import { shopItems } from '@/data/shopItems';
import { toast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  user_id: string;
  item_id: string;
  quantity: number;
  equipped: boolean;
  created_at: string;
}

interface PetInventoryProps {
  onBack: () => void;
}

const PetInventory: React.FC<PetInventoryProps> = ({ onBack }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { user } = useAuthSystem();

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'food', name: 'Food', icon: Utensils },
    { id: 'accessories', name: 'Accessories', icon: Shirt },
    { id: 'themes', name: 'Themes', icon: Package }
  ];

  useEffect(() => {
    if (user) {
      loadInventory();
    }
  }, [user]);

  const loadInventory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_inventory')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
      toast({
        title: "Error",
        description: "Failed to load inventory",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const useItem = async (itemId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('use_item', {
        p_user_id: user.id,
        p_item_id: itemId
      });

      if (error) throw error;

      // Refresh inventory
      await loadInventory();

      toast({
        title: "Item Used",
        description: `Successfully used item!`,
        className: "bg-green-50 border-green-200"
      });
    } catch (error) {
      console.error('Error using item:', error);
      toast({
        title: "Error",
        description: "Failed to use item",
        variant: "destructive"
      });
    }
  };

  const toggleEquip = async (itemId: string, currentlyEquipped: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('toggle_equip_item', {
        p_user_id: user.id,
        p_item_id: itemId,
        p_equip: !currentlyEquipped
      });

      if (error) throw error;

      // Refresh inventory
      await loadInventory();

      toast({
        title: currentlyEquipped ? "Item Unequipped" : "Item Equipped",
        description: `Item ${currentlyEquipped ? 'unequipped' : 'equipped'} successfully!`,
        className: "bg-blue-50 border-blue-200"
      });
    } catch (error) {
      console.error('Error toggling equip:', error);
      toast({
        title: "Error",
        description: "Failed to toggle item",
        variant: "destructive"
      });
    }
  };

  const getItemDetails = (itemId: string) => {
    return shopItems.find(item => item.id === itemId);
  };

  const filteredInventory = selectedCategory === 'all' 
    ? inventory 
    : inventory.filter(item => {
        const itemDetails = getItemDetails(item.item_id);
        return itemDetails?.category === selectedCategory;
      });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center gap-2 justify-center">
            <Package className="h-8 w-8 text-purple-500" />
            My Inventory
          </h1>
          <p className="text-gray-600">Manage your collected items!</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Item Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      {filteredInventory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInventory.map(item => {
            const itemDetails = getItemDetails(item.item_id);
            if (!itemDetails) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full ${item.equipped ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-2">{itemDetails.emoji}</div>
                    <CardTitle className="text-lg">{itemDetails.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      {itemDetails.description}
                    </p>
                    
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline">
                        Qty: {item.quantity}
                      </Badge>
                      <Badge variant={item.equipped ? "default" : "secondary"}>
                        {item.equipped ? "Equipped" : "Not Equipped"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {itemDetails.category === 'food' ? (
                        <Button
                          onClick={() => useItem(item.item_id)}
                          className="w-full"
                          disabled={item.quantity <= 0}
                        >
                          Use Item
                        </Button>
                      ) : (
                        <Button
                          onClick={() => toggleEquip(item.item_id, item.equipped)}
                          variant={item.equipped ? "destructive" : "default"}
                          className="w-full"
                        >
                          {item.equipped ? "Unequip" : "Equip"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">
              {selectedCategory === 'all' ? 'No items yet' : `No ${selectedCategory} items`}
            </h3>
            <p className="text-gray-600 mb-4">
              Visit the shop to buy items for your pet!
            </p>
            <Button onClick={onBack}>
              Go to Shop
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PetInventory;

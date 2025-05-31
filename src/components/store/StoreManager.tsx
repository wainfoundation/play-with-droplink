
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShirtIcon,
  GlassesIcon,
  HomeIcon,
  PaletteIcon,
  ShoppingCartIcon,
  CoinsIcon,
  PlayIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface StoreItem {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  rarity: string;
  image_url?: string;
}

interface StoreManagerProps {
  onPurchase: (item: StoreItem) => void;
  soundEnabled: boolean;
}

const StoreManager: React.FC<StoreManagerProps> = ({ onPurchase, soundEnabled }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);

  const categories = {
    clothing: {
      name: "Clothing",
      icon: ShirtIcon,
      color: "bg-blue-500",
      types: ['tops', 'bottoms', 'outfits', 'outerwear']
    },
    accessory: {
      name: "Accessories", 
      icon: GlassesIcon,
      color: "bg-purple-500",
      types: ['eyewear', 'hats', 'jewelry']
    },
    furniture: {
      name: "Furniture",
      icon: HomeIcon,
      color: "bg-green-500",
      types: ['bedroom', 'gaming', 'study']
    },
    decoration: {
      name: "Decorations",
      icon: PaletteIcon,
      color: "bg-orange-500",
      types: ['nature', 'lighting']
    },
    background: {
      name: "Backgrounds",
      icon: PaletteIcon,
      color: "bg-pink-500",
      types: ['nature', 'fantasy', 'urban']
    }
  };

  useEffect(() => {
    fetchStoreItems();
    fetchUserPurchases();
  }, [user]);

  const fetchStoreItems = async () => {
    try {
      const { data, error } = await supabase
        .from('store_items')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setStoreItems(data || []);
    } catch (error) {
      console.error('Error fetching store items:', error);
      toast({
        title: "Error",
        description: "Failed to load store items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchases = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_purchases')
        .select('item_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserPurchases(data?.map(p => p.item_id) || []);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  const handlePurchase = async (item: StoreItem) => {
    if (!user?.id) {
      toast({
        title: "Login Required",
        description: "Please log in to make purchases",
        variant: "destructive"
      });
      return;
    }

    if (userPurchases.includes(item.id)) {
      toast({
        title: "Already Owned",
        description: "You already own this item!",
        variant: "destructive"
      });
      return;
    }

    onPurchase(item);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getItemsByType = (type: string) => {
    return storeItems.filter(item => item.type === type);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <ShoppingCartIcon className="w-8 h-8" />
          Droplink Store
        </h2>
        <p className="text-gray-600">Customize your character and room with amazing items!</p>
      </div>

      <Tabs defaultValue="clothing" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {Object.entries(categories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs">
              <category.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="w-6 h-6" />
                  {category.name}
                </CardTitle>
                <CardDescription>
                  Browse our collection of {category.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getItemsByType(key).map(item => {
                    const isOwned = userPurchases.includes(item.id);
                    return (
                      <Card key={item.id} className={`relative ${isOwned ? 'opacity-75' : ''}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <Badge className={`${getRarityColor(item.rarity)} text-white`}>
                              {item.rarity}
                            </Badge>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {item.currency === 'pi' ? (
                                <CoinsIcon className="w-4 h-4 text-yellow-500" />
                              ) : (
                                <PlayIcon className="w-4 h-4 text-green-500" />
                              )}
                              <span className="font-semibold">
                                {item.currency === 'pi' ? `${item.price} π` : 'Watch Ad'}
                              </span>
                            </div>
                            <Button
                              onClick={() => handlePurchase(item)}
                              disabled={isOwned}
                              variant={isOwned ? "secondary" : "default"}
                              size="sm"
                            >
                              {isOwned ? 'Owned' : 'Buy'}
                            </Button>
                          </div>
                        </CardContent>
                        {isOwned && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary">✓ Owned</Badge>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StoreManager;

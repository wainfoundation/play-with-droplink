
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { shopItems, shopCategories, ShopItem } from '@/data/shopItems';
import { useWallet } from '@/hooks/useWallet';
import { useInventory } from '@/hooks/useInventory';
import { toast } from '@/hooks/use-toast';
import WalletDisplay from './WalletDisplay';
import ShopItemCard from './ShopItemCard';

interface PetShopProps {
  onBack: () => void;
  onItemPurchased?: (item: ShopItem) => void;
}

const PetShop: React.FC<PetShopProps> = ({ onBack, onItemPurchased }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { wallet, spendCoins, addCoins } = useWallet();
  const { inventory, addItem, hasItem } = useInventory();

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;

    if (wallet.dropletCoins < item.price) {
      toast({
        title: "Not enough coins!",
        description: `You need ${item.price - wallet.dropletCoins} more coins to buy ${item.name}`,
        variant: "destructive"
      });
      return;
    }

    const success = spendCoins(item.price);
    if (success) {
      addItem(item.id);
      onItemPurchased?.(item);
      toast({
        title: "Purchase successful!",
        description: `You bought ${item.name} for ${item.price} coins!`,
        className: "bg-green-50 border-green-200"
      });
    }
  };

  const handleWatchAd = () => {
    // Simulate Pi Ad reward
    addCoins(1, 'ad');
    toast({
      title: "Ad reward claimed!",
      description: "You earned 1 Droplet Coin for watching an ad!",
      className: "bg-green-50 border-green-200"
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = inventory.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

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
            <ShoppingBag className="h-8 w-8 text-blue-500" />
            Pet Shop
          </h1>
          <p className="text-gray-600">Buy items to care for your pet!</p>
        </div>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Wallet Display */}
      <WalletDisplay 
        dropletCoins={wallet.dropletCoins}
        onWatchAd={handleWatchAd}
        className="max-w-md mx-auto"
      />

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-2"
            >
              🛒 All Items
            </Button>
            {shopCategories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShopItemCard
              item={item}
              canAfford={wallet.dropletCoins >= item.price}
              owned={getItemQuantity(item.id)}
              onPurchase={handlePurchase}
            />
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2">No items in this category</h3>
            <p className="text-gray-600">Try selecting a different category!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PetShop;

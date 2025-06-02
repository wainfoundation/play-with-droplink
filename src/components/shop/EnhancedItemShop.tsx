
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Package, TrendingUp } from 'lucide-react';
import { useShopItems, ShopItem } from '@/hooks/useShopItems';
import { useCharacterShop } from '@/hooks/useCharacterShop';
import { useAuth } from '@/hooks/useAuth';
import ShopFilters from './ShopFilters';
import ShopItemGrid from './ShopItemGrid';

interface EnhancedItemShopProps {
  onBack: () => void;
}

const EnhancedItemShop: React.FC<EnhancedItemShopProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { wallet } = useCharacterShop();
  const { shopItems, inventory, buyItem, loading } = useShopItems();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rarity, setRarity] = useState('all');

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = shopItems;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(item => {
        if (priceRange === '5001+') return item.price_coins >= 5001;
        return item.price_coins >= parseInt(min) && item.price_coins <= parseInt(max);
      });
    }

    // Rarity filter
    if (rarity !== 'all') {
      filtered = filtered.filter(item => item.rarity === rarity);
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price_coins - b.price_coins;
        case 'price-desc':
          return b.price_coins - a.price_coins;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
                 (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [shopItems, selectedCategory, sortBy, priceRange, searchTerm, rarity]);

  // Category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    shopItems.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, [shopItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-20">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the shop</p>
          <Button onClick={onBack}>Back to Game</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {filteredAndSortedItems.length} items
            </Badge>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">{wallet?.droplet_coins?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-green-500" />
              Enhanced Item Shop
              <Badge className="bg-green-500 text-white">
                {shopItems.length}+ Items Available
              </Badge>
            </CardTitle>
            <p className="text-gray-600">
              Discover everything from basic food to luxury mansions and spaceships!
            </p>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {[
            { category: 'food', icon: '🍎', name: 'Food' },
            { category: 'luxury', icon: '💎', name: 'Luxury' },
            { category: 'vehicle', icon: '🚗', name: 'Vehicles' },
            { category: 'technology', icon: '💻', name: 'Tech' },
            { category: 'enhancement', icon: '⚡', name: 'Boosts' },
            { category: 'collectible', icon: '🏆', name: 'Rare' }
          ].map(({ category, icon, name }) => (
            <Card 
              key={category} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs font-semibold">{name}</div>
                <div className="text-xs text-gray-500">{categoryStats[category] || 0}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <ShopFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          rarity={rarity}
          onRarityChange={setRarity}
        />

        {/* Items Grid */}
        <ShopItemGrid
          items={filteredAndSortedItems}
          wallet={wallet}
          inventory={inventory}
          onBuyItem={buyItem}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EnhancedItemShop;

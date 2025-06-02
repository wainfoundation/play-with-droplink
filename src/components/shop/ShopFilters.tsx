
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface ShopFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  rarity: string;
  onRarityChange: (rarity: string) => void;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  searchTerm,
  onSearchChange,
  rarity,
  onRarityChange
}) => {
  const categories = [
    { id: 'all', name: 'All', icon: '🏪' },
    { id: 'food', name: 'Food', icon: '🍎' },
    { id: 'toy', name: 'Toys', icon: '🎾' },
    { id: 'medicine', name: 'Health', icon: '💊' },
    { id: 'cleaning', name: 'Clean', icon: '🧼' },
    { id: 'luxury', name: 'Luxury', icon: '💎' },
    { id: 'theme', name: 'Themes', icon: '🎨' },
    { id: 'special', name: 'Special', icon: '✨' }
  ];

  const sortOptions = [
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'name-asc', name: 'Name: A to Z' },
    { id: 'name-desc', name: 'Name: Z to A' },
    { id: 'rarity', name: 'Rarity: Best First' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '1-10', name: '1-10 coins' },
    { id: '11-50', name: '11-50 coins' },
    { id: '51-100', name: '51-100 coins' },
    { id: '101-500', name: '101-500 coins' },
    { id: '501+', name: '500+ coins' }
  ];

  const rarities = [
    { id: 'all', name: 'All Rarities' },
    { id: 'common', name: 'Common' },
    { id: 'rare', name: 'Rare' },
    { id: 'epic', name: 'Epic' },
    { id: 'legendary', name: 'Legendary' }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                className="h-8"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sort */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>

          {/* Rarity */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Rarity</label>
            <select
              value={rarity}
              onChange={(e) => onRarityChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {rarities.map((rar) => (
                <option key={rar.id} value={rar.id}>{rar.name}</option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopFilters;

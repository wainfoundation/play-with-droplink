
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

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
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'food', name: 'Food', icon: '🍎' },
    { id: 'toy', name: 'Toys', icon: '🎾' },
    { id: 'accessory', name: 'Accessories', icon: '👑' },
    { id: 'medicine', name: 'Medicine', icon: '💊' },
    { id: 'enhancement', name: 'Enhancements', icon: '⚡' },
    { id: 'luxury', name: 'Luxury', icon: '💎' },
    { id: 'vehicle', name: 'Vehicles', icon: '🚗' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'collectible', name: 'Collectibles', icon: '🏆' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-20', name: '0-20 coins' },
    { id: '21-100', name: '21-100 coins' },
    { id: '101-500', name: '101-500 coins' },
    { id: '501-1000', name: '501-1,000 coins' },
    { id: '1001-5000', name: '1,001-5,000 coins' },
    { id: '5001+', name: '5,001+ coins' }
  ];

  const rarities = [
    { id: 'all', name: 'All Rarities' },
    { id: 'common', name: 'Common' },
    { id: 'rare', name: 'Rare' },
    { id: 'epic', name: 'Epic' },
    { id: 'legendary', name: 'Legendary' }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-1"
          >
            <span>{category.icon}</span>
            <span className="hidden sm:inline">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Rarity</label>
          <Select value={rarity} onValueChange={onRarityChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Rarities" />
            </SelectTrigger>
            <SelectContent>
              {rarities.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;

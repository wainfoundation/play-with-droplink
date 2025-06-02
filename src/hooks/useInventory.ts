
import { useState, useEffect, useCallback } from 'react';
import { ShopItem } from '@/data/shopItems';

export interface InventoryItem {
  itemId: string;
  quantity: number;
  purchasedAt: number;
}

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Load inventory from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('petInventory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInventory(parsed);
      } catch (error) {
        console.log('Error loading inventory, using empty');
      }
    }
  }, []);

  // Save inventory to localStorage
  const saveInventory = useCallback((newInventory: InventoryItem[]) => {
    localStorage.setItem('petInventory', JSON.stringify(newInventory));
    setInventory(newInventory);
  }, []);

  // Add item to inventory
  const addItem = useCallback((itemId: string, quantity: number = 1) => {
    setInventory(prev => {
      const existing = prev.find(item => item.itemId === itemId);
      let newInventory;
      
      if (existing) {
        newInventory = prev.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newInventory = [...prev, { itemId, quantity, purchasedAt: Date.now() }];
      }
      
      saveInventory(newInventory);
      return newInventory;
    });
  }, [saveInventory]);

  // Use item from inventory
  const useItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(i => i.itemId === itemId);
    if (!item || item.quantity < quantity) return false;

    setInventory(prev => {
      const newInventory = prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity - quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      saveInventory(newInventory);
      return newInventory;
    });
    return true;
  }, [inventory, saveInventory]);

  // Check if item is owned
  const hasItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(i => i.itemId === itemId);
    return item ? item.quantity >= quantity : false;
  }, [inventory]);

  return {
    inventory,
    addItem,
    useItem,
    hasItem
  };
};

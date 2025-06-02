
import { useState, useEffect, useCallback } from 'react';

interface InventoryItem {
  itemId: string;
  quantity: number;
  purchasedAt: number;
  equipped?: boolean;
}

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem('droplet_inventory');
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (error) {
        console.log('Error loading inventory');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('droplet_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = useCallback((itemId: string, quantity: number = 1) => {
    setInventory(prev => {
      const existingItem = prev.find(item => item.itemId === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          itemId,
          quantity,
          purchasedAt: Date.now(),
          equipped: false
        }];
      }
    });
  }, []);

  const useItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(inv => inv.itemId === itemId);
    if (!item || item.quantity < quantity) {
      return false;
    }

    setInventory(prev => {
      return prev.map(item => {
        if (item.itemId === itemId) {
          const newQuantity = Math.max(0, item.quantity - quantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });

    return true;
  }, [inventory]);

  const hasItem = useCallback((itemId: string, quantity: number = 1) => {
    const item = inventory.find(inv => inv.itemId === itemId);
    return item ? item.quantity >= quantity : false;
  }, [inventory]);

  const equipItem = useCallback((itemId: string, equipped: boolean) => {
    setInventory(prev => 
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, equipped }
          : item
      )
    );
  }, []);

  return {
    inventory,
    addItem,
    useItem,
    hasItem,
    equipItem
  };
};

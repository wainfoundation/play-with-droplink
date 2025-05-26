import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface DigitalProduct {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  file_url?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  is_active: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
  file_size?: number;
  file_type?: string;
  max_downloads?: number;
  download_expires_hours?: number;
}

// Partial product info for order history
export interface OrderProductInfo {
  title: string;
  price: number;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: string;
  pi_payment_id?: string;
  pi_transaction_id?: string;
  download_link?: string;
  download_expires_at?: string;
  created_at: string;
  updated_at: string;
  download_count?: number;
  max_downloads?: number;
  buyer_email?: string;
  access_token?: string;
  digital_products?: OrderProductInfo; // Use partial interface for orders
}

export function useDigitalProducts() {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async (userId?: string) => {
    try {
      let query = supabase
        .from('digital_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          digital_products (*)
        `)
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    }
  };

  const createProduct = async (productData: Omit<DigitalProduct, 'id' | 'created_at' | 'updated_at' | 'download_count'>) => {
    try {
      const { data, error } = await supabase
        .from('digital_products')
        .insert(productData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<DigitalProduct>) => {
    try {
      const { data, error } = await supabase
        .from('digital_products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('digital_products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      return false;
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    products,
    orders,
    loading,
    fetchProducts,
    fetchOrders,
    createProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    updateOrder,
  };
}

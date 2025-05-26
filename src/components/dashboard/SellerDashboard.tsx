
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Package, 
  Download, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { useDigitalProducts, DigitalProduct, Order } from "@/hooks/useDigitalProducts";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CreateProductModal from "../store/CreateProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EarningsStats {
  totalEarnings: number;
  totalSales: number;
  totalDownloads: number;
  activeProducts: number;
}

const SellerDashboard = () => {
  const [stats, setStats] = useState<EarningsStats>({
    totalEarnings: 0,
    totalSales: 0,
    totalDownloads: 0,
    activeProducts: 0
  });
  const [salesOrders, setSalesOrders] = useState<Order[]>([]);
  const { 
    products, 
    loading, 
    fetchProducts, 
    deleteProduct, 
    updateProduct 
  } = useDigitalProducts();
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadSellerData();
    }
  }, [user]);

  const loadSellerData = async () => {
    if (!user) return;

    // Fetch seller's products
    await fetchProducts(user.id);

    // Fetch sales data
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        digital_products!inner (title, price)
      `)
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sales:', error);
      return;
    }

    setSalesOrders(orders || []);

    // Calculate stats
    const completedOrders = orders?.filter(order => order.status === 'completed') || [];
    const totalEarnings = completedOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalDownloads = completedOrders.reduce((sum, order) => sum + (order.download_count || 0), 0);

    setStats({
      totalEarnings,
      totalSales: completedOrders.length,
      totalDownloads,
      activeProducts: products.filter(p => p.is_active).length
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(productId);
      if (success) {
        await loadSellerData();
      }
    }
  };

  const toggleProductStatus = async (product: DigitalProduct) => {
    const success = await updateProduct(product.id, {
      is_active: !product.is_active
    });
    if (success) {
      await loadSellerData();
      toast({
        title: "Product Updated",
        description: `Product ${product.is_active ? 'deactivated' : 'activated'} successfully`,
      });
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading seller dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEarnings}π</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Products and Sales */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="sales">Sales History</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Product Management</h3>
            <CreateProductModal />
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {product.image_url && (
                          <img 
                            src={product.image_url} 
                            alt={product.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}π</TableCell>
                    <TableCell>{product.download_count}</TableCell>
                    <TableCell>
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleProductStatus(product)}
                        >
                          {product.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <h3 className="text-lg font-semibold">Sales History</h3>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.digital_products?.title || "Unknown Product"}
                    </TableCell>
                    <TableCell>{order.amount}π</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.status === 'completed' ? 'default' :
                          order.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.download_count || 0}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;

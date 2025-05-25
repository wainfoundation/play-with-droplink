
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Edit, Trash2, Eye, Download, TrendingUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CreateProductModal from "../store/CreateProductModal";
import ProductCard from "../store/ProductCard";
import { useDigitalProducts } from "@/hooks/useDigitalProducts";
import { useUser } from "@/context/UserContext";
import { formatDistanceToNow } from "date-fns";

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { products, orders, fetchProducts, fetchOrders, deleteProduct } = useDigitalProducts();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchProducts(user.id); // Fetch user's products
      fetchOrders(user.id); // Fetch user's orders
    }
  }, [user, fetchProducts, fetchOrders]);

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      if (user) {
        fetchProducts(user.id);
      }
    }
  };

  const myProducts = products.filter(p => p.user_id === user?.id);
  const myOrders = orders.filter(o => o.buyer_id === user?.id || o.seller_id === user?.id);
  const salesOrders = myOrders.filter(o => o.seller_id === user?.id);
  const purchaseOrders = myOrders.filter(o => o.buyer_id === user?.id);

  const totalRevenue = salesOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);

  const totalSales = salesOrders.filter(o => o.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{totalRevenue.toFixed(1)}π</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Products</p>
              <p className="text-2xl font-bold">{myProducts.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Products</p>
              <p className="text-2xl font-bold">{myProducts.filter(p => p.is_active).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Digital Products & Store</CardTitle>
          <CreateProductModal />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">My Products ({myProducts.length})</TabsTrigger>
              <TabsTrigger value="sales">Sales ({salesOrders.length})</TabsTrigger>
              <TabsTrigger value="purchases">Purchases ({purchaseOrders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              {myProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any products yet.</p>
                  <CreateProductModal />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myProducts.map((product) => (
                    <div key={product.id} className="relative group">
                      <ProductCard product={product} showActions={false} />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              {salesOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No sales yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {salesOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{order.digital_products?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.amount}π</p>
                            <Badge variant={
                              order.status === 'completed' ? 'default' : 
                              order.status === 'pending' ? 'secondary' : 
                              'destructive'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="purchases" className="space-y-4">
              {purchaseOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No purchases yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchaseOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{order.digital_products?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.amount}π</p>
                            <Badge variant={
                              order.status === 'completed' ? 'default' : 
                              order.status === 'pending' ? 'secondary' : 
                              'destructive'
                            }>
                              {order.status}
                            </Badge>
                            {order.status === 'completed' && order.download_link && (
                              <Button size="sm" className="mt-2" asChild>
                                <a href={order.download_link} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsSection;

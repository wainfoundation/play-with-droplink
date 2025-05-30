
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/context/UserContext';
import { ArrowRight, BarChart3, CreditCard, DollarSign, Users, Wallet } from 'lucide-react';
import GoToTop from '@/components/GoToTop';

const PiDashboard = () => {
  const { user, isLoading } = useAuth();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Pi Dashboard - Droplink</title>
        <meta name="description" content="Manage your Pi earnings and transactions on Droplink" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Pi Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Pi Wallet
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Balance
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">π 128.42</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tips Received
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">π 24.50</div>
                    <p className="text-xs text-muted-foreground">
                      +12 tips this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Product Sales
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">π 89.90</div>
                    <p className="text-xs text-muted-foreground">
                      +7 sales this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscription Revenue
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">π 14.02</div>
                    <p className="text-xs text-muted-foreground">
                      +2.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your recent Pi transactions on Droplink
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Tip from @user{i}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </p>
                            </div>
                            <div className="font-medium text-green-600">+π {(Math.random() * 10).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Transactions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Pi Wallet</CardTitle>
                    <CardDescription>
                      Manage your Pi wallet settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallet-address">Wallet Address</Label>
                      <Input id="wallet-address" value="Pi1xj8dkf93jd9f3jd9f3jd9f3" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wallet-status">Status</Label>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span>Connected</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Disconnect</Button>
                    <Button>Send Pi</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="earnings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>
                    Your Pi earnings from all sources on Droplink
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded">
                    <p className="text-muted-foreground">Earnings chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    A complete record of your Pi transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded">
                    <p className="text-muted-foreground">Transaction history will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pi Wallet Settings</CardTitle>
                  <CardDescription>
                    Configure your Pi wallet preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auto-withdraw">Auto Withdraw</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="auto-withdraw" className="h-4 w-4" />
                      <span className="text-sm">Automatically withdraw earnings to my Pi wallet</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-withdraw">Minimum Withdrawal</Label>
                    <Input id="min-withdraw" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification-threshold">Notification Threshold</Label>
                    <Input id="notification-threshold" type="number" placeholder="50" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <GoToTop />
    </>
  );
};

export default PiDashboard;

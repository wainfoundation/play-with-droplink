import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import GoToTop from '@/components/GoToTop';

// Mock data for demonstration
const mockSubscriptionData = [
  { name: 'Jan', starter: 65, pro: 28, premium: 12 },
  { name: 'Feb', starter: 78, pro: 35, premium: 18 },
  { name: 'Mar', starter: 82, pro: 42, premium: 24 },
  { name: 'Apr', starter: 96, pro: 48, premium: 32 },
  { name: 'May', starter: 105, pro: 55, premium: 40 }
];

const mockRevenueData = [
  { name: 'Jan', revenue: 450 },
  { name: 'Feb', revenue: 620 },
  { name: 'Mar', revenue: 780 },
  { name: 'Apr', revenue: 920 },
  { name: 'May', revenue: 1100 }
];

const mockUsersByPlanData = [
  { name: 'Starter', value: 540, color: '#4ade80' },
  { name: 'Pro', value: 210, color: '#3b82f6' },
  { name: 'Premium', value: 120, color: '#8b5cf6' },
];

const mockRecentUsers = [
  { id: 1, username: '@jpsmith', plan: 'Pro', joined: '2025-05-15', links: 8, revenue: 35 },
  { id: 2, username: '@techexplorer', plan: 'Premium', joined: '2025-05-14', links: 12, revenue: 75 },
  { id: 3, username: '@creativemark', plan: 'Starter', joined: '2025-05-12', links: 5, revenue: 10 },
  { id: 4, username: '@digitaldesigner', plan: 'Pro', joined: '2025-05-10', links: 9, revenue: 42 },
  { id: 5, username: '@contentcreator', plan: 'Premium', joined: '2025-05-09', links: 15, revenue: 120 },
];

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  
  // Admin credentials (in a real app, this would be verified on the backend)
  const ADMIN_EMAIL = "admin@pidrop.dev";
  const ADMIN_PASSWORD = "PiDrop2025!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin portal",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    }
  };

  // In a real app, check session/JWT token here
  useEffect(() => {
    // Check for existing session
    const checkSession = () => {
      const adminSession = localStorage.getItem('adminSession');
      if (adminSession) {
        setIsAuthenticated(true);
      }
    };
    
    checkSession();
  }, []);

  // Save session when authenticated changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('adminSession', 'true');
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin portal",
    });
  };

  const COLORS = ['#4ade80', '#3b82f6', '#8b5cf6'];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin portal
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pidrop.dev"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">PiDrop Admin Portal</h1>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">870</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue (Pi)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,100 π</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+20%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4,235</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+8%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth by Subscription Plan</CardTitle>
                  <CardDescription>
                    Monthly growth of users by subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockSubscriptionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="starter" stackId="a" fill="#4ade80" name="Starter" />
                        <Bar dataKey="pro" stackId="a" fill="#3b82f6" name="Pro" />
                        <Bar dataKey="premium" stackId="a" fill="#8b5cf6" name="Premium" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                    <CardDescription>Monthly revenue in Pi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#8b5cf6" 
                            name="Revenue (Pi)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Users by Plan</CardTitle>
                    <CardDescription>Distribution of users by subscription plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockUsersByPlanData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {mockUsersByPlanData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>
                    New users that joined the platform recently
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Links</TableHead>
                        <TableHead>Revenue (Pi)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRecentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.plan === 'Premium' 
                                ? 'bg-purple-100 text-purple-800' 
                                : user.plan === 'Pro'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {user.plan}
                            </span>
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>{user.links}</TableCell>
                          <TableCell>{user.revenue} π</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Analytics</CardTitle>
                  <CardDescription>
                    Current subscription distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Starter</span>
                        </div>
                        <span>540 users (62%)</span>
                      </div>
                      <div className="w-full h-2 bg-green-100 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span>Pro</span>
                        </div>
                        <span>210 users (24%)</span>
                      </div>
                      <div className="w-full h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span>Premium</span>
                        </div>
                        <span>120 users (14%)</span>
                      </div>
                      <div className="w-full h-2 bg-purple-100 rounded-full">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '14%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>
                    Revenue distribution by subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Jan', starter: 195, pro: 140, premium: 115 },
                          { name: 'Feb', starter: 234, pro: 175, premium: 150 },
                          { name: 'Mar', starter: 246, pro: 210, premium: 180 },
                          { name: 'Apr', starter: 288, pro: 240, premium: 240 },
                          { name: 'May', starter: 315, pro: 275, premium: 300 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} π`} />
                        <Legend />
                        <Bar dataKey="starter" fill="#4ade80" name="Starter" />
                        <Bar dataKey="pro" fill="#3b82f6" name="Pro" />
                        <Bar dataKey="premium" fill="#8b5cf6" name="Premium" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Revenue Generators</CardTitle>
                    <CardDescription>Users generating the most revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Revenue (Pi)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">@contentcreator</TableCell>
                          <TableCell>Premium</TableCell>
                          <TableCell>120 π</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">@techinfluencer</TableCell>
                          <TableCell>Premium</TableCell>
                          <TableCell>98 π</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">@digitaldesigner</TableCell>
                          <TableCell>Pro</TableCell>
                          <TableCell>85 π</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">@musicartist</TableCell>
                          <TableCell>Premium</TableCell>
                          <TableCell>72 π</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">@cryptoenthusiast</TableCell>
                          <TableCell>Pro</TableCell>
                          <TableCell>65 π</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Distribution of payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Pi Network', value: 890, color: '#8b5cf6' },
                              { name: 'Recurring', value: 210, color: '#3b82f6' },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Pi Network', value: 890, color: '#8b5cf6' },
                              { name: 'Recurring', value: 210, color: '#3b82f6' },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <GoToTop />
    </>
  );
};

export default AdminPortal;

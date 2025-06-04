
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins, TrendingUp, Home, Store, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const WalletPage: React.FC = () => {
  const navigate = useNavigate();

  const walletActions = [
    {
      id: 'earn',
      name: 'Earn Coins',
      icon: Coins,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'spend',
      name: 'Spend',
      icon: Store,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'rewards',
      name: 'Rewards',
      icon: Gift,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'history',
      name: 'History',
      icon: TrendingUp,
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wallet - Play with Droplink</title>
        <meta name="description" content="Manage your coins and view transaction history" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              💰 Your Wallet
            </h1>
            <p className="text-lg text-gray-600">
              Manage your coins and track your spending
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center mb-8">
            <IconButton
              icon={Home}
              label="Back Home"
              onClick={() => navigate('/play')}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>

          {/* Balance Display */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <Wallet className="h-8 w-8" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-center mb-2">
                1,240
              </div>
              <div className="text-center text-yellow-100">
                Droplet Coins
              </div>
            </CardContent>
          </Card>

          {/* Wallet Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {walletActions.map((action) => (
              <IconButton
                key={action.id}
                icon={action.icon}
                label={action.name}
                onClick={() => console.log(`${action.name} clicked`)}
                className={action.color}
                size="lg"
              />
            ))}
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Coins className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Fed your pet</div>
                      <div className="text-sm text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">+5</div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Store className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">Bought toy ball</div>
                      <div className="text-sm text-gray-500">5 hours ago</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold">-25</div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Daily reward</div>
                      <div className="text-sm text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">+10</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WalletPage;

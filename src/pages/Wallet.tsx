
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, TrendingUp, History } from 'lucide-react';

const Wallet: React.FC = () => {
  const coinBalance = 150;
  
  const recentTransactions = [
    { id: 1, type: 'earn', description: 'Watched Ad', amount: 1, time: '2 hours ago' },
    { id: 2, type: 'spend', description: 'Bought Apple', amount: -5, time: '3 hours ago' },
    { id: 3, type: 'earn', description: 'Daily Login', amount: 10, time: '1 day ago' },
  ];

  return (
    <>
      <Helmet>
        <title>Wallet - Play with Droplink</title>
        <meta name="description" content="Manage your coins and view transaction history" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Your Wallet
            </h1>
            <p className="text-lg text-gray-600">
              Manage your coins and earn more through various activities
            </p>
          </div>

          {/* Coin Balance */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="text-center py-8">
              <Coins className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {coinBalance} Coins
              </h2>
              <p className="text-gray-600">Your current balance</p>
            </CardContent>
          </Card>

          {/* Earn Coins Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Gift className="h-6 w-6 text-blue-500" />
                  Watch Ads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Earn 1 coin per ad watched
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Watch Ad (+1 Coin)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  Daily Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get daily rewards for logging in
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Claim Daily (+10 Coins)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Coins className="h-6 w-6 text-purple-500" />
                  Pet Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Earn coins by caring for your pet
                </p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Care for Pet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <History className="h-6 w-6" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                    <span className={`font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} coins
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              Back to Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;

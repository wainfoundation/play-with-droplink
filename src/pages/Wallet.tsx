
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, TrendingUp, History, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import { useAuthSystem } from '@/hooks/useAuthSystem';
import RewardAdButton from '@/components/store/RewardAdButton';

const Wallet: React.FC = () => {
  const { user } = useAuthSystem();
  const { balance, transactions, refreshWallet } = useWallet();

  useEffect(() => {
    if (user) {
      refreshWallet();
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Wallet - Play with Droplink</title>
          <meta name="description" content="Manage your coins and view transaction history" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Your Wallet
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to manage your coins and view transaction history
            </p>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  
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
                {balance} Coins
              </h2>
              <p className="text-gray-600 mb-4">Your current balance</p>
              
              {/* Buy More Coins Button */}
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Link to="/coin-store" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Buy More Coins with Pi
                </Link>
              </Button>
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
                  Earn 1 coin per ad watched (5 min cooldown)
                </p>
                <RewardAdButton />
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
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
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
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>No transactions yet</p>
                    <p className="text-sm">Start earning coins by watching ads!</p>
                  </div>
                )}
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

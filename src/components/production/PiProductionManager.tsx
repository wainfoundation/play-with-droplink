
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { authenticateWithPi, createPiPayment, showRewardedAdAdvanced, isRunningInPiBrowser, initPiNetwork } from '@/utils/pi-sdk';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Zap, PlayCircle, Coins, Star, Trophy } from 'lucide-react';

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

interface GameSession {
  id: string;
  score: number;
  duration: number;
  piReward: number;
  adReward: number;
}

const PiProductionManager: React.FC = () => {
  const [piUser, setPiUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [wallet, setWallet] = useState({ balance: 0, totalEarned: 0 });
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkEnvironment = async () => {
      setIsPiBrowser(isRunningInPiBrowser());
      const initialized = initPiNetwork();
      
      if (!initialized) {
        toast({
          title: "Pi Browser Required",
          description: "Please open this app in Pi Browser for full functionality",
          variant: "destructive"
        });
      }
    };

    checkEnvironment();
  }, [toast]);

  const handlePiAuthentication = useCallback(async () => {
    if (!isPiBrowser) {
      toast({
        title: "Authentication Error",
        description: "Pi authentication requires Pi Browser",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const authResult = await authenticateWithPi(['username', 'payments', 'wallet_address']);
      
      if (authResult && authResult.user) {
        setPiUser({
          uid: authResult.user.uid,
          username: authResult.user.username,
          accessToken: authResult.accessToken
        });

        // Sync with Supabase
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .upsert({
            id: authResult.user.uid,
            username: authResult.user.username,
            pi_wallet_address: authResult.user.uid,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Pi Authentication Successful",
          description: `Welcome ${authResult.user.username}!`,
        });

        await loadWalletData(authResult.user.uid);
      }
    } catch (error) {
      console.error('Pi Authentication Error:', error);
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Failed to authenticate with Pi Network",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [isPiBrowser, toast]);

  const loadWalletData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_wallet')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setWallet({
          balance: data.pi_balance || 0,
          totalEarned: data.total_earned || 0
        });
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    }
  };

  const startGameSession = useCallback(async () => {
    if (!piUser) {
      toast({
        title: "Authentication Required",
        description: "Please authenticate with Pi Network first",
        variant: "destructive"
      });
      return;
    }

    const session: GameSession = {
      id: `session_${Date.now()}`,
      score: 0,
      duration: 0,
      piReward: 0,
      adReward: 0
    };

    setGameSession(session);

    // Record session start in Supabase
    await supabase.from('game_sessions').insert({
      user_id: piUser.uid,
      game_id: session.id,
      score: 0,
      completed: false
    });

    toast({
      title: "Game Session Started",
      description: "Play to earn Pi rewards!",
    });
  }, [piUser, toast]);

  const showRewardedAd = useCallback(async () => {
    if (!isPiBrowser || !piUser) return;

    try {
      const adResult = await showRewardedAdAdvanced();
      
      if (adResult.success) {
        const reward = 0.001; // Pi reward for watching ad
        
        // Update wallet
        await supabase.rpc('add_droplet_coins', {
          p_user_id: piUser.uid,
          p_coins_to_add: Math.floor(reward * 1000) // Convert to coins
        });

        if (gameSession) {
          setGameSession(prev => prev ? {
            ...prev,
            adReward: prev.adReward + reward
          } : null);
        }

        await loadWalletData(piUser.uid);

        toast({
          title: "Ad Reward Earned!",
          description: `You earned ${reward} Pi for watching the ad`,
        });
      }
    } catch (error) {
      console.error('Ad error:', error);
      toast({
        title: "Ad Error",
        description: "Failed to show rewarded ad",
        variant: "destructive"
      });
    }
  }, [isPiBrowser, piUser, gameSession, toast]);

  const processPayment = useCallback(async (amount: number, memo: string) => {
    if (!piUser) return;

    try {
      const paymentData = {
        amount,
        memo,
        metadata: {
          userId: piUser.uid,
          sessionId: gameSession?.id,
          type: 'game_purchase'
        }
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log('Payment ready for approval:', paymentId);
          
          // Record payment in Supabase
          await supabase.from('pi_payments').insert({
            user_id: piUser.uid,
            payment_id: paymentId,
            amount,
            memo,
            status: 'pending_approval',
            metadata: paymentData.metadata
          });
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log('Payment completed:', paymentId, txid);
          
          // Update payment status
          await supabase.from('pi_payments')
            .update({
              status: 'completed',
              transaction_id: txid,
              completed_at: new Date().toISOString()
            })
            .eq('payment_id', paymentId);

          // Update user wallet
          await supabase.from('user_wallet')
            .update({
              pi_balance: wallet.balance + amount,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', piUser.uid);

          await loadWalletData(piUser.uid);

          toast({
            title: "Payment Successful",
            description: `${amount} Pi payment completed!`,
          });
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId);
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user",
          });
        },
        onError: (error: Error) => {
          console.error('Payment error:', error);
          toast({
            title: "Payment Error",
            description: error.message,
            variant: "destructive"
          });
        }
      };

      await createPiPayment(paymentData, callbacks);
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to process Pi payment",
        variant: "destructive"
      });
    }
  }, [piUser, gameSession, wallet.balance, toast]);

  const completeGameSession = useCallback(async (finalScore: number) => {
    if (!gameSession || !piUser) return;

    const piReward = Math.floor(finalScore / 1000) * 0.001; // Pi reward based on score
    
    const updatedSession = {
      ...gameSession,
      score: finalScore,
      duration: Date.now() - parseInt(gameSession.id.split('_')[1]),
      piReward
    };

    setGameSession(updatedSession);

    // Update game session in database
    await supabase.from('game_sessions')
      .update({
        score: finalScore,
        completed: true,
        duration_seconds: Math.floor(updatedSession.duration / 1000)
      })
      .eq('game_id', gameSession.id);

    // Award Pi rewards
    if (piReward > 0) {
      await supabase.rpc('add_droplet_coins', {
        p_user_id: piUser.uid,
        p_coins_to_add: Math.floor(piReward * 1000)
      });

      await loadWalletData(piUser.uid);
    }

    toast({
      title: "Game Completed!",
      description: `Score: ${finalScore} | Pi Earned: ${piReward + updatedSession.adReward}`,
    });
  }, [gameSession, piUser, toast]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-500" />
            PlayDrop Production Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Environment Status */}
          <div className="flex items-center gap-4">
            <Badge variant={isPiBrowser ? "default" : "destructive"}>
              {isPiBrowser ? "Pi Browser" : "External Browser"}
            </Badge>
            <Badge variant={piUser ? "default" : "secondary"}>
              {piUser ? "Authenticated" : "Not Authenticated"}
            </Badge>
          </div>

          {/* Pi Authentication */}
          {!piUser ? (
            <div className="space-y-4">
              <Button 
                onClick={handlePiAuthentication}
                disabled={loading || !isPiBrowser}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              >
                <Shield className="w-4 h-4 mr-2" />
                {loading ? "Authenticating..." : "Sign in with Pi Network"}
              </Button>
              
              {!isPiBrowser && (
                <p className="text-sm text-orange-600 text-center">
                  Open in Pi Browser for full functionality
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Authenticated User</h3>
                <p className="text-green-700">Username: {piUser.username}</p>
                <p className="text-green-700">UID: {piUser.uid}</p>
              </div>

              {/* Wallet Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    Pi Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="text-2xl font-bold">{wallet.balance.toFixed(4)} π</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Earned</p>
                      <p className="text-2xl font-bold">{wallet.totalEarned.toFixed(4)} π</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Session Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!gameSession ? (
                  <Button onClick={startGameSession} className="w-full">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Game Session
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold">Active Session</p>
                    <div className="text-sm space-y-1">
                      <p>Score: {gameSession.score}</p>
                      <p>Pi Reward: {gameSession.piReward.toFixed(4)} π</p>
                      <p>Ad Reward: {gameSession.adReward.toFixed(4)} π</p>
                    </div>
                    <Button 
                      onClick={() => completeGameSession(Math.floor(Math.random() * 10000))}
                      variant="outline"
                      className="w-full"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Complete Session
                    </Button>
                  </div>
                )}

                <Button 
                  onClick={showRewardedAd}
                  disabled={!isPiBrowser}
                  variant="outline"
                  className="w-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Watch Rewarded Ad
                </Button>
              </div>

              {/* Payment Testing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pi Payment Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => processPayment(0.01, "Test payment - Game boost")}
                    variant="outline"
                    className="w-full"
                  >
                    Test Payment: 0.01 π
                  </Button>
                  <Button 
                    onClick={() => processPayment(0.1, "Test payment - Premium feature")}
                    variant="outline"
                    className="w-full"
                  >
                    Test Payment: 0.1 π
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PiProductionManager;

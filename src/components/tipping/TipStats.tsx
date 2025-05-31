
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

interface TipStats {
  totalSent: number;
  totalReceived: number;
  tipCount: number;
  avgTipAmount: number;
}

const TipStats = () => {
  const { user } = useUser();
  const [stats, setStats] = useState<TipStats>({
    totalSent: 0,
    totalReceived: 0,
    tipCount: 0,
    avgTipAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTipStats();
    }
  }, [user]);

  const fetchTipStats = async () => {
    if (!user) return;

    try {
      // Get sent tips
      const { data: sentTips } = await supabase
        .from('tips')
        .select('amount')
        .eq('from_user_id', user.id);

      // Get received tips
      const { data: receivedTips } = await supabase
        .from('tips')
        .select('amount')
        .eq('to_user_id', user.id);

      const totalSent = sentTips?.reduce((sum, tip) => sum + tip.amount, 0) || 0;
      const totalReceived = receivedTips?.reduce((sum, tip) => sum + tip.amount, 0) || 0;
      const tipCount = (sentTips?.length || 0) + (receivedTips?.length || 0);
      const avgTipAmount = tipCount > 0 ? (totalSent + totalReceived) / tipCount : 0;

      setStats({
        totalSent,
        totalReceived,
        tipCount,
        avgTipAmount: Math.round(avgTipAmount * 100) / 100
      });
    } catch (error) {
      console.error('Error fetching tip stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">π{stats.totalSent}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Received</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">π{stats.totalReceived}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.tipCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Tip Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">π{stats.avgTipAmount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipStats;

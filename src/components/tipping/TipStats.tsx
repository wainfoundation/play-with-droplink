
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown, Pi, Users } from "lucide-react";

interface TipStatsProps {
  userId: string;
}

interface Stats {
  totalReceived: number;
  totalSent: number;
  recentTips: number;
  uniqueTippers: number;
}

const TipStats = ({ userId }: TipStatsProps) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get total received
        const { data: receivedData } = await supabase
          .rpc('get_user_tips_received', { user_id_param: userId });
        
        // Get total sent
        const { data: sentData } = await supabase
          .rpc('get_user_tips_sent', { user_id_param: userId });
        
        // Get recent tips (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: recentTips } = await supabase
          .from('tips')
          .select('amount')
          .eq('to_user_id', userId)
          .eq('status', 'completed')
          .gte('completed_at', sevenDaysAgo.toISOString());
        
        // Get unique tippers
        const { data: uniqueTippers } = await supabase
          .from('tips')
          .select('from_user_id')
          .eq('to_user_id', userId)
          .eq('status', 'completed');
        
        const uniqueTipperIds = new Set(uniqueTippers?.map(t => t.from_user_id) || []);
        const recentTipsTotal = recentTips?.reduce((sum, tip) => sum + Number(tip.amount), 0) || 0;
        
        setStats({
          totalReceived: Number(receivedData) || 0,
          totalSent: Number(sentData) || 0,
          recentTips: recentTipsTotal,
          uniqueTippers: uniqueTipperIds.size
        });
      } catch (error) {
        console.error("Error fetching tip stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchStats();
    }
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tip Statistics</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
            <Pi className="h-5 w-5" />
            {stats.totalReceived.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          <TrendingDown className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 flex items-center gap-1">
            <Pi className="h-5 w-5" />
            {stats.totalSent.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Tips (7d)</CardTitle>
          <Pi className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
            <Pi className="h-5 w-5" />
            {stats.recentTips.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Tippers</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {stats.uniqueTippers}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipStats;

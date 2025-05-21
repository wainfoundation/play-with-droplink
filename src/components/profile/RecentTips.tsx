import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Pi } from "lucide-react";

interface Tip {
  id: string;
  amount: number | string;
  created_at: string;
  memo: string;
  from_username?: string;
  user_id?: string;
}

interface RecentTipsProps {
  userId: string;
  limit?: number;
}

const RecentTips = ({ userId, limit = 3 }: RecentTipsProps) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalReceived, setTotalReceived] = useState(0);

  useEffect(() => {
    const fetchRecentTips = async () => {
      try {
        setLoading(true);
        
        // Use explicit types for Supabase responses to avoid deep type instantiation
        let tipsData: Tip[] | null = null;
        let tipsError = null;

        // Fetch the most recent tips
        const tipsResponse = await supabase
          .from('payments')
          .select('id, amount, created_at, memo, user_id')
          .eq('status', 'completed')
          .eq('recipient_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);
          
        tipsData = tipsResponse.data;
        tipsError = tipsResponse.error;
        
        if (tipsError) {
          console.error("Failed to fetch tips:", tipsError);
          return;
        }
        
        // Fetch total tips received using the database function
        let totalData: number | null = null;
        let totalError = null;

        const totalResponse = await supabase
          .rpc('get_total_tips_received', { user_id_param: userId });
          
        totalData = totalResponse.data;
        totalError = totalResponse.error;
        
        if (totalError) {
          console.error("Failed to fetch total tips:", totalError);
        } else if (totalData !== null) {
          setTotalReceived(totalData);
        }
        
        if (!tipsData || tipsData.length === 0) {
          setTips([]);
          setLoading(false);
          return;
        }
        
        // Get usernames for the tippers
        const userIds = tipsData
          .filter(tip => tip.user_id)
          .map(tip => tip.user_id as string);
        
        if (userIds.length > 0) {
          // Use an explicit type for the user profiles query
          let usersData: { id: string, username: string }[] | null = null;
          let usersError = null;

          const usersResponse = await supabase
            .from('user_profiles')
            .select('id, username')
            .in('id', userIds);
            
          usersData = usersResponse.data;
          usersError = usersResponse.error;
          
          if (!usersError && usersData) {
            const usernameMap: Record<string, string> = {};
            
            usersData.forEach(user => {
              if (user.id) {
                usernameMap[user.id] = user.username;
              }
            });
            
            const tipsWithUsernames = tipsData.map(tip => ({
              ...tip,
              from_username: tip.user_id && usernameMap[tip.user_id] ? usernameMap[tip.user_id] : 'Anonymous'
            }));
            
            setTips(tipsWithUsernames);
          } else {
            setTips(tipsData);
          }
        } else {
          setTips(tipsData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tips:", err);
        setLoading(false);
      }
    };
    
    fetchRecentTips();
  }, [userId, limit]);

  if (loading) {
    return <div className="py-4 text-center text-gray-500">Loading tips...</div>;
  }

  if (tips.length === 0) {
    return null; // Don't show anything if no tips
  }

  return (
    <div className="mt-6 pt-6 border-t">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Recent Tips</h3>
        <Badge className="flex items-center gap-1 px-3 py-1">
          <Pi className="h-3.5 w-3.5" /> {totalReceived.toFixed(2)} received
        </Badge>
      </div>
      
      <div className="space-y-2">
        {tips.map(tip => {
          // Pre-process the amount to avoid type issues in JSX
          let displayAmount = "0.00";
          
          if (typeof tip.amount === 'string' && tip.amount) {
            displayAmount = parseFloat(tip.amount).toFixed(2);
          } else if (typeof tip.amount === 'number') {
            displayAmount = tip.amount.toFixed(2);
          }
          
          return (
            <div key={tip.id} className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {tip.from_username || 'Anonymous'} tipped <span className="text-primary">
                      {displayAmount} Pi
                    </span>
                  </p>
                  {tip.memo && <p className="text-gray-600 mt-1">{tip.memo}</p>}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(tip.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTips;

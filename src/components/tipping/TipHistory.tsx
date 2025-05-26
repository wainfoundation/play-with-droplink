
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowUpRight, ArrowDownLeft, Pi } from "lucide-react";

interface Tip {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  completed_at: string | null;
  memo: string | null;
  from_user: {
    id: string;
    username: string;
    avatar_url: string | null;
    display_name: string | null;
  } | null;
  to_user: {
    id: string;
    username: string;
    avatar_url: string | null;
    display_name: string | null;
  } | null;
}

interface TipHistoryProps {
  userId: string;
  type?: 'received' | 'sent' | 'all';
  limit?: number;
}

const TipHistory = ({ userId, type = 'all', limit = 10 }: TipHistoryProps) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('tips')
          .select(`
            id,
            amount,
            status,
            created_at,
            completed_at,
            memo,
            from_user:user_profiles!tips_from_user_id_fkey(id, username, avatar_url, display_name),
            to_user:user_profiles!tips_to_user_id_fkey(id, username, avatar_url, display_name)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (type === 'received') {
          query = query.eq('to_user_id', userId);
        } else if (type === 'sent') {
          query = query.eq('from_user_id', userId);
        } else {
          query = query.or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setTips(data || []);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchTips();
    }
  }, [userId, type, limit]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tip History</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (tips.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tip History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No tips found.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pi className="h-5 w-5 text-yellow-500" />
          Tip History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip) => {
            const isReceived = tip.to_user?.id === userId;
            const otherUser = isReceived ? tip.from_user : tip.to_user;
            
            return (
              <div key={tip.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-full ${isReceived ? 'bg-green-100' : 'bg-blue-100'}`}>
                  {isReceived ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src={otherUser?.avatar_url || ""} />
                  <AvatarFallback>
                    {otherUser?.username?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {isReceived ? 'Received from' : 'Sent to'} @{otherUser?.username || 'Unknown'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(tip.created_at), { addSuffix: true })}
                  </p>
                  {tip.memo && (
                    <p className="text-xs text-gray-600 mt-1 italic">"{tip.memo}"</p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-yellow-600">
                    {tip.amount} Pi
                  </p>
                  <Badge className={`text-xs ${getStatusColor(tip.status)}`}>
                    {tip.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TipHistory;

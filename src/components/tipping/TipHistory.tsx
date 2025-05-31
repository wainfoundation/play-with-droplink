
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/context/UserContext";

interface Tip {
  id: string;
  amount: number;
  created_at: string;
  from_user_id: string;
  to_user_id: string;
  message: string | null;
  from_user?: {
    username: string;
    avatar_url: string | null;
  };
  to_user?: {
    username: string;
    avatar_url: string | null;
  };
}

const TipHistory = () => {
  const { user } = useUser();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTipHistory();
    }
  }, [user]);

  const fetchTipHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tips')
        .select(`
          *,
          from_user:user_profiles!from_user_id(username, avatar_url),
          to_user:user_profiles!to_user_id(username, avatar_url)
        `)
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTips(data || []);
    } catch (error) {
      console.error('Error fetching tip history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tip History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tip History</CardTitle>
      </CardHeader>
      <CardContent>
        {tips.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No tip history found
          </p>
        ) : (
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={tip.from_user_id === user?.id ? tip.to_user?.avatar_url || "" : tip.from_user?.avatar_url || ""} 
                    />
                    <AvatarFallback>
                      {tip.from_user_id === user?.id 
                        ? tip.to_user?.username?.charAt(0).toUpperCase() || "?"
                        : tip.from_user?.username?.charAt(0).toUpperCase() || "?"
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {tip.from_user_id === user?.id ? 'Sent to' : 'Received from'} {' '}
                      {tip.from_user_id === user?.id ? tip.to_user?.username : tip.from_user?.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(tip.created_at), { addSuffix: true })}
                    </p>
                    {tip.message && (
                      <p className="text-sm text-muted-foreground mt-1">"{tip.message}"</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={tip.from_user_id === user?.id ? "secondary" : "default"}>
                    {tip.from_user_id === user?.id ? '-' : '+'}π{tip.amount}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TipHistory;

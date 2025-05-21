
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Define simplified interfaces for clarity
interface TipUser {
  id: string;
  username: string;
  avatar_url: string | null;
}

interface Tip {
  id: string;
  amount: number;
  created_at: string;
  from_user_id: string;
  to_user_id: string;
  from_user: TipUser | null;
}

// Interface for raw data from Supabase
interface RawTipData {
  id: string;
  amount: number;
  created_at: string;
  user_id: string;
  from_user?: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
}

const RecentTips = ({ userId }: { userId: string }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        
        // Query payments where the current user is the recipient
        const { data, error } = await supabase
          .from("payments")
          .select(`
            id, 
            amount, 
            created_at, 
            user_id, 
            from_user:user_profiles!user_id(id, username, avatar_url)
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5);
          
        if (error) {
          console.error("Error fetching tips:", error);
          setTips([]);
          return;
        }
        
        if (!data || !Array.isArray(data)) {
          setTips([]);
          return;
        }
        
        // Use a simpler approach to avoid complex type inference
        const formattedTips: Tip[] = [];
        
        for (const item of data as RawTipData[]) {
          let tipUser: TipUser | null = null;
          
          // Safely check if from_user exists and has the required properties
          if (item.from_user && typeof item.from_user === 'object') {
            tipUser = {
              id: item.from_user.id,
              username: item.from_user.username,
              avatar_url: item.from_user.avatar_url
            };
          }
          
          formattedTips.push({
            id: item.id,
            amount: item.amount,
            created_at: item.created_at,
            from_user_id: item.user_id,
            to_user_id: userId, // Since we're querying where user_id = userId
            from_user: tipUser
          });
        }
        
        setTips(formattedTips);
      } catch (err) {
        console.error("Error in fetchTips:", err);
        setTips([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchTips();
    }
  }, [userId]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Tips</CardTitle>
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
          <CardTitle>Recent Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No tips received yet.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tips.map((tip) => (
            <li key={tip.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={tip.from_user?.avatar_url || ""} />
                <AvatarFallback>
                  {tip.from_user?.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {tip.from_user?.username || "Anonymous"} tipped π{tip.amount}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(tip.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentTips;

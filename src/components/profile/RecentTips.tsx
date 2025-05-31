
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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

const RecentTips = ({ userId }: { userId: string }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        
        // Query tips where the current user is the recipient
        const { data, error } = await supabase
          .from("tips")
          .select(`
            id, 
            amount, 
            created_at, 
            from_user_id,
            to_user_id,
            from_user:user_profiles!from_user_id(id, username, avatar_url)
          `)
          .eq("to_user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5);
          
        if (error) {
          console.error("Error fetching tips:", error);
          toast({
            title: "Could not load tips",
            description: "There was an error loading your tips.",
            variant: "destructive",
          });
          setTips([]);
          return;
        }
        
        setTips(data || []);
      } catch (err) {
        console.error("Error in fetchTips:", err);
        toast({
          title: "Could not load tips",
          description: "There was an error loading your tips.",
          variant: "destructive",
        });
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

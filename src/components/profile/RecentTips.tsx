import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

// Define explicit interfaces to avoid type instantiation depth issues
interface Tip {
  id: string;
  amount: number;
  sender_id: string;
  created_at: string;
}

interface SenderInfo {
  username?: string;
}

interface TipWithSender extends Tip {
  sender?: SenderInfo;
}

interface PaymentData {
  id: string;
  amount: number;
  user_id: string;
  created_at: string;
}

interface UserData {
  username?: string;
}

interface Props {
  profileId: string;
}

const RecentTips = ({ profileId }: Props) => {
  const [tips, setTips] = useState<TipWithSender[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentTips = async () => {
      try {
        setLoading(true);
        
        // Use simple type casting instead of complex generics
        const result = await supabase
          .from('payments')
          .select('id, amount, user_id, created_at')
          .eq('recipient_id', profileId)
          .order('created_at', { ascending: false })
          .limit(5);
          
        const { data, error } = result as unknown as {
          data: PaymentData[] | null;
          error: any;
        };
          
        if (error) {
          console.error('Error fetching tips:', error);
          return;
        }

        // Process payments one by one with explicit typing
        const tipsData: TipWithSender[] = [];
        
        if (data) {
          for (const payment of data) {
            // Explicitly type the payment object
            const paymentItem = {
              id: payment.id,
              amount: payment.amount,
              user_id: payment.user_id,
              created_at: payment.created_at
            };
            
            // Get user data with simple type casting
            const userResult = await supabase
              .from('user_profiles')
              .select('username')
              .eq('id', paymentItem.user_id)
              .limit(1);
              
            const { data: userData, error: userError } = userResult as unknown as {
              data: UserData[] | null;
              error: any;
            };
              
            if (userError) {
              console.error('Error fetching sender data:', userError);
            }
            
            // Add tip with sender information
            tipsData.push({
              id: paymentItem.id,
              amount: paymentItem.amount,
              sender_id: paymentItem.user_id,
              created_at: paymentItem.created_at,
              sender: userData && userData.length > 0 
                ? { username: userData[0].username } 
                : undefined
            });
          }
        }
        
        setTips(tipsData);
      } catch (err) {
        console.error('Failed to fetch recent tips:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (profileId) {
      fetchRecentTips();
    }
  }, [profileId]);
  
  if (loading) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Tips</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (tips.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Tips</h3>
        <p className="text-gray-500 text-sm">No tips received yet</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Recent Tips</h3>
      <div className="space-y-3">
        {tips.map((tip) => (
          <div key={tip.id} className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{(tip.sender?.username || 'A')[0].toUpperCase()}</AvatarFallback>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${tip.sender?.username || 'Anonymous'}`} />
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{tip.sender?.username || 'Anonymous'}</p>
              <p className="text-xs text-gray-500">
                {new Date(tip.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="font-medium text-green-600">
              +{tip.amount} π
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTips;

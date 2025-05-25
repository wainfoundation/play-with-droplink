
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Lock, Crown } from "lucide-react";
import { Group } from "@/hooks/useGroups";
import { usePiPayment } from "@/hooks/usePiPayment";
import { useToast } from "@/hooks/use-toast";

interface GroupCardProps {
  group: Group;
  onJoin?: (group: Group) => void;
  showActions?: boolean;
  isMember?: boolean;
}

const GroupCard = ({ group, onJoin, showActions = true, isMember = false }: GroupCardProps) => {
  const [loading, setLoading] = useState(false);
  const { handleSubscribe } = usePiPayment();
  const { toast } = useToast();

  const handleJoinGroup = async () => {
    if (!onJoin) return;
    
    setLoading(true);
    try {
      if (group.price > 0) {
        // Handle Pi payment for paid groups
        // This would integrate with the Pi payment system
        toast({
          title: "Payment Required",
          description: `This group requires ${group.price} ${group.currency} to join`,
        });
      } else {
        onJoin(group);
      }
    } catch (error) {
      console.error('Join group error:', error);
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      {group.image_url && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={group.image_url}
            alt={group.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {group.is_private && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </Badge>
          )}
          {group.price > 0 && (
            <Badge className="absolute top-2 right-2 bg-primary text-white">
              <Crown className="h-3 w-3 mr-1" />
              {group.price} {group.currency}
            </Badge>
          )}
        </div>
      )}

      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-foreground line-clamp-2 text-lg">
            {group.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{group.member_count}</span>
          </div>
        </div>
      </CardHeader>

      {group.description && (
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {group.description}
          </p>
        </CardContent>
      )}

      {group.tags && group.tags.length > 0 && (
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-1">
            {group.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {group.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{group.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      )}

      {showActions && (
        <CardFooter className="p-4">
          {isMember ? (
            <Button className="w-full" variant="outline" disabled>
              Already a Member
            </Button>
          ) : (
            <Button
              onClick={handleJoinGroup}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? "Joining..." : group.price > 0 ? `Join for ${group.price} ${group.currency}` : "Join Group"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default GroupCard;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LinkItemProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon: string;
    clicks: number;
    is_active: boolean;
    position: number;
  };
  onEdit: (linkId: string) => void;
  onDeleted: () => void;
  onReorder: (direction: 'up' | 'down', linkId: string, currentPosition: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const LinkItem = ({ link, onEdit, onDeleted, onReorder, isFirst, isLast }: LinkItemProps) => {
  const [isActive, setIsActive] = useState(link.is_active);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleToggleActive = async () => {
    setIsUpdating(true);
    
    try {
      const newState = !isActive;
      const { error } = await supabase
        .from('links')
        .update({ is_active: newState })
        .eq('id', link.id);
        
      if (error) throw error;
      
      setIsActive(newState);
      toast({
        title: `Link ${newState ? 'activated' : 'deactivated'}`,
        description: `"${link.title}" is now ${newState ? 'visible' : 'hidden'} on your profile`,
      });
    } catch (error) {
      console.error("Error toggling link status:", error);
      toast({
        title: "Error",
        description: "Failed to update link status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this link? This action cannot be undone.")) {
      setIsUpdating(true);
      
      try {
        const { error } = await supabase
          .from('links')
          .delete()
          .eq('id', link.id);
          
        if (error) throw error;
        
        toast({
          title: "Link deleted",
          description: `"${link.title}" has been removed from your profile`,
        });
        
        onDeleted();
      } catch (error) {
        console.error("Error deleting link:", error);
        toast({
          title: "Error",
          description: "Failed to delete link. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const visitLink = () => {
    window.open(link.url, '_blank');
  };

  return (
    <Card className="p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{link.icon}</span>
          <div>
            <h3 className="font-medium">{link.title}</h3>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">{link.url}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 mr-1">{link.clicks} clicks</span>
          
          <Button variant="ghost" size="icon" onClick={visitLink} title="Visit link">
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => onEdit(link.id)} title="Edit link">
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleDelete} title="Delete link">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={handleToggleActive}
            disabled={isUpdating}
          />
          <span className="text-sm text-gray-500">
            {isActive ? "Visible on profile" : "Hidden from profile"}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onReorder('up', link.id, link.position)}
            disabled={isFirst || isUpdating}
            title="Move up"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onReorder('down', link.id, link.position)}
            disabled={isLast || isUpdating}
            title="Move down"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LinkItem;

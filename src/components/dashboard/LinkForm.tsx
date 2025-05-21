
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LinkFormProps {
  linkId?: string;
  userId: string;
  onCancel: () => void;
  onSuccess: () => void;
  initialData?: {
    title: string;
    url: string;
    icon?: string;
  };
}

const LinkForm = ({ linkId, userId, onCancel, onSuccess, initialData }: LinkFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [icon, setIcon] = useState(initialData?.icon || "🔗");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isEditing = !!linkId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !url.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in both title and URL",
        variant: "destructive",
      });
      return;
    }
    
    // If URL doesn't start with http:// or https://, add https://
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }
    
    setIsLoading(true);
    
    try {
      if (isEditing) {
        // Update existing link
        const { error } = await supabase
          .from('links')
          .update({
            title,
            url: formattedUrl,
            icon,
            updated_at: new Date().toISOString()
          })
          .eq('id', linkId);
          
        if (error) throw error;
        
        toast({
          title: "Link updated",
          description: "Your link has been updated successfully",
        });
      } else {
        // Get the highest position value to add the new link at the end
        const { data: links, error: countError } = await supabase
          .from('links')
          .select('position')
          .eq('user_id', userId)
          .order('position', { ascending: false })
          .limit(1);
          
        if (countError) throw countError;
        
        const nextPosition = links && links.length > 0 ? (links[0].position + 1) : 0;
        
        // Create new link
        const { error } = await supabase
          .from('links')
          .insert({
            user_id: userId,
            title,
            url: formattedUrl,
            icon,
            position: nextPosition,
            clicks: 0,
            is_active: true
          });
          
        if (error) throw error;
        
        toast({
          title: "Link added",
          description: "Your new link has been added successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving link:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'add'} link. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const emojiOptions = ["🔗", "💼", "📱", "💬", "📷", "🎮", "💰", "📝", "🎵", "📚", "🎬", "🏆"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{isEditing ? "Edit Link" : "Add New Link"}</h3>
        <Button variant="ghost" size="icon" onClick={onCancel} type="button">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="icon">Icon</Label>
          <div className="flex gap-2 flex-wrap">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIcon(emoji)}
                className={`w-8 h-8 text-lg flex items-center justify-center rounded-md 
                  ${emoji === icon ? 'bg-primary text-white' : 'bg-white border'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter link title"
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., example.com)"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Save Changes" : "Add Link"}
        </Button>
      </div>
    </form>
  );
};

export default LinkForm;

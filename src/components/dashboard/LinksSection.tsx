
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Link as LinkIcon, Loader2, Copy, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import LinkForm from "./LinkForm";
import LinkItem from "./LinkItem";

const LinksSection = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const { toast } = useToast();
  const { user, profile } = useUser();

  useEffect(() => {
    if (profile?.username) {
      const baseUrl = window.location.origin;
      setProfileUrl(`${baseUrl}/@${profile.username}`);
    }
  }, [profile]);

  const fetchLinks = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true });
      
      if (error) throw error;
      
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast({
        title: "Failed to load links",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [user]);

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link Copied",
      description: "Your profile URL has been copied to clipboard",
    });
  };

  const handleViewProfile = () => {
    if (profile?.username) {
      window.open(`/@${profile.username}`, '_blank');
    }
  };

  const handleReorderLink = async (direction: 'up' | 'down', linkId: string, currentPosition: number) => {
    // Find the link to swap positions with
    const targetLink = links.find(link => {
      if (direction === 'up') {
        return link.position < currentPosition;
      } else {
        return link.position > currentPosition;
      }
    });
    
    if (!targetLink) return;
    
    try {
      // Swap positions
      const updates = [
        { id: linkId, position: targetLink.position },
        { id: targetLink.id, position: currentPosition }
      ];
      
      // Update both links positions in a transaction
      for (const update of updates) {
        const { error } = await supabase
          .from('links')
          .update({ position: update.position })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      // Refresh links
      fetchLinks();
      
    } catch (error) {
      console.error("Error reordering links:", error);
      toast({
        title: "Error",
        description: "Failed to reorder links. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Render empty state or links list
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-40 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      );
    }
    
    if (!isAddingLink && links.length === 0) {
      return (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-3">
            <LinkIcon className="h-10 w-10 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No links yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first link below</p>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsAddingLink(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Link
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {isAddingLink && (
          <LinkForm 
            userId={user!.id} 
            onCancel={() => setIsAddingLink(false)}
            onSuccess={() => {
              setIsAddingLink(false);
              fetchLinks();
            }}
          />
        )}
        
        {isEditingLink && (
          <LinkForm 
            linkId={isEditingLink}
            userId={user!.id} 
            onCancel={() => setIsEditingLink(null)}
            onSuccess={() => {
              setIsEditingLink(null);
              fetchLinks();
            }}
            initialData={links.find(link => link.id === isEditingLink)}
          />
        )}
        
        {links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            onEdit={(linkId) => setIsEditingLink(linkId)}
            onDeleted={fetchLinks}
            onReorder={handleReorderLink}
            isFirst={index === 0}
            isLast={index === links.length - 1}
          />
        ))}
        
        {!isAddingLink && !isEditingLink && (
          <Button 
            className="w-full mt-4 bg-primary hover:bg-primary/90"
            onClick={() => setIsAddingLink(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Link
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Links</CardTitle>
        <CardDescription>
          Manage and organize all your links in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        {profile?.username && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Your public profile URL</p>
            <div className="flex gap-2">
              <Input 
                value={profileUrl} 
                readOnly 
                className="bg-white"
              />
              <Button size="icon" variant="outline" onClick={handleCopyProfileUrl}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={handleViewProfile}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LinksSection;

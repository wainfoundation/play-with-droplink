
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, BarChart3, Calendar, Lock, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  is_active: boolean;
  position: number;
}

const AdminLinksManager = () => {
  const { profile } = useUser();
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '🔗' });

  useEffect(() => {
    fetchLinks();
  }, [profile]);

  const fetchLinks = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .order('position', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = async () => {
    if (!profile?.id || !newLink.title || !newLink.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and URL.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('links')
        .insert({
          user_id: profile.id,
          title: newLink.title,
          url: newLink.url,
          icon: newLink.icon,
          position: links.length
        });

      if (error) throw error;

      toast({
        title: "Link Added",
        description: "Your link has been added successfully.",
      });

      setNewLink({ title: '', url: '', icon: '🔗' });
      setShowAddForm(false);
      fetchLinks();
    } catch (error) {
      console.error('Error adding link:', error);
      toast({
        title: "Error",
        description: "Failed to add link. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', linkId);

      if (error) throw error;

      toast({
        title: "Link Deleted",
        description: "Your link has been removed.",
      });

      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  if (isLoading) {
    return <div>Loading links...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Links Manager</CardTitle>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4 border-dashed">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title">Link Title</Label>
                    <Input
                      id="title"
                      placeholder="My Website"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon (Emoji)</Label>
                    <Input
                      id="icon"
                      placeholder="🔗"
                      value={newLink.icon}
                      onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addLink} size="sm">Add Link</Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {links.map((link) => (
              <Card key={link.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      <div>
                        <h4 className="font-medium">{link.title}</h4>
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {link.url}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        {link.clicks}
                      </Badge>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Lock className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteLink(link.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {links.length === 0 && !showAddForm && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No links added yet</p>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Link
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLinksManager;

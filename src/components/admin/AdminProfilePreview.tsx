
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

const AdminProfilePreview = () => {
  const { profile } = useUser();
  const [links, setLinks] = useState<Link[]>([]);

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
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live Preview</h3>
        <Button variant="ghost" size="sm">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Preview Frame */}
      <div className="mx-auto max-w-sm">
        <div className="bg-black rounded-2xl p-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-18 h-18 rounded-full"
                  />
                ) : (
                  <div className="w-18 h-18 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-2xl">
                    {(profile.display_name || profile.username || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold">
                {profile.profile_title || profile.display_name || profile.username}
              </h2>
              {profile.bio && (
                <p className="text-sm opacity-90 mt-1">{profile.bio}</p>
              )}
            </div>

            {/* Links Section */}
            <div className="p-4 space-y-3">
              {links.map((link) => (
                <Button
                  key={link.id}
                  variant="outline"
                  className="w-full h-12 flex items-center justify-start gap-3 hover:bg-gray-50"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.title}</span>
                </Button>
              ))}

              {links.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No links added yet</p>
                  <p className="text-xs mt-1">Add links to see them here</p>
                </div>
              )}

              {/* Default Tip Button */}
              <Button className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-white">
                💰 Tip in Pi
              </Button>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 text-center">
              <Badge variant="secondary" className="text-xs">
                droplink.space/@{profile.username}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">
                {profile.total_clicks || 0}
              </div>
              <div className="text-xs text-gray-600">Total Clicks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {links.length}
              </div>
              <div className="text-xs text-gray-600">Active Links</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePreview;


import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import GroupChat from "@/components/groups/GroupChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GroupChatPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) {
      navigate('/groups');
      return;
    }

    const fetchGroup = async () => {
      try {
        const { data, error } = await supabase
          .from('groups')
          .select('*')
          .eq('id', groupId)
          .single();

        if (error) {
          console.error('Error fetching group:', error);
          navigate('/groups');
          return;
        }

        setGroup(data);
      } catch (error) {
        console.error('Error:', error);
        navigate('/groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div>Loading group...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Group not found</p>
              <Button onClick={() => navigate('/groups')} className="mt-4">
                Back to Groups
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Group header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/groups')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Groups
              </Button>
              
              <div className="flex items-center gap-3">
                {group.image_url && (
                  <img
                    src={group.image_url}
                    alt={group.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold">{group.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{group.member_count} members</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Group Settings
            </Button>
          </div>

          {/* Chat component */}
          <GroupChat groupId={groupId!} groupName={group.name} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroupChatPage;

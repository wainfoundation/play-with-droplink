
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Plus, Settings } from "lucide-react";
import { useGroups } from "@/hooks/useGroups";
import { useNavigate } from "react-router-dom";
import CreateGroupModal from "@/components/groups/CreateGroupModal";

const GroupsSection = () => {
  const { myGroups, loading } = useGroups();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div>Loading groups...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          My Groups ({myGroups.length})
        </CardTitle>
        <div className="flex gap-2">
          <CreateGroupModal
            trigger={
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            }
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/groups')}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {myGroups.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Groups Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create or join groups to connect with your community
            </p>
            <div className="flex gap-2 justify-center">
              <CreateGroupModal
                trigger={
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                }
              />
              <Button variant="outline" onClick={() => navigate('/groups')}>
                Browse Groups
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {myGroups.slice(0, 3).map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {group.image_url && (
                    <img
                      src={group.image_url}
                      alt={group.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{group.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{group.member_count} members</span>
                      {group.price > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {group.price} {group.currency}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/groups/${group.id}/chat`)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate('/groups')}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {myGroups.length > 3 && (
              <div className="text-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/groups')}
                >
                  View {myGroups.length - 3} more groups
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupsSection;

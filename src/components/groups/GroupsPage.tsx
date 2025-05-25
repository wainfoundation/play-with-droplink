
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useGroups } from "@/hooks/useGroups";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";

const GroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { groups, myGroups, loading, joinGroup } = useGroups();

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMyGroups = myGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinGroup = async (group: any) => {
    await joinGroup(group.id);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div>Loading groups...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Groups</h1>
          <p className="text-muted-foreground">
            Join paid communities and connect with like-minded people
          </p>
        </div>
        
        <CreateGroupModal
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          }
        />
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList>
          <TabsTrigger value="discover">Discover Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? "No groups found matching your search." : "No public groups available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onJoin={handleJoinGroup}
                  isMember={myGroups.some(mg => mg.id === group.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-groups" className="space-y-6">
          {filteredMyGroups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "No groups found matching your search." : "You haven't joined any groups yet."}
              </p>
              {!searchQuery && (
                <CreateGroupModal
                  trigger={
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Group
                    </Button>
                  }
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isMember={true}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupsPage;

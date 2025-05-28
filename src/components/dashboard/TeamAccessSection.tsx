
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamAccessSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team Access
          </h2>
          <p className="text-gray-600">Collaborate with your team on your Droplink</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Team Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No team members</h3>
            <p className="text-sm mb-4">Invite team members to collaborate</p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Invite Your First Member
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAccessSection;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramReplySection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Instagram Auto-Reply
          </h2>
          <p className="text-gray-600">Automated Instagram responses and engagement</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Add Auto-Reply
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Reply Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No auto-reply rules</h3>
            <p className="text-sm mb-4">Set up automated responses for Instagram</p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Create First Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramReplySection;

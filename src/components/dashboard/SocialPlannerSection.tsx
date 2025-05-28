
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialPlannerSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Social Planner
          </h2>
          <p className="text-gray-600">Plan and schedule your social media content</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No scheduled content</h3>
            <p className="text-sm mb-4">Start planning your social media content</p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Create Content Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialPlannerSection;

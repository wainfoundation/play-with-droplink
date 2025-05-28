
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkShortenerSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Scissors className="w-6 h-6" />
            Link Shortener
          </h2>
          <p className="text-gray-600">Create branded short links with analytics</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Create Short Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Short Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Scissors className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No short links created</h3>
            <p className="text-sm mb-4">Create branded short links to track clicks</p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Create Your First Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkShortenerSection;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Search, Calendar, Zap, Palette } from "lucide-react";

const ToolsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Tools
        </h2>
        <p className="text-gray-600">Advanced tools for SEO, scheduling, and optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Optimize your profile for search engines</p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Page Title</label>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  Not configured
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  Not configured
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Configure SEO
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Link Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Schedule links to appear at specific times</p>
            <div className="text-center py-6 text-gray-500">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No scheduled links</p>
            </div>
            <Button variant="outline" className="w-full">
              Schedule a Link
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Spotlight Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Highlight important links with special effects</p>
            <div className="text-center py-6 text-gray-500">
              <Zap className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No spotlight links</p>
            </div>
            <Button variant="outline" className="w-full">
              Add Spotlight
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Animations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Add animations to your links and profile</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Button Hover Effect</span>
                <span className="text-xs text-gray-500">None</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Link Animations</span>
                <span className="text-xs text-gray-500">Disabled</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Configure Animations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolsSection;

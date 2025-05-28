
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Plus, Eye, Edit3 } from "lucide-react";

interface MyDroplinkSectionProps {
  profile: any;
  limits: any;
}

const MyDroplinkSection = ({ profile, limits }: MyDroplinkSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LinkIcon className="w-6 h-6" />
            My Droplink
          </h2>
          <p className="text-gray-600">Manage your profile and links</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-gray-600 text-sm">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Link Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-gray-600 text-sm">Total clicks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-gray-600 text-sm">Active links</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Quick Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile URL</label>
              <div className="p-2 bg-gray-50 rounded text-sm">
                droplink.space/@{profile?.username || 'username'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <div className="p-2 bg-gray-50 rounded text-sm">
                {profile?.display_name || 'Not set'}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <div className="p-2 bg-gray-50 rounded text-sm">
              {profile?.bio || 'Add a bio to tell people about yourself'}
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <LinkIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No links yet</h3>
            <p className="text-sm mb-4">Start by adding your first link</p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Add Your First Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyDroplinkSection;

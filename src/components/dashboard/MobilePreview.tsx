
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

interface MobilePreviewProps {
  profile: any;
}

const MobilePreview = ({ profile }: MobilePreviewProps) => {
  return (
    <div className="w-80 p-6 bg-white border-l border-gray-200">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Smartphone className="w-4 h-4" />
            Mobile Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-black rounded-3xl p-4 mx-4 mb-4">
            <div className="bg-white rounded-2xl h-96 overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg mb-2">
                  {profile?.display_name || '@' + profile?.username}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {profile?.bio || 'Add a bio to describe yourself'}
                </p>
                
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    Sample Link 1
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    Sample Link 2
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    Sample Link 3
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 text-center px-4">
            Live preview of your profile
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilePreview;

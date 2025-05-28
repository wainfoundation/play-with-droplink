
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pi, TrendingUp, Download } from "lucide-react";

const PiTipsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Pi className="w-6 h-6" />
            Earn with Pi Tips
          </h2>
          <p className="text-gray-600">Receive Pi cryptocurrency tips from your audience</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Withdraw Tips
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Tips Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0π</div>
            <p className="text-gray-600 text-sm">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0π</div>
            <p className="text-green-600 text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +0% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available to Withdraw</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0π</div>
            <p className="text-gray-600 text-sm">Ready for withdrawal</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Pi className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium mb-2">No tips received yet</h3>
            <p className="text-sm mb-4">Share your profile to start receiving Pi tips</p>
            <Button variant="outline">
              Share Your Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiTipsSection;

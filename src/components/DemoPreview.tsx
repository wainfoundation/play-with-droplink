
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share, ExternalLink, Star } from "lucide-react";

const DemoPreview = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Mobile phone frame */}
      <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-gray-900 text-white text-xs flex justify-between items-center px-4 py-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[500px]">
            {/* Profile header */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  JD
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-1">John Doe</h1>
              <p className="text-gray-600 text-sm mb-2">@johndoe</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                🚀 Pi Network Creator | 💎 Building the future | 🌟 Join my journey
              </p>
              
              <div className="flex justify-center gap-4 mt-4">
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Pro Member
                </Badge>
              </div>
            </div>
            
            {/* Links */}
            <div className="space-y-3 mb-6">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-xl py-3 h-auto shadow-md"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">🎯 My Pi Network App</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-200 hover:bg-gray-50 rounded-xl py-3 h-auto"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-gray-700">📱 Download My App</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-200 hover:bg-gray-50 rounded-xl py-3 h-auto"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-gray-700">🎥 YouTube Channel</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 rounded-xl py-3 h-auto"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-orange-700">💰 Tip me in Pi</span>
                  <Heart className="w-4 h-4 text-orange-500" />
                </div>
              </Button>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center gap-3">
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                <span className="text-blue-600">𝕏</span>
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                <span className="text-pink-600">📷</span>
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                <span className="text-blue-600">💼</span>
              </Button>
            </div>
            
            {/* Share button */}
            <div className="mt-6 text-center">
              <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
                <Share className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPreview;

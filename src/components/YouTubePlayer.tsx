
import React from "react";
import { Play, Volume2 } from "lucide-react";

interface YouTubePlayerProps {
  videoId?: string;
  title?: string;
  description?: string;
}

const YouTubePlayer = ({ 
  videoId = "dQw4w9WgXcQ", // Default video ID (placeholder)
  title = "Droplink - Transform Your Pi Domain",
  description = "See how Droplink helps you monetize your Pi Network presence"
}: YouTubePlayerProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Droplink in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how creators are transforming their Pi domains into powerful business hubs
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Video Container */}
            <div className="relative aspect-video bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
                title={title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Overlay for branding */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <Play className="h-4 w-4" />
                  Droplink Demo
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4" />
                    Turn on sound for best experience
                  </div>
                </div>
                <div className="text-sm text-primary font-medium">
                  Powered by Pi Network
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ready to transform your Pi domain like this?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                Start Building Free
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all">
                Watch More Demos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlayer;

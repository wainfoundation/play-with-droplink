
import React from "react";
import { Play, Volume2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface YouTubePlayerProps {
  videoId?: string;
  title?: string;
  description?: string;
}

const YouTubePlayer = ({ 
  videoId = "1sv5cf9ygZs", // Updated with your video ID
  title = "Droplink - Transform Your Pi Domain",
  description = "See how Droplink helps you monetize your Pi Network presence"
}: YouTubePlayerProps) => {
  const isMobile = useIsMobile();

  return (
    <section className="py-8 md:py-16 px-2 md:px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            See Droplink in Action
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Watch how creators are transforming their Pi domains into powerful business hubs
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className={`relative ${isMobile ? '' : 'bg-white rounded-xl md:rounded-2xl shadow-xl'} overflow-hidden`}>
            {/* Video Container - Responsive 16:9 aspect ratio */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe 
                src="https://www.youtube-nocookie.com/embed/1sv5cf9ygZs?si=rATq0V5J1SH_iNpE&controls=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
              
              {/* Overlay for branding */}
              <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 md:py-2 z-10">
                <div className="flex items-center gap-1 md:gap-2 text-white text-xs md:text-sm font-medium">
                  <Play className="h-3 w-3 md:h-4 md:w-4" />
                  Droplink Demo
                </div>
              </div>
            </div>
            
            {/* Video Info - Hidden on mobile for full-screen experience */}
            {!isMobile && (
              <div className="p-3 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4">{description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                      <span>Turn on sound for best experience</span>
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-primary font-medium">
                    Powered by Pi Network
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Call to Action - Mobile optimized */}
          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 px-2">
              Ready to transform your Pi domain like this?
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center px-4 md:px-0">
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:shadow-lg transition-all text-sm md:text-base">
                Start Building Free
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm md:text-base">
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

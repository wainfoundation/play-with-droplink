
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Users, Globe, Zap } from "lucide-react";
import YouTubePlayer from "./YouTubePlayer";

const DemoSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Enhanced background effects matching hero */}
      <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16">
          {/* ENHANCED HERO-STYLE HEADING */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
            <span className="block mb-2 md:mb-4">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                See Droplink
              </span>
            </span>
            <span className="block">
              <span className="text-gray-900">in </span>
              <span className="bg-gradient-to-r from-secondary via-purple-600 to-primary bg-clip-text text-transparent animate-pulse">
                Action
              </span>
            </span>
          </h2>
          
          {/* ENHANCED HERO-STYLE DESCRIPTION */}
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium">
            Watch how creators are transforming their{" "}
            <span className="font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              .pi domains
            </span>{" "}
            into{" "}
            <span className="font-bold bg-gradient-to-r from-secondary via-purple-600 to-primary bg-clip-text text-transparent">
              powerful business hubs
            </span>
          </p>

          {/* Feature highlights matching hero design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto my-8 md:my-12">
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Live Profiles</p>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Pi Integration</p>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Real Results</p>
            </div>
          </div>
        </div>

        {/* YouTube Player Component */}
        <YouTubePlayer />

        {/* Stats section with enhanced styling */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-sm md:text-base text-gray-500 mb-6">
            Join thousands of Pi creators already using Droplink
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">2,000+</div>
              <div className="text-xs md:text-sm text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50,000+</div>
              <div className="text-xs md:text-sm text-gray-600">Links Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">100π+</div>
              <div className="text-xs md:text-sm text-gray-600">Earned by Creators</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

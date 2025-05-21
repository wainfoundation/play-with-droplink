
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, ArrowUpRight, Clock, Calendar, Heart } from "lucide-react";

const DemoPreview = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="relative max-w-[360px] w-full">
      <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl -z-10"></div>
      <Card className="border-2 border-muted overflow-hidden shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl">
        <div className="bg-black text-white p-3 flex items-center justify-center gap-2 text-xs">
          <Smartphone size={14} />
          <span>demo.droplink.space/@pioneer</span>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-muted p-2">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="profile">Profile View</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile" className="m-0">
            <div className="h-[500px] overflow-y-auto">
              <div className="bg-gradient-hero h-32 relative"></div>
              <div className="flex flex-col items-center px-4">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-muted flex items-center justify-center overflow-hidden mt-4">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-bold text-xl mt-2">Pi Pioneer</h2>
                <p className="text-sm text-muted-foreground text-center">Sharing the latest Pi Network news and tutorials. Support my work with Pi tips!</p>
                
                <div className="flex gap-3 mt-3">
                  <Button size="sm" variant="outline">Follow</Button>
                  <Button size="sm">Tip Pi</Button>
                </div>
                
                <div className="w-full space-y-3 mt-6">
                  <DemoLink title="Latest Pi Network Update" subtitle="My analysis on the latest changes" icon={Calendar} />
                  <DemoLink title="Pi Merchant Guide" subtitle="Learn how to accept Pi payments" icon={ArrowUpRight} />
                  <DemoLink title="Weekly Newsletter" subtitle="Subscribe to get Pi news" icon={Clock} />
                  <DemoLink title="Support My Content" subtitle="Tip 1π to unlock exclusive guides" icon={Heart} />
                  <DemoLink title="Join Discord Community" subtitle="Connect with other Pioneers" icon={ArrowUpRight} />
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-6 py-4">
                  Made with Droplink.space · Create your own for free
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard" className="m-0">
            <div className="h-[500px] overflow-y-auto p-4">
              <h3 className="font-bold text-lg mb-4">Analytics Dashboard</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground">VISITORS</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-green-500">↑ 12% this week</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground">LINK CLICKS</p>
                  <p className="text-2xl font-bold">857</p>
                  <p className="text-xs text-green-500">↑ 8% this week</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground">PI TIPS</p>
                  <p className="text-2xl font-bold">42π</p>
                  <p className="text-xs text-green-500">↑ 15% this week</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-muted-foreground">SUBSCRIBERS</p>
                  <p className="text-2xl font-bold">68</p>
                  <p className="text-xs text-green-500">↑ 5% this week</p>
                </Card>
              </div>
              
              <h4 className="font-semibold text-sm mb-2">Top Performing Links</h4>
              <div className="space-y-2 mb-6">
                <Card className="p-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pi Merchant Guide</span>
                    <span className="font-semibold">324 clicks</span>
                  </div>
                </Card>
                <Card className="p-2 text-sm">
                  <div className="flex justify-between">
                    <span>Latest Pi Network Update</span>
                    <span className="font-semibold">216 clicks</span>
                  </div>
                </Card>
                <Card className="p-2 text-sm">
                  <div className="flex justify-between">
                    <span>Support My Content</span>
                    <span className="font-semibold">189 clicks</span>
                  </div>
                </Card>
              </div>
              
              <Button className="w-full">View Full Analytics</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

const DemoLink = ({ title, subtitle, icon: Icon }) => {
  return (
    <Card className="p-4 hover:bg-muted transition-colors cursor-pointer flex items-center gap-3 transform hover:scale-[1.02] duration-200">
      <div className="bg-primary/10 text-primary p-2 rounded-lg">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};

export default DemoPreview;

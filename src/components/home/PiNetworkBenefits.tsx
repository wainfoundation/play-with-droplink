
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Zap, Trophy, Crown } from "lucide-react";

const PiNetworkBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Coins,
      title: "Earn Pi by Watching Ads",
      description: "Get rewarded for your time",
      bgColor: "bg-primary/20",
      iconColor: "text-primary"
    },
    {
      icon: Zap,
      title: "Pay Pi for Instant Access",
      description: "Skip ads and unlock immediately",
      bgColor: "bg-secondary/20",
      iconColor: "text-secondary"
    },
    {
      icon: Trophy,
      title: "Monthly Subscriptions",
      description: "Unlimited access to all games",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Crown,
      title: "Premium Experience",
      description: "Ad-free gaming and exclusive content",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Pi Network Integration</h2>
          <p className="text-gray-600">Play, Earn, and Unlock with Pi</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <div>
                <h4 className="font-semibold">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PiNetworkBenefits;

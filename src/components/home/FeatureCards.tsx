
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Eye, Crown } from "lucide-react";

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "50+ Games",
      description: "Puzzle, Action, Trivia, Creative & Infinite Games",
      iconColor: "text-primary"
    },
    {
      icon: Eye,
      title: "Watch Ads = Earn Pi",
      description: "Watch ads to unlock premium games and earn rewards",
      iconColor: "text-green-600"
    },
    {
      icon: Crown,
      title: "Premium Access",
      description: "Monthly subscription for unlimited games & no ads",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {features.map((feature, index) => (
        <Card key={index} className="text-center bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <feature.icon className={`w-12 h-12 ${feature.iconColor} mx-auto mb-4`} />
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;


import React from "react";
import { CheckIcon, XIcon, Star, Zap, Crown, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlanFeature {
  name: string;
  free: boolean | string;
  starter: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
  description?: string;
}

const PlanFeaturesTable = () => {
  const features: PlanFeature[] = [
    {
      name: "Links",
      free: "1 only",
      starter: "Unlimited",
      pro: "Unlimited", 
      premium: "Unlimited",
      description: "Number of links you can add to your profile"
    },
    {
      name: ".pi Domain",
      free: false,
      starter: true,
      pro: true,
      premium: true,
      description: "Custom .pi domain like yourname.pi"
    },
    {
      name: "Templates",
      free: "3",
      starter: "33",
      pro: "66",
      premium: "99+",
      description: "Beautiful templates to customize your profile"
    },
    {
      name: "Pi Tips",
      free: false,
      starter: true,
      pro: true,
      premium: true,
      description: "Accept Pi Network tips from visitors"
    },
    {
      name: "Product Sales",
      free: false,
      starter: false,
      pro: true,
      premium: true,
      description: "Sell digital products with Pi payments"
    },
    {
      name: "Analytics",
      free: false,
      starter: "Basic",
      pro: "Advanced",
      premium: "Advanced",
      description: "Track visits, clicks, and engagement"
    },
    {
      name: "QR Codes",
      free: false,
      starter: true,
      pro: true,
      premium: true,
      description: "Generate QR codes for your profile"
    },
    {
      name: "Custom CSS",
      free: false,
      starter: false,
      pro: false,
      premium: true,
      description: "Full customization with CSS"
    },
    {
      name: "No Ads",
      free: false,
      starter: true,
      pro: true,
      premium: true,
      description: "Remove all advertising"
    },
    {
      name: "Priority Support",
      free: false,
      starter: false,
      pro: false,
      premium: true,
      description: "Get help faster with priority support"
    },
    {
      name: "Branding Removal",
      free: false,
      starter: false,
      pro: true,
      premium: true,
      description: "Remove Droplink branding"
    },
    {
      name: "Data Export",
      free: false,
      starter: false,
      pro: false,
      premium: true,
      description: "Export all your data anytime"
    }
  ];

  const plans = [
    {
      name: "Free",
      icon: <Star className="w-4 h-4" />,
      price: "0π",
      color: "bg-gray-500",
      description: "Get started for free"
    },
    {
      name: "Starter", 
      icon: <Zap className="w-4 h-4" />,
      price: "8π",
      color: "bg-blue-500",
      description: "Perfect for creators"
    },
    {
      name: "Pro",
      icon: <Crown className="w-4 h-4" />,
      price: "12π", 
      color: "bg-purple-500",
      description: "Sell digital products"
    },
    {
      name: "Premium",
      icon: <Shield className="w-4 h-4" />,
      price: "18π",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      description: "Full customization"
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <XIcon className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    return (
      <span className="text-sm font-medium text-gray-900">{value}</span>
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="p-4 text-left font-medium text-gray-900 w-1/5">
              Features
            </th>
            {plans.map((plan, index) => (
              <th key={plan.name} className={`p-4 text-center ${index === 1 ? 'bg-blue-50' : ''}`}>
                <div className="flex flex-col items-center gap-2">
                  <Badge className={`${plan.color} text-white`}>
                    {plan.icon}
                    <span className="ml-1">{plan.name}</span>
                  </Badge>
                  <div className="text-lg font-bold text-gray-900">{plan.price}/month</div>
                  <div className="text-xs text-gray-500">{plan.description}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-4 border-b border-gray-200">
                <div className="font-medium text-gray-900">{feature.name}</div>
                {feature.description && (
                  <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
                )}
              </td>
              <td className="p-4 text-center border-b border-gray-200">
                {renderFeatureValue(feature.free)}
              </td>
              <td className="p-4 text-center border-b border-gray-200 bg-blue-50">
                {renderFeatureValue(feature.starter)}
              </td>
              <td className="p-4 text-center border-b border-gray-200">
                {renderFeatureValue(feature.pro)}
              </td>
              <td className="p-4 text-center border-b border-gray-200">
                {renderFeatureValue(feature.premium)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanFeaturesTable;

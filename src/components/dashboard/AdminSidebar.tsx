
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Link as LinkIcon, 
  Store, 
  PieChart, 
  Settings, 
  Pi,
  Users,
  Calendar,
  MessageSquare,
  Scissors,
  Lock,
  Crown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string, requiredFeatures: string[]) => boolean;
  plan: string;
  hasFeatureAccess: (feature: string) => boolean;
}

const AdminSidebar = ({ activeSection, onSectionChange, plan, hasFeatureAccess }: AdminSidebarProps) => {
  const menuItems = [
    {
      id: "my-droplink",
      label: "My Droplink",
      icon: LinkIcon,
      requiredFeatures: [], // Available to all plans
      description: "Manage your profile and links"
    },
    {
      id: "my-shop",
      label: "My Shop",
      icon: Store,
      requiredFeatures: ["product_sales"],
      description: "Sell digital products with Pi"
    },
    {
      id: "earn-pi-tips",
      label: "Earn with Pi Tips",
      icon: Pi,
      requiredFeatures: ["pi_tips"],
      description: "Receive Pi cryptocurrency tips"
    },
    {
      id: "audience",
      label: "Audience",
      icon: Users,
      requiredFeatures: ["analytics"],
      description: "View your audience insights"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      requiredFeatures: ["analytics"],
      description: "Track your performance"
    },
    {
      id: "tools",
      label: "Tools",
      icon: Settings,
      requiredFeatures: ["seo_tools", "scheduling"],
      description: "SEO, scheduling & advanced features"
    },
    {
      id: "social-planner",
      label: "Social Planner",
      icon: Calendar,
      requiredFeatures: ["social_planner"],
      description: "Plan and schedule content"
    },
    {
      id: "instagram-reply",
      label: "Instagram Auto-Reply",
      icon: MessageSquare,
      requiredFeatures: ["instagram_reply"],
      description: "Automated Instagram responses"
    },
    {
      id: "link-shortener",
      label: "Link Shortener",
      icon: Scissors,
      requiredFeatures: ["link_shortener"],
      description: "Create branded short links"
    },
    {
      id: "team-access",
      label: "Team Access",
      icon: Users,
      requiredFeatures: ["team_access"],
      description: "Collaborate with your team"
    }
  ];

  const isAccessible = (requiredFeatures: string[]) => {
    if (requiredFeatures.length === 0) return true;
    return requiredFeatures.some(feature => hasFeatureAccess(feature));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-lg">Dashboard</span>
          {plan !== 'free' && (
            <Badge variant="secondary" className="ml-auto">
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Badge>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const accessible = isAccessible(item.requiredFeatures);
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id, item.requiredFeatures)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : accessible
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-400 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{item.label}</span>
                    {!accessible && <Lock className="w-3 h-3" />}
                  </div>
                  <p className="text-xs opacity-75 truncate">{item.description}</p>
                </div>
                {!accessible && (
                  <Crown className="w-4 h-4 text-amber-500" />
                )}
              </button>
            );
          })}
        </nav>

        {plan === 'free' && (
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Upgrade to unlock more</h4>
            <p className="text-xs text-gray-600 mb-3">
              Get unlimited links, Pi tips, and advanced features starting at 10π/month
            </p>
            <button
              onClick={() => window.location.href = '/pricing'}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white text-sm py-2 rounded-md font-medium"
            >
              View Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;

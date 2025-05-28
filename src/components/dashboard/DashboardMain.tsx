
import React from "react";
import LinksSection from "./LinksSection";
import ShopSection from "./ShopSection";
import PiTipsSection from "./PiTipsSection";
import AudienceSection from "./AudienceSection";
import AnalyticsSection from "./AnalyticsSection";
import ToolsSection from "./ToolsSection";
import SocialPlannerSection from "./SocialPlannerSection";
import InstagramReplySection from "./InstagramReplySection";
import LinkShortenerSection from "./LinkShortenerSection";
import TeamAccessSection from "./TeamAccessSection";
import LockedFeatureCard from "./LockedFeatureCard";

interface DashboardMainProps {
  activeSection: string;
  plan: string;
  limits: any;
  profile: any;
  hasFeatureAccess: (feature: string) => boolean;
  onFeatureClick: (section: string, requiredFeatures: string[]) => boolean;
}

const DashboardMain = ({ 
  activeSection, 
  plan, 
  limits, 
  profile, 
  hasFeatureAccess,
  onFeatureClick 
}: DashboardMainProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case "my-droplink":
        return <LinksSection />;
        
      case "my-shop":
        if (!hasFeatureAccess("product_sales")) {
          return (
            <LockedFeatureCard
              title="My Shop"
              description="Sell digital products and accept Pi payments"
              requiredPlan="Pro"
              features={[
                "Sell digital products",
                "Accept Pi payments",
                "Sales dashboard",
                "Order management",
                "Customer analytics"
              ]}
            />
          );
        }
        return <ShopSection />;
        
      case "earn-pi-tips":
        if (!hasFeatureAccess("pi_tips")) {
          return (
            <LockedFeatureCard
              title="Earn with Pi Tips"
              description="Receive Pi cryptocurrency tips from your audience"
              requiredPlan="Starter"
              features={[
                "Receive Pi tips",
                "Tips dashboard",
                "Withdrawal options",
                "Tips analytics",
                "Custom tip amounts"
              ]}
            />
          );
        }
        return <PiTipsSection />;
        
      case "audience":
        if (!hasFeatureAccess("analytics")) {
          return (
            <LockedFeatureCard
              title="Audience"
              description="Understand your audience with detailed insights"
              requiredPlan="Starter"
              features={[
                "Audience demographics",
                "Visitor analytics",
                "Growth tracking",
                "Engagement metrics",
                "Real-time insights"
              ]}
            />
          );
        }
        return <AudienceSection />;
        
      case "analytics":
        if (!hasFeatureAccess("analytics")) {
          return (
            <LockedFeatureCard
              title="Analytics"
              description="Track your performance with detailed analytics"
              requiredPlan="Starter"
              features={[
                "Click tracking",
                "Performance metrics",
                "Growth analytics",
                "Export data",
                "Custom reports"
              ]}
            />
          );
        }
        return <AnalyticsSection subscription={{ plan }} />;
        
      case "tools":
        if (!hasFeatureAccess("seo_tools") && !hasFeatureAccess("scheduling")) {
          return (
            <LockedFeatureCard
              title="Tools"
              description="Advanced tools for SEO, scheduling, and optimization"
              requiredPlan="Pro"
              features={[
                "SEO optimization",
                "Link scheduling",
                "Spotlight links",
                "Custom animations",
                "Advanced settings"
              ]}
            />
          );
        }
        return <ToolsSection />;
        
      case "social-planner":
        if (!hasFeatureAccess("social_planner")) {
          return (
            <LockedFeatureCard
              title="Social Planner"
              description="Plan and schedule your social media content"
              requiredPlan="Premium"
              features={[
                "Content calendar",
                "Multi-platform posting",
                "Content templates",
                "Analytics integration",
                "Team collaboration"
              ]}
            />
          );
        }
        return <SocialPlannerSection />;
        
      case "instagram-reply":
        if (!hasFeatureAccess("instagram_reply")) {
          return (
            <LockedFeatureCard
              title="Instagram Auto-Reply"
              description="Automated Instagram responses and engagement"
              requiredPlan="Premium"
              features={[
                "Auto-reply messages",
                "Comment management",
                "DM automation",
                "Engagement analytics",
                "Custom triggers"
              ]}
            />
          );
        }
        return <InstagramReplySection />;
        
      case "link-shortener":
        if (!hasFeatureAccess("link_shortener")) {
          return (
            <LockedFeatureCard
              title="Link Shortener"
              description="Create branded short links with analytics"
              requiredPlan="Pro"
              features={[
                "Branded short links",
                "Click analytics",
                "Custom domains",
                "QR codes",
                "Link management"
              ]}
            />
          );
        }
        return <LinkShortenerSection />;
        
      case "team-access":
        if (!hasFeatureAccess("team_access")) {
          return (
            <LockedFeatureCard
              title="Team Access"
              description="Collaborate with your team on your Droplink"
              requiredPlan="Premium"
              features={[
                "Team member management",
                "Role-based permissions",
                "Collaboration tools",
                "Activity tracking",
                "Shared analytics"
              ]}
            />
          );
        }
        return <TeamAccessSection />;
        
      default:
        return <LinksSection />;
    }
  };

  return (
    <div className="flex-1 p-6">
      {renderSection()}
    </div>
  );
};

export default DashboardMain;

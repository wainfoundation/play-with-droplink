import React from "react";
import MyDroplinkSection from "@/components/dashboard/MyDroplinkSection";
import ShopSection from "@/components/dashboard/ShopSection";
import PiTipsSection from "@/components/dashboard/PiTipsSection";
import AudienceSection from "@/components/dashboard/AudienceSection";
import ToolsSection from "@/components/dashboard/ToolsSection";
import LockedFeatureCard from "@/components/dashboard/LockedFeatureCard";
import TeamAccessSection from "@/components/dashboard/TeamAccessSection";
import SocialPlannerSection from "@/components/dashboard/SocialPlannerSection";
import InstagramReplySection from "@/components/dashboard/InstagramReplySection";
import LinkShortenerSection from "@/components/dashboard/LinkShortenerSection";
import DomainSettingsSection from "./DomainSettingsSection";

interface DashboardMainProps {
  activeSection: string;
  plan: string;
  limits: any;
  profile: any;
  hasFeatureAccess: (feature: string) => boolean;
  onFeatureClick: (feature: string, requiredFeatures: string[]) => boolean;
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
        return <MyDroplinkSection profile={profile} limits={limits} />;
      case "my-shop":
        return hasFeatureAccess('product_sales') ? (
          <ShopSection />
        ) : (
          <LockedFeatureCard 
            title="My Shop"
            description="Sell digital products and earn Pi"
            requiredPlan="Pro"
            onUpgrade={() => onFeatureClick('product_sales', ['product_sales'])}
          />
        );
      case "earn-pi-tips":
        return hasFeatureAccess('pi_tips') ? (
          <PiTipsSection />
        ) : (
          <LockedFeatureCard 
            title="Pi Tips"
            description="Earn Pi through tips from your audience"
            requiredPlan="Starter"
            onUpgrade={() => onFeatureClick('pi_tips', ['pi_tips'])}
          />
        );
      case "audience":
        return hasFeatureAccess('analytics') ? (
          <AudienceSection />
        ) : (
          <LockedFeatureCard 
            title="Audience"
            description="Understand your audience with detailed insights"
            requiredPlan="Starter"
            onUpgrade={() => onFeatureClick('analytics', ['analytics'])}
          />
        );
      case "analytics":
        return hasFeatureAccess('analytics') ? (
          <div>Analytics Dashboard Coming Soon</div>
        ) : (
          <LockedFeatureCard 
            title="Analytics"
            description="Track clicks, views, and performance metrics"
            requiredPlan="Starter"
            onUpgrade={() => onFeatureClick('analytics', ['analytics'])}
          />
        );
      case "tools":
        return hasFeatureAccess('seo_tools') ? (
          <ToolsSection />
        ) : (
          <LockedFeatureCard 
            title="Tools"
            description="SEO settings, scheduling, and advanced features"
            requiredPlan="Pro"
            onUpgrade={() => onFeatureClick('seo_tools', ['seo_tools'])}
          />
        );
      case "domain-settings":
        return <DomainSettingsSection 
          profile={profile} 
          hasFeatureAccess={hasFeatureAccess}
          onFeatureClick={onFeatureClick}
        />;
      case "social-planner":
        return hasFeatureAccess('social_planner') ? (
          <SocialPlannerSection />
        ) : (
          <LockedFeatureCard 
            title="Social Planner"
            description="Plan and schedule your social media content"
            requiredPlan="Premium"
            onUpgrade={() => onFeatureClick('social_planner', ['social_planner'])}
          />
        );
      case "instagram-reply":
        return hasFeatureAccess('instagram_reply') ? (
          <InstagramReplySection />
        ) : (
          <LockedFeatureCard 
            title="Instagram Auto-Reply"
            description="Automated Instagram responses and engagement"
            requiredPlan="Premium"
            onUpgrade={() => onFeatureClick('instagram_reply', ['instagram_reply'])}
          />
        );
      case "link-shortener":
        return hasFeatureAccess('link_shortener') ? (
          <LinkShortenerSection />
        ) : (
          <LockedFeatureCard 
            title="Link Shortener"
            description="Create branded short links with analytics"
            requiredPlan="Pro"
            onUpgrade={() => onFeatureClick('link_shortener', ['link_shortener'])}
          />
        );
      case "team-access":
        return hasFeatureAccess('team_access') ? (
          <TeamAccessSection />
        ) : (
          <LockedFeatureCard 
            title="Team Access"
            description="Collaborate with your team on your Droplink"
            requiredPlan="Premium"
            onUpgrade={() => onFeatureClick('team_access', ['team_access'])}
          />
        );
      default:
        return <MyDroplinkSection profile={profile} limits={limits} />;
    }
  };

  return (
    <div className="p-6">
      {renderSection()}
    </div>
  );
};

export default DashboardMain;

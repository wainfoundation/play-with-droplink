
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewStats from "@/components/dashboard/OverviewStats";
import LinksSection from "@/components/dashboard/LinksSection";
import ProductsSection from "@/components/dashboard/ProductsSection";
import GroupsSection from "@/components/dashboard/GroupsSection";
import ProfileUrlDisplay from "@/components/dashboard/ProfileUrlDisplay";
import QuickActions from "@/components/dashboard/QuickActions";
import SubscriptionManagement from "@/components/dashboard/SubscriptionManagement";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import LoginPrompt from "@/components/dashboard/LoginPrompt";

const Dashboard = () => {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              <OverviewStats />
              <LinksSection />
              <ProductsSection />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileUrlDisplay />
              <QuickActions />
              <GroupsSection />
              <SubscriptionManagement />
              <AnalyticsSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

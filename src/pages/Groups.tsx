
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GroupsPage from "@/components/groups/GroupsPage";

const Groups = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="pt-16">
        <GroupsPage />
      </main>
      <Footer />
    </div>
  );
};

export default Groups;
